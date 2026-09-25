/** Boutons de la vue. En esquisse, le glisser déplace et rien ne tourne. */
export function jeuEntree(mode: 'esquisse' | 'solide') {
  if (mode === 'esquisse') return { rotation: [] as number[], panoramique: [0, 1] }
  return { rotation: [2], panoramique: [1] }
}

/** Remplacement des liaisons w3dts tant qu’une esquisse est ouverte. */
export function remplacementEsquisse() {
  const jeu = jeuEntree('esquisse')
  const bouton = (numero: number) => ({ kind: 'mouseButton' as const, button: numero })
  return JSON.stringify({
    version: 1,
    maps: {
      editor: {
        actions: {
          cameraRotate: { type: 'button', bindings: jeu.rotation.map(bouton) },
          cameraPan: { type: 'button', bindings: jeu.panoramique.map(bouton) },
          cameraZoom: { type: 'axisZoom', includeWheelY: true, includeTouchPinch: true },
        },
      },
    },
  })
}
