// Partner-API catalog — the generated source of truth for the /api-docs reference
// (synced from protegey-backend with `npm run sync:catalog`, never hand-edited).
// The small index (conventions, sandbox, webhook delivery, module summaries + lifecycles) is
// bundled with the page and server-rendered; each module's full detail and the webhook payload
// reference are separate lazy chunks, fetched only when a section scrolls into view or is opened.
import { shallowRef } from 'vue'
import catalogIndex from '~/data/partner-api-catalog/index.json'

export type Localized = { en?: string; fr?: string } | string | null | undefined

const moduleChunks = import.meta.glob('../data/partner-api-catalog/modules/*.json', { import: 'default' })
const webhookChunk = () => import('../data/partner-api-catalog/webhook-events.json').then((m) => m.default)

// Section anchors the partner portal deep-links to (#catalog-<anchor>).
export const MODULE_ANCHORS: Record<string, string> = {
    kyc: 'kyc',
    kyb: 'kyb',
    transactions: 'transactions',
    cashDeposits: 'cash-deposits',
    alerts: 'alerts',
    screening: 'screening',
    sharedSignals: 'shared-signals',
    deviceEvents: 'device-events',
    behavioralEvents: 'behavioral-events',
}

export const API_BASE_URL = 'https://api.protegey.com'

const moduleCache = new Map<string, Promise<any>>()
let webhookCache: Promise<any> | null = null

export function loadCatalogModule(key: string): Promise<any> {
    if (!moduleCache.has(key)) {
        const loader = moduleChunks[`../data/partner-api-catalog/modules/${key}.json`]
        moduleCache.set(key, loader ? loader() : Promise.reject(new Error(`Unknown catalog module ${key}`)))
    }
    return moduleCache.get(key)!
}

export function loadWebhookEvents(): Promise<any> {
    webhookCache ??= webhookChunk()
    return webhookCache
}

export function webhookAnchor(type: string) {
    return `catalog-webhook-${type.replace(/[^a-z0-9]+/gi, '-')}`
}

export function usePartnerApiCatalog() {
    const { locale } = useI18n()
    // Catalog text exists in en + fr; ar (and anything else) falls back to en.
    const L = (value: Localized): string => {
        if (value == null) return ''
        if (typeof value === 'string') return value
        return (locale.value === 'fr' ? value.fr : value.en) ?? value.en ?? value.fr ?? ''
    }
    const isFr = () => locale.value === 'fr'
    const moduleByKey = (key: string) => (catalogIndex as any).modules.find((m: any) => m.key === key)
    return { catalog: catalogIndex as any, L, isFr, moduleByKey }
}

// Lazy loader bound to a section element: loads when it nears the viewport (or on demand).
export function useLazyChunk<T>(load: () => Promise<T>) {
    const data = shallowRef<T | null>(null)
    const error = shallowRef<string | null>(null)
    const loading = shallowRef(false)
    let observer: IntersectionObserver | null = null
    let inflight: Promise<void> | null = null

    // Idempotent: every caller awaits the same in-flight load.
    const ensure = (): Promise<void> => {
        inflight ??= (async () => {
            loading.value = true
            try {
                data.value = await load()
            } catch (e: any) {
                error.value = e?.message ?? String(e)
                inflight = null
            } finally {
                loading.value = false
            }
        })()
        return inflight
    }

    const observe = (el: Element | null | undefined) => {
        if (!el || typeof IntersectionObserver === 'undefined') return
        observer = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                observer?.disconnect()
                ensure()
            }
        }, { rootMargin: '300px 0px' })
        observer.observe(el)
    }

    const stop = () => observer?.disconnect()
    return { data, error, loading, ensure, observe, stop }
}

// Build a copyable curl for an endpoint from the catalog's own examples.
export function buildCurl(endpoint: any): string {
    let path: string = endpoint.path
    for (const p of endpoint.pathParams ?? []) {
        path = path.replace(`{${p.name}}`, encodeURIComponent(String(p.example ?? `<${p.name}>`)))
    }
    const query = (endpoint.query ?? [])
        .filter((q: any) => q.example !== undefined && q.example !== null)
        .map((q: any) => `${encodeURIComponent(q.name)}=${encodeURIComponent(String(q.example))}`)
    const url = `${API_BASE_URL}${path}${query.length ? `?${query.join('&')}` : ''}`
    const lines = [`curl -X ${endpoint.method} "${url}"`, `  -H "x-api-key: YOUR_API_KEY"`]
    const body: Record<string, unknown> = {}
    for (const f of endpoint.body ?? []) if (f.example !== undefined) body[f.name] = f.example
    if (Object.keys(body).length) {
        lines.splice(1, 0, `  -H "Content-Type: application/json"`)
        const json = JSON.stringify(body, null, 2).replace(/'/g, `'\\''`)
        lines.push(`  -d '${json}'`)
    }
    return lines.join(' \\\n')
}

export function prettyJson(value: unknown): string {
    return JSON.stringify(value, null, 2)
}
