/**
 * Client stdio ponctuel pour appeler un outil du serveur OpenCad MCP.
 * Usage: pnpm exec tsx scripts/appel-outil.mts <outil> [json-args]
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const outil = process.argv[2]
if (!outil) {
  console.error('usage: appel-outil.mts <outil> [json-args]')
  process.exit(1)
}
const args = process.argv[3] ? JSON.parse(process.argv[3]) : {}
const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const transport = new StdioClientTransport({
  command: path.join(racine, 'node_modules', '.bin', 'tsx.CMD'),
  args: ['src/index.ts'],
  cwd: racine,
  stderr: 'pipe',
})

transport.stderr?.on('data', (chunk) => {
  process.stderr.write(chunk)
})

const client = new Client({ name: 'appel-outil', version: '0.0.1' })
await client.connect(transport)
const resultat = await client.callTool({ name: outil, arguments: args })
console.log(JSON.stringify(resultat, null, 2))
await client.close()
