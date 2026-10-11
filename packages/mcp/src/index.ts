import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { creerPont } from './pont.ts'
import { Controle } from './outils.ts'

const port = Number(process.env.OPENCAD_MCP_PORT ?? 47321)
const pont = creerPont(new Controle(), { port })

function ok() {
  return { content: [{ type: 'text' as const, text: JSON.stringify(pont.etat()) }] }
}

function echec(erreur: unknown) {
  const message = erreur instanceof Error ? erreur.message : String(erreur)
  return { isError: true as const, content: [{ type: 'text' as const, text: message }] }
}

async function tenter(faire: () => Promise<void>) {
  try {
    await faire()
    return ok()
  } catch (erreur) {
    return echec(erreur)
  }
}

const serveur = new McpServer({ name: 'opencad', version: '0.0.1' })

serveur.registerTool(
  'commande',
  {
    description: 'Exécute une ligne du langage OpenCad (piece, esquisse, cote, extrude, enleve, revolution, pas, pointe).',
    inputSchema: { ligne: z.string() },
  },
  async ({ ligne }) => tenter(() => pont.commande(ligne)),
)

serveur.registerTool(
  'executer',
  {
    description: 'Exécute un script, puis reconstruit le solide une seule fois.',
    inputSchema: { script: z.string() },
  },
  async ({ script }) => tenter(() => pont.executer(script)),
)

serveur.registerTool(
  'etat',
  {
    description: 'Pièce, paramètres, historique, pointe, statut d’esquisse, script, viewport et conflit.',
    inputSchema: {},
  },
  async () => ok(),
)

serveur.registerTool(
  'annuler',
  { description: 'Annule la dernière commande.', inputSchema: {} },
  async () => tenter(() => pont.annuler()),
)

serveur.registerTool(
  'refaire',
  { description: 'Refait la dernière commande annulée.', inputSchema: {} },
  async () => tenter(() => pont.refaire()),
)

serveur.registerTool(
  'pointe',
  {
    description: 'Pose la pointe de reconstruction sur un rang de fonction, ou fin.',
    inputSchema: { cible: z.union([z.number().int(), z.literal('fin')]) },
  },
  async ({ cible }) => tenter(() => pont.pointe(cible)),
)

serveur.registerTool(
  'activer',
  {
    description: 'Allume ou éteint une opération de l’historique.',
    inputSchema: { index: z.number().int(), actif: z.boolean() },
  },
  async ({ index, actif }) => tenter(() => pont.activer(index, actif)),
)

serveur.registerTool(
  'aligner',
  {
    description: 'Lève un conflit de script. mcp écrase l’éditeur, editeur écrase la session MCP.',
    inputSchema: { source: z.enum(['mcp', 'editeur']) },
  },
  async ({ source }) => tenter(() => pont.aligner(source)),
)

await pont.pret()
await serveur.connect(new StdioServerTransport())
