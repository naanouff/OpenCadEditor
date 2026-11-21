/** Boutons de la vue. En esquisse, le glisser déplace et rien ne tourne. */
export function jeuEntree(mode: 'esquisse' | 'solide') {
  if (mode === 'esquisse') return { rotation: [] as number[], panoramique: [0, 1] }
  return { rotation: [2], panoramique: [1] }
}

/**
 * Liaisons w3dts du mode. La molette n’y figure pas : w3dts n’en garde que le signe,
 * le viewport la lit lui-même pour zoomer en proportion, sous le curseur.
 */
export function liaisonsEntree(mode: 'esquisse' | 'solide') {
  const jeu = jeuEntree(mode)
  const bouton = (numero: number) => ({ kind: 'mouseButton' as const, button: numero })
  return JSON.stringify({
    version: 1,
    maps: {
      editor: {
        actions: {
          cameraRotate: { type: 'button', bindings: jeu.rotation.map(bouton) },
          cameraPan: { type: 'button', bindings: jeu.panoramique.map(bouton) },
          cameraZoom: { type: 'axisZoom', includeWheelY: false, includeTouchPinch: true },
        },
      },
    },
  })
}
