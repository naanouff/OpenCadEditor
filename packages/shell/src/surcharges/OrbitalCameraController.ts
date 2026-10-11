/**
 * @file OrbitalCameraController.ts
 * @project w3dts
 * @author Cyril TARRIET
 * @date 2025-10-27
 * @description Contrôleur de caméra orbitale style "Unity Editor" avec calcul inverse pour orbiter autour de 0,0,0 par défaut.
 */

import { vec3, mat4, quat } from 'gl-matrix';
import { LogChannel, type ILogger } from '@naanouff/w3dts-logger';
import type { InputManager } from '@w3dts-core-src/input/InputManager';
import type { FrameBoundingBoxOptions, ICameraController } from '@w3dts-core-src/core/camera/ICameraController';
import type { World } from '@w3dts-core-src/core/ecs/World';
import type { Entity } from '@w3dts-core-src/core/ecs/Entity';
import { TransformComponent } from '@w3dts-core-src/core/ecs/components/TransformComponent';
import { CameraComponent } from '@w3dts-core-src/core/ecs/components/CameraComponent';
import { computeOrthographicHalfHeightForAabb } from '@w3dts-core-src/core/camera/orthographicFraming';

const EPSILON = 0.001;

/** Orbit presets: camera sits on the given world half-axis and looks at the focus. */
export type AxisViewId = 'posX' | 'negX' | 'posY' | 'negY' | 'posZ' | 'negZ';

/**
 * Spherical angles used by {@link OrbitalCameraController} for axis-aligned views.
 * Exported for tests.
 */
export function expectedSphericalForAxisView(view: AxisViewId): {
  polar: number;
  azimuth: number;
} {
  switch (view) {
    case 'posZ':
      return { polar: Math.PI / 2, azimuth: 0 };
    case 'negZ':
      return { polar: Math.PI / 2, azimuth: Math.PI };
    case 'posX':
      return { polar: Math.PI / 2, azimuth: Math.PI / 2 };
    case 'negX':
      return { polar: Math.PI / 2, azimuth: -Math.PI / 2 };
    case 'posY':
      return { polar: 0, azimuth: 0 };
    case 'negY':
      return { polar: Math.PI, azimuth: 0 };
  }
}

export class OrbitalCameraController implements ICameraController {
  private world: World;
  private cameraEntity: Entity;
  private inputManager: InputManager;
  private logger: ILogger;

  // --- État Cible ---
  private targetFocusPoint = vec3.create(); // Pivot
  private targetRadius = 10.0;
  private targetAzimuth = 0.0;
  private targetPolar = Math.PI / 4;

  // --- État Courant (Lissé) ---
  private currentFocusPoint = vec3.create();
  private currentRadius = 10.0;
  private currentAzimuth = 0.0;
  private currentPolar = Math.PI / 4;

  // --- Configuration ---
  public minDistance = 0.1;
  public maxDistance = 1000.0;
  public zoomSensitivity = 0.1;
  public dragZoomSpeed = 0.01;
  public rotateSpeed = 0.005;
  public damping = 10.0;

  /** Bounding-box diagonal from last {@link frameBoundingBox} (scene units). */
  private frameContentSize = 10;

  private minOrthographicHalfHeight = 1e-4;
  private maxOrthographicHalfHeight = 10_000;

  /** Max far/near ratio for depth buffer precision. */
  private static readonly CLIP_PLANE_MAX_RATIO = 50_000;

  /**
   * When set, left-mouse button (button 0 / 'select') drives this camera action.
   * null = default behaviour (left click = select, no camera move).
   */
  public leftMouseMode: 'rotate' | 'pan' | 'zoom' | null = null;

  // Vecteurs temporaires
  private _camPos = vec3.create();
  private _forward = vec3.create();
  private _right = vec3.create();
  private _up = vec3.create();
  private _panDelta = vec3.create();
  /** When set, preserves STEP Saved View roll until the user orbits or pans. */
  private useSavedViewUp = false;
  private keepViewUp = false;
  private readonly _savedViewUp = vec3.fromValues(0, 1, 0);

  constructor(cameraEntity: Entity, world: World, input: InputManager, logger: ILogger) {
    this.cameraEntity = cameraEntity;
    this.world = world;
    this.inputManager = input;
    this.logger = logger;

    const transform = this.world.getComponent(this.cameraEntity, TransformComponent);
    if (transform) {
      // AMÉLIORATION : Par défaut, on cible l'origine (0,0,0)
      vec3.set(this.targetFocusPoint, 0, 0, 0);

      // On calcule les coordonnées sphériques (Radius, Azimuth, Polar) pour que la caméra
      // conserve sa position actuelle tout en orbitant autour de 0,0,0.
      this.updateSphericalFromCartesian(transform.position, this.targetFocusPoint);

      // On synchronise l'état courant immédiatement (pas de lissage au démarrage)
      this.syncCurrentToTarget();
    }
  }

  public enable(): void {
    this.logger.info(LogChannel.Interaction, 'OrbitalCameraController (Unity Style) enabled.');
  }

  public disable(): void {}

  // --- Helpers publics pour manipulation externe (ex: Reframe) ---

  /** Current (smoothed) azimuth angle in radians. Used by ViewCube to mirror camera rotation. */
  public get azimuth(): number {
    return this.currentAzimuth;
  }

  /** Current (smoothed) polar angle in radians. Used by ViewCube to mirror camera rotation. */
  public get polar(): number {
    return this.currentPolar;
  }

  /** Eye / focus / ortho half-height for viewport face picking (P4). */
  public getPickFrame(): {
    eye: [number, number, number]
    target: [number, number, number]
    up: [number, number, number]
    demiHauteur: number
  } | null {
    const transform = this.world.getComponent(this.cameraEntity, TransformComponent);
    const camera = this.world.getComponent(this.cameraEntity, CameraComponent);
    if (!transform || !camera) return null;
    const up = this.useSavedViewUp
      ? ([this._savedViewUp[0], this._savedViewUp[1], this._savedViewUp[2]] as [number, number, number])
      : ([0, 1, 0] as [number, number, number]);
    return {
      eye: [transform.position[0], transform.position[1], transform.position[2]],
      target: [this.currentFocusPoint[0], this.currentFocusPoint[1], this.currentFocusPoint[2]],
      up,
      demiHauteur: camera.orthographicHalfHeight,
    };
  }

  public setTarget(target: vec3): void {
    if (!target || target.length < 3) return;
    vec3.copy(this.targetFocusPoint, target);
    // On garde la position caméra, on recalcule les angles
    const transform = this.world.getComponent(this.cameraEntity, TransformComponent);
    if (transform) this.updateSphericalFromCartesian(transform.position, this.targetFocusPoint);
  }

  public setPosition(position: vec3): void {
    // On garde le target, on recalcule les angles depuis la nouvelle position
    this.updateSphericalFromCartesian(position, this.targetFocusPoint);
    this.syncCurrentToTarget();
  }

  /**
   * Snaps orbit azimuth/polar so the camera views the focus from the selected world direction.
   * Does not switch to orthographic projection.
   */
  public snapToAxisView(view: AxisViewId): void {
    const { polar, azimuth } = expectedSphericalForAxisView(view);
    this.targetPolar = Math.max(EPSILON, Math.min(Math.PI - EPSILON, polar));
    this.targetAzimuth = azimuth;
    this.syncCurrentToTarget();
  }

  /**
   * Sets the target orbit angles. The camera smoothly animates via damping unless
   * {@link immediate} is `true` (used for drag interaction to give per-frame feedback).
   *
   * @param azimuth   Target azimuth in radians.
   * @param polar     Target polar angle in radians (clamped away from the poles).
   * @param immediate When `true`, instantly syncs current angles to target (no lag).
   */
  public setOrbitAngles(azimuth: number, polar: number, immediate = false): void {
    this.targetAzimuth = azimuth;
    this.targetPolar = Math.max(EPSILON, Math.min(Math.PI - EPSILON, polar));
    if (immediate) this.syncCurrentToTarget();
  }

  /**
   * Sets projection mode on the bound {@link CameraComponent}.
   * Orthographic zoom uses {@link CameraComponent.orthographicHalfHeight}.
   */
  public setProjectionMode(
    mode: 'perspective' | 'orthographic',
    opts?: { halfHeight?: number }
  ): void {
    const camera = this.world.getComponent(this.cameraEntity, CameraComponent);
    if (!camera) return;
    camera.projectionMode = mode;
    if (mode === 'orthographic') {
      const halfH = opts?.halfHeight ?? camera.orthographicHalfHeight;
      camera.orthographicHalfHeight = this.clampOrthographicHalfHeight(halfH);
      this.syncOrthographicZoomLimits();
    }
  }

  public getProjectionMode(): 'perspective' | 'orthographic' {
    const camera = this.world.getComponent(this.cameraEntity, CameraComponent);
    return camera?.projectionMode ?? 'perspective';
  }

  /**
   * Sets vertical field of view in degrees on the bound {@link CameraComponent}.
   */
  public setFovDegrees(degrees: number): void {
    const camera = this.world.getComponent(this.cameraEntity, CameraComponent);
    if (!camera) return;
    const deg = Math.max(1, Math.min(179, degrees));
    camera.fov = (deg * Math.PI) / 180;
  }

  public getFovDegrees(): number {
    const camera = this.world.getComponent(this.cameraEntity, CameraComponent);
    const fov = camera?.fov ?? Math.PI / 4;
    return (fov * 180) / Math.PI;
  }

  /**
   * Applies a view-roll preset by setting a custom lookAt up vector.
   * `0` restores world +Y up; ±90 rolls the horizon around the view axis.
   */
  public setViewRollDegrees(degrees: number): void {
    if (Math.abs(degrees) < 1e-3) {
      this.useSavedViewUp = false;
      vec3.set(this._savedViewUp, 0, 1, 0);
      return;
    }
    const sinPolar = Math.sin(this.currentPolar);
    // Camera offset from focus (same as update()): view looks toward -offset.
    const ox = this.currentRadius * sinPolar * Math.sin(this.currentAzimuth);
    const oy = this.currentRadius * Math.cos(this.currentPolar);
    const oz = this.currentRadius * sinPolar * Math.cos(this.currentAzimuth);
    const forward = vec3.fromValues(-ox, -oy, -oz);
    vec3.normalize(forward, forward);

    const worldUp = vec3.fromValues(0, 1, 0);
    const rad = (degrees * Math.PI) / 180;
    // Rodrigues rotation of worldUp around forward.
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);
    const dot = vec3.dot(forward, worldUp);
    const cross = vec3.create();
    vec3.cross(cross, forward, worldUp);
    vec3.set(
      this._savedViewUp,
      worldUp[0]! * cosA + cross[0]! * sinA + forward[0]! * dot * (1 - cosA),
      worldUp[1]! * cosA + cross[1]! * sinA + forward[1]! * dot * (1 - cosA),
      worldUp[2]! * cosA + cross[2]! * sinA + forward[2]! * dot * (1 - cosA)
    );
    vec3.normalize(this._savedViewUp, this._savedViewUp);
    this.useSavedViewUp = true;
  }

  /** Haut de la caméra. `null` rend l'axe Y du monde. Conservé au panoramique. */
  public setViewUp(up: vec3 | null): void {
    if (!up) {
      this.useSavedViewUp = false;
      this.keepViewUp = false;
      return;
    }
    vec3.normalize(this._savedViewUp, up);
    this.useSavedViewUp = true;
    this.keepViewUp = true;
  }

  // --- Logic ---

  public update(deltaTime: number): void {
    const transform = this.world.getComponent(this.cameraEntity, TransformComponent);
    const camera = this.world.getComponent(this.cameraEntity, CameraComponent);
    if (!transform || !camera) return;

    this.handleInput(camera, this.webGPUCanvasHeight);

    // Lissage (Damping)
    const t = 1.0 - Math.exp(-this.damping * deltaTime);

    this.currentRadius = this.lerp(this.currentRadius, this.targetRadius, t);
    this.currentAzimuth = this.lerp(this.currentAzimuth, this.targetAzimuth, t);
    this.currentPolar = this.lerp(this.currentPolar, this.targetPolar, t);
    vec3.lerp(this.currentFocusPoint, this.currentFocusPoint, this.targetFocusPoint, t);

    // Calcul Position (Sphérique -> Cartésien)
    const sinPolar = Math.sin(this.currentPolar);
    const x = this.currentRadius * sinPolar * Math.sin(this.currentAzimuth);
    const y = this.currentRadius * Math.cos(this.currentPolar);
    const z = this.currentRadius * sinPolar * Math.cos(this.currentAzimuth);

    vec3.set(this._camPos, x, y, z);
    vec3.add(this._camPos, this._camPos, this.currentFocusPoint);

    vec3.copy(transform.position, this._camPos);

    // Orientation
    const viewMat = mat4.create();
    const up = this.useSavedViewUp ? this._savedViewUp : ([0, 1, 0] as vec3);
    mat4.lookAt(viewMat, this._camPos, this.currentFocusPoint, up);
    mat4.getRotation(transform.rotation, viewMat);
    quat.invert(transform.rotation, transform.rotation);

    // Clip planes scale with orbit distance so close inspection does not clip the mesh.
    this.updateClipPlanes(this.currentRadius);
  }

  /**
   * Near/far planes derived from orbit radius and framed content size.
   * When zoomed in, lowers near (instead of a fixed 0.01 m floor) to avoid foreground clipping.
   */
  private updateClipPlanes(orbitRadius: number): void {
    const camera = this.world.getComponent(this.cameraEntity, CameraComponent);
    if (!camera) return;

    const r = Math.max(EPSILON, orbitRadius);
    const content = Math.max(r, this.frameContentSize);

    camera.near = Math.max(1e-6, r * 0.002, content * 5e-5);
    camera.far = Math.max(r + content * 2.5, r * 12, camera.near * 64);

    const maxRatio = OrbitalCameraController.CLIP_PLANE_MAX_RATIO;
    if (camera.far / camera.near > maxRatio) {
      // Close-up: shrink far instead of raising near (keeps the model inside the frustum).
      if (r < content * 0.05) {
        camera.far = camera.near * maxRatio;
      } else {
        camera.near = camera.far / maxRatio;
      }
    }
  }

  private handleInput(camera: CameraComponent, screenHeight: number): void {
    const { deltaX, deltaY } = this.inputManager.pointer;
    const isSelectDown = this.inputManager.isActionPressed('select');
    const isRotating =
      this.inputManager.isActionPressed('cameraRotate') ||
      (this.leftMouseMode === 'rotate' && isSelectDown);
    const isPanning =
      this.inputManager.isActionPressed('cameraPan') ||
      (this.leftMouseMode === 'pan' && isSelectDown);
    const isDragZooming = this.leftMouseMode === 'zoom' && isSelectDown;
    const zoomDelta = isDragZooming ? 0 : this.inputManager.getAxis('cameraZoom');
    const isOrthographic = camera.projectionMode === 'orthographic';

    if (isRotating) {
      this.useSavedViewUp = false;
      this.targetAzimuth -= deltaX * this.rotateSpeed;
      this.targetPolar -= deltaY * this.rotateSpeed;
      this.targetPolar = Math.max(EPSILON, Math.min(Math.PI - EPSILON, this.targetPolar));
    }

    if (isPanning) {
      if (!this.keepViewUp) this.useSavedViewUp = false;
      const visibleHeightAtTarget = isOrthographic
        ? camera.orthographicHalfHeight * 2
        : 2.0 * this.currentRadius * Math.tan(camera.fov * 0.5);
      const panFactor = visibleHeightAtTarget / screenHeight;

      this.computeCameraBasis(this._right, this._up, this._forward);

      vec3.zero(this._panDelta);
      vec3.scaleAndAdd(this._panDelta, this._panDelta, this._right, -deltaX * panFactor);
      vec3.scaleAndAdd(this._panDelta, this._panDelta, this._up, deltaY * panFactor);

      vec3.add(this.targetFocusPoint, this.targetFocusPoint, this._panDelta);
    }

    if (zoomDelta !== 0) {
      const k = Math.pow(1.0 - this.zoomSensitivity, Math.sign(zoomDelta));

      const el = this.inputManager.getElement();
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const nx = ((this.inputManager.pointer.x - rect.left) / rect.width) * 2 - 1;
        const ny = 1 - ((this.inputManager.pointer.y - rect.top) / rect.height) * 2;
        const aspect = rect.width / rect.height;
        const halfH = isOrthographic
          ? camera.orthographicHalfHeight
          : this.currentRadius * Math.tan(camera.fov * 0.5);
        const halfW = halfH * aspect;
        this.computeCameraBasis(this._right, this._up, this._forward);
        vec3.zero(this._panDelta);
        vec3.scaleAndAdd(this._panDelta, this._panDelta, this._right, nx * halfW);
        vec3.scaleAndAdd(this._panDelta, this._panDelta, this._up, ny * halfH);
        vec3.scaleAndAdd(this.targetFocusPoint, this.targetFocusPoint, this._panDelta, 1 - k);
      }

      if (isOrthographic) {
        camera.orthographicHalfHeight = this.clampOrthographicHalfHeight(
          camera.orthographicHalfHeight * k
        );
      } else {
        this.targetRadius *= k;
        this.targetRadius = Math.max(
          this.minDistance,
          Math.min(this.maxDistance, this.targetRadius)
        );
      }
    }

    if (isDragZooming && deltaY !== 0) {
      const k = 1.0 + deltaY * this.dragZoomSpeed;
      if (isOrthographic) {
        camera.orthographicHalfHeight = this.clampOrthographicHalfHeight(
          camera.orthographicHalfHeight * k
        );
      } else {
        this.targetRadius *= k;
        this.targetRadius = Math.max(
          this.minDistance,
          Math.min(this.maxDistance, this.targetRadius)
        );
      }
    }
  }

  /**
   * Recadre la caméra sur une boîte englobante.
   * Utilise le centre exact de la BBox comme point de pivot.
   */
  public frameBoundingBox(aabb: { min: vec3; max: vec3 }, options?: FrameBoundingBoxOptions): void {
    const immediate = options?.immediate ?? true;
    const resetViewAngles = options?.resetViewAngles ?? true;

    // 1. Calcul du Centre (Cible de l'orbite)
    const center = vec3.create();
    vec3.add(center, aabb.min, aabb.max);
    vec3.scale(center, center, 0.5);

    // On met à jour le point pivot cible
    vec3.copy(this.targetFocusPoint, center);

    const size = vec3.dist(aabb.min, aabb.max);
    const camera = this.world.getComponent(this.cameraEntity, CameraComponent);
    const fov = camera ? camera.fov : Math.PI / 4;

    this.frameContentSize = size;
    this.minDistance = size * 0.0001;
    this.maxDistance = size * 50;
    this.syncOrthographicZoomLimits();

    if (resetViewAngles) {
      this.targetAzimuth = (3 * Math.PI) / 4;
      this.targetPolar = Math.PI / 3;
    }

    if (camera?.projectionMode === 'orthographic') {
      if (this.targetRadius < size * 0.5) {
        this.targetRadius = Math.max(size, EPSILON);
      }
      const sinPolar = Math.sin(this.targetPolar);
      const eye = vec3.fromValues(
        center[0] + this.targetRadius * sinPolar * Math.sin(this.targetAzimuth),
        center[1] + this.targetRadius * Math.cos(this.targetPolar),
        center[2] + this.targetRadius * sinPolar * Math.cos(this.targetAzimuth)
      );
      const up = this.useSavedViewUp ? this._savedViewUp : ([0, 1, 0] as vec3);
      camera.orthographicHalfHeight = this.clampOrthographicHalfHeight(
        computeOrthographicHalfHeightForAabb(
          aabb,
          eye,
          center,
          up,
          Math.max(camera.aspect, 1e-6),
          1.1
        )
      );
      this.updateClipPlanes(this.targetRadius);
    } else {
      this.targetRadius = (size * 0.8) / Math.sin(fov * 0.5);
      this.updateClipPlanes(this.targetRadius);
    }

    if (immediate) {
      this.syncCurrentToTarget();
    }
  }

  /**
   * MAGIE MATHÉMATIQUE : Calcule Radius/Theta/Phi à partir d'une position Cartésienne (X,Y,Z).
   * Permet d'initialiser ou de déplacer la caméra sans casser la logique orbitale.
   */
  private updateSphericalFromCartesian(position: vec3, target: vec3): void {
    const offset = vec3.create();
    vec3.sub(offset, position, target);

    // Rayon
    this.targetRadius = vec3.length(offset);
    if (this.targetRadius < EPSILON) this.targetRadius = EPSILON;

    // Polar (Inclinaison verticale)
    this.targetPolar = Math.acos(offset[1] / this.targetRadius);
    this.targetPolar = Math.max(EPSILON, Math.min(Math.PI - EPSILON, this.targetPolar));

    // Azimuth (Rotation horizontale)
    this.targetAzimuth = Math.atan2(offset[0], offset[2]);
  }

  private syncCurrentToTarget() {
    this.currentRadius = this.targetRadius;
    this.currentAzimuth = this.targetAzimuth;
    this.currentPolar = this.targetPolar;
    vec3.copy(this.currentFocusPoint, this.targetFocusPoint);
  }

  private computeCameraBasis(right: vec3, up: vec3, forward: vec3): void {
    const sinPolar = Math.sin(this.currentPolar);
    const camX = sinPolar * Math.sin(this.currentAzimuth);
    const camY = Math.cos(this.currentPolar);
    const camZ = sinPolar * Math.cos(this.currentAzimuth);

    vec3.set(forward, -camX, -camY, -camZ);
    vec3.normalize(forward, forward);

    const worldUp = vec3.fromValues(0, 1, 0);
    vec3.cross(right, forward, worldUp);
    vec3.normalize(right, right);
    vec3.cross(up, right, forward);
    vec3.normalize(up, up);
  }

  private get webGPUCanvasHeight(): number {
    const el = this.inputManager.getElement();
    return el.clientHeight || 600;
  }

  private lerp(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t;
  }

  private syncOrthographicZoomLimits(): void {
    const content = Math.max(this.frameContentSize, EPSILON);
    this.minOrthographicHalfHeight = content * 5e-5;
    this.maxOrthographicHalfHeight = content * 25;
  }

  private clampOrthographicHalfHeight(halfH: number): number {
    return Math.max(
      this.minOrthographicHalfHeight,
      Math.min(this.maxOrthographicHalfHeight, halfH)
    );
  }
}
