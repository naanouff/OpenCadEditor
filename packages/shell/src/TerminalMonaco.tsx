import { useEffect, useRef, useState, type ReactElement } from 'react'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/editor/editor.worker?worker'
import { storeShell } from './storeShell.ts'

const LANGUE = 'opencad-commande'

const MOTS = [
  'piece',
  'unite',
  'auteur',
  'version',
  'param',
  'esquisse',
  'cercle',
  'rectangle',
  'segment',
  'arc',
  'concentrique',
  'cote',
  'symetrie',
  'extrude',
  'enleve',
  'travers',
  'plan.dessus',
  'face.dessus',
  'face.dessous',
  'plan.12h',
  'plan.3h',
  'diametre',
  'rayon',
  'vertical',
  'horizontal',
]

let languePrete = false
let completion: monaco.IDisposable | undefined

function assurerLangue(): void {
  if (!languePrete) {
    languePrete = true
    if (!monaco.languages.getLanguages().some((l) => l.id === LANGUE)) {
      monaco.languages.register({ id: LANGUE })
    }
  }
  monaco.languages.setMonarchTokensProvider(LANGUE, {
    keywords: MOTS,
    tokenizer: {
      root: [
        [/\/\/.*$/, 'comment'],
        [/\d+(\.\d+)?/, 'number'],
        [/[a-zA-Z_][\w.]*/, { cases: { '@keywords': 'keyword', '@default': 'identifier' } }],
        [/[*+\-/()]/, 'operator'],
      ],
    },
  })
  completion?.dispose()
  completion = monaco.languages.registerCompletionItemProvider(LANGUE, {
    triggerCharacters: ['.', ' '],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      }
      return {
        suggestions: MOTS.map((label) => ({
          label,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: label,
          range,
        })),
      }
    },
  })
}

function themeMonaco(): string {
  const theme = document.documentElement.getAttribute('data-theme')
  return theme === 'light' ? 'vs' : 'vs-dark'
}

export function TerminalMonaco(): ReactElement {
  const hostRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const sourceRef = useRef('')
  const historyRef = useRef<string[]>([])
  const historyCursor = useRef(0)
  const draftRef = useRef('')
  const runRef = useRef<() => void>(() => undefined)
  const [revision, setRevision] = useState(() => storeShell.revision())
  const [masqueAvant, setMasqueAvant] = useState(0)

  useEffect(() => storeShell.souscrire(() => setRevision(storeShell.revision())), [])

  const journal = storeShell.hote().journal.slice(masqueAvant)

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [revision, journal.length])

  const recall = (direction: -1 | 1) => {
    const editor = editorRef.current
    const history = historyRef.current
    if (!editor || history.length === 0) return
    if (historyCursor.current === history.length) draftRef.current = editor.getValue()
    const next = historyCursor.current + direction
    if (next < 0 || next > history.length) return
    historyCursor.current = next
    const text = next === history.length ? draftRef.current : (history[next] ?? '')
    editor.setValue(text)
    sourceRef.current = text
    const end = editor.getModel()?.getFullModelRange().getEndPosition()
    if (end) editor.setPosition(end)
  }

  runRef.current = () => {
    const source = sourceRef.current
    const lignes = source.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lignes.length === 0) return
    for (const ligne of lignes) storeShell.ligne(ligne)
    historyRef.current = [...historyRef.current, source]
    historyCursor.current = historyRef.current.length
    draftRef.current = ''
    editorRef.current?.setValue('')
    sourceRef.current = ''
  }

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    assurerLangue()
    self.MonacoEnvironment = { getWorker: () => new EditorWorker() }
    const editor = monaco.editor.create(host, {
      value: '',
      language: LANGUE,
      theme: themeMonaco(),
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 12,
      fontFamily: 'var(--font-family-mono)',
      fixedOverflowWidgets: true,
      scrollBeyondLastLine: false,
      lineNumbers: 'off',
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 8,
      overviewRulerLanes: 0,
      tabSize: 2,
      wordWrap: 'on',
      renderLineHighlight: 'none',
      scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
    })
    editorRef.current = editor
    editor.onDidChangeModelContent(() => {
      sourceRef.current = editor.getValue()
    })
    const run = () => runRef.current()
    editor.addCommand(monaco.KeyCode.Enter, run, '!suggestWidgetVisible')
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, run)
    editor.onKeyDown((event) => {
      const position = editor.getPosition()
      if (!position || editor.getSelection()?.isEmpty() === false) return
      const lastLine = editor.getModel()?.getLineCount() ?? 1
      if (event.keyCode === monaco.KeyCode.UpArrow && position.lineNumber === 1 && position.column === 1) {
        event.preventDefault()
        recall(-1)
      } else if (event.keyCode === monaco.KeyCode.DownArrow && position.lineNumber === lastLine) {
        event.preventDefault()
        recall(1)
      }
    })
    const syncTheme = () => monaco.editor.setTheme(themeMonaco())
    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      observer.disconnect()
      editor.dispose()
      editorRef.current = null
    }
  }, [])

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 bg-[var(--color-surface-panel)] p-2 text-xs text-[var(--color-text-secondary)]">
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-auto rounded border border-[var(--color-border-default)] bg-[var(--color-surface-input)] p-2 font-mono"
        aria-live="polite"
        aria-label="Journal du terminal"
      >
        {journal.length === 0 ? (
          <p className="m-0 text-[var(--color-text-tertiary)]">
            Entrée exécute. Maj+Entrée passe à la ligne. ↑ rappelle la commande.
          </p>
        ) : null}
        {journal.map((entree, index) => (
          <div key={`${index}-${entree.ligne}`} className="mb-1">
            <pre className="m-0 whitespace-pre-wrap text-[var(--color-text-primary)]">
              <span className="text-[var(--color-text-tertiary)]">{'> '}</span>
              {entree.ligne}
            </pre>
            {entree.erreur ? (
              <pre className="m-0 whitespace-pre-wrap pl-3 text-red-400">{entree.erreur}</pre>
            ) : null}
          </div>
        ))}
      </div>
      <div
        ref={hostRef}
        className="h-16 shrink-0 overflow-hidden rounded border border-[var(--color-border-default)]"
        aria-label="Commande"
      />
      <div className="flex items-center justify-between gap-2 text-[var(--color-text-tertiary)]">
        <span>Entrée · Maj+Entrée · Ctrl+Space</span>
        <button
          type="button"
          className="rounded border border-[var(--color-border-default)] px-2 py-1 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
          onClick={() => setMasqueAvant(storeShell.hote().journal.length)}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
