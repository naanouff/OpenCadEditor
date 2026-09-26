/**
 * @file buildCameraProjectionMatrix.ts
 * @project w3dts
 * @description Shared perspective / orthographic projection for Scene, Game, and CPU pick.
 */

import { mat4 } from 'gl-matrix';

export type CameraProjectionMode = 'perspective' | 'orthographic';

/** Fields used by {@link buildCameraProjectionMatrix} (matches {@link CameraComponent}). */
export type CameraProjectionInput = {
  projectionMode?: CameraProjectionMode;
  fov: number;
  near: number;
  far: number;
  orthographicHalfHeight?: number;
};

/**
 * Writes a projection matrix using `aspect` (canvas or camera).
 * Orthographic: vertical half-extent × aspect → horizontal half-extent (same as pick / camera.system).
 */
export function buildCameraProjectionMatrix(
  camera: CameraProjectionInput,
  aspect: number,
  out: mat4
): mat4 {
  const a = Number.isFinite(aspect) && aspect > 1e-6 ? aspect : 1;
  if (camera.projectionMode === 'orthographic') {
    const halfH = Math.max(1e-6, camera.orthographicHalfHeight ?? 1);
    const halfW = halfH * a;
    mat4.orthoZO(out, -halfW, halfW, -halfH, halfH, camera.near, camera.far);
  } else {
    mat4.perspective(out, camera.fov, a, camera.near, camera.far);
  }
  return out;
}
