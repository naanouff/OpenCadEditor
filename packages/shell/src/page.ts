import '../../../vendor/w3dts/packages/viewer-editor/src/ui/styles/tokens.css'
import { Hote } from './hote.ts'
import { afficher } from './viewportW3dts.ts'

const hote = new Hote()
const vue = document.querySelector<HTMLCanvasElement>('#vue')!
const journal = document.querySelector<HTMLTextAreaElement>('#journal')!
const ligne = document.querySelector<HTMLInputElement>('#ligne')!
const formulaire = document.querySelector<HTMLFormElement>('#terminal')!

function dessiner() {
  void afficher(vue, hote.session.frontiere(), hote.session.esquisseCourante()).catch((erreur: unknown) => {
    journal.value = erreur instanceof Error ? erreur.message : String(erreur)
  })
}

function afficherParametres() {
  const liste = document.querySelector<HTMLElement>('#parametres ul')!
  liste.replaceChildren()
  for (const [nom, expression] of hote.session.parametres()) {
    const ligneParametre = document.createElement('li')
    ligneParametre.textContent = `${nom} = ${expression}`
    liste.append(ligneParametre)
  }
}

function afficherJournal() {
  journal.value = hote.journal
    .map((entree) => (entree.erreur ? `${entree.ligne} — ${entree.erreur}` : entree.ligne))
    .join('\n')
  journal.scrollTop = journal.scrollHeight
  afficherParametres()
}

formulaire.addEventListener('submit', (evenement) => {
  evenement.preventDefault()
  const texte = ligne.value.trim()
  if (!texte) return
  hote.ligne(texte)
  ligne.value = ''
  afficherJournal()
  dessiner()
})

window.addEventListener('resize', dessiner)
dessiner()
