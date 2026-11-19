<script setup lang="ts">
// Full reference for one partner-API module, generated from the catalog:
// lifecycle (server-rendered from the bundled index) + endpoints / scenarios / response shapes
// (lazy chunk, fetched when the section nears the viewport or is opened, and only rendered for
// the items a reader expands).
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import CodeBlock from '~/components/CodeBlock.vue'
import CatalogText from './CatalogText.vue'
import CatalogParams from './CatalogParams.vue'
import CatalogFields from './CatalogFields.vue'
import CatalogLifecycle from './CatalogLifecycle.vue'
import {
    MODULE_ANCHORS, buildCurl, loadCatalogModule, prettyJson, useLazyChunk, usePartnerApiCatalog, webhookAnchor,
} from '~/composables/usePartnerApiCatalog'

const props = defineProps<{ moduleKey: string }>()
const { t } = useI18n()
const { catalog, L, moduleByKey } = usePartnerApiCatalog()

const mod = computed(() => moduleByKey(props.moduleKey))
const anchor = computed(() => `catalog-${MODULE_ANCHORS[props.moduleKey] ?? props.moduleKey}`)
const root = ref<HTMLElement | null>(null)
const lazy = useLazyChunk(() => loadCatalogModule(props.moduleKey))

type Tab = 'endpoints' | 'scenarios' | 'responses'
const tabs: Tab[] = ['endpoints', 'scenarios', 'responses']
const activeTab = ref<Tab>('endpoints')
const filter = ref('')
const openEndpoints = ref(new Set<string>())
const openScenarios = ref(new Set<string>())
const openShapes = ref(new Set<string>())

const endpointDetail = (id: string) => lazy.data.value?.endpoints?.find((e: any) => e.id === id)
const scenarios = computed<any[]>(() => lazy.data.value?.scenarios ?? [])
const responses = computed<Record<string, any>>(() => lazy.data.value?.responses ?? {})

const epAnchor = (id: string) => `${anchor.value}-ep-${id.replace(/[^a-z0-9]+/gi, '-')}`
const scAnchor = (id: string) => `${anchor.value}-sc-${id.replace(/[^a-z0-9]+/gi, '-')}`
const shapeAnchor = (name: string) => `${anchor.value}-shape-${name}`

function toggle(set: typeof openEndpoints, id: string) {
    const next = new Set(set.value)
    next.has(id) ? next.delete(id) : next.add(id)
    set.value = next
    lazy.ensure()
}

function selectTab(tab: Tab, focus = false) {
    activeTab.value = tab
    lazy.ensure()
    if (focus) nextTick(() => document.getElementById(`${anchor.value}-tab-${tab}`)?.focus())
}

function onTabKey(e: KeyboardEvent) {
    const i = tabs.indexOf(activeTab.value)
    let next: number | null = null
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    if (next === null) return
    e.preventDefault()
    selectTab(tabs[next], true)
}

async function reveal(tab: Tab, set: typeof openEndpoints, id: string, elId: string) {
    activeTab.value = tab
    if (!set.value.has(id)) set.value = new Set([...set.value, id])
    await lazy.ensure()
    await nextTick()
    document.getElementById(elId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Scenarios whose request matches this endpoint's method + path template.
function scenariosFor(ep: any) {
    const re = new RegExp(`^${ep.method} ${ep.path.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\{[^}]+\}/g, '[^/?]+')}(\\?.*)?$`)
    return scenarios.value.filter((s) => re.test(String(s.request).trim()))
}

// Scenario webhooks are the exact payloads sent (objects with `type`); tolerate bare type strings.
const whType = (w: any): string => (typeof w === 'string' ? w : w?.type ?? '')

const methodClass = (m: string) => ({
    GET: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
    POST: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    PATCH: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    PUT: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    DELETE: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
} as Record<string, string>)[m] ?? 'bg-neutral-500/15 text-neutral-600'

const statusClass = (s: number) => (s < 300
    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
    : s < 500 ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300' : 'bg-rose-500/15 text-rose-700 dark:text-rose-300')

onMounted(() => {
    lazy.observe(root.value)
    const hash = decodeURIComponent(window.location.hash.slice(1))
    if (!hash.startsWith(anchor.value)) return
    lazy.ensure()
    const ep = mod.value?.endpoints.find((e: any) => hash === epAnchor(e.id))
    if (ep) return reveal('endpoints', openEndpoints, ep.id, hash)
    const shape = mod.value?.responseShapes.find((s: string) => hash === shapeAnchor(s))
    if (shape) return reveal('responses', openShapes, shape, hash)
    lazy.ensure().then(() => {
        const sc = scenarios.value.find((s) => hash === scAnchor(s.id))
        if (sc) reveal('scenarios', openScenarios, sc.id, hash)
    })
})
onBeforeUnmount(() => lazy.stop())
</script>

<template>
    <div v-if="mod" :id="anchor" ref="root" dir="ltr" class="scroll-mt-28 mt-6 border-t border-neutral-200 dark:border-neutral-800 pt-5">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <h4 class="text-sm font-black uppercase tracking-wide text-neutral-900 dark:text-white">
                {{ t('api_docs.catalog.reference_title') }} — {{ L(mod.title) }}
            </h4>
            <span class="rounded-full border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-neutral-500">
                {{ t('api_docs.catalog.generated_badge', { v: catalog.catalogVersion }) }}
            </span>
        </div>

        <!-- Lifecycle (server-rendered) -->
        <section v-if="mod.lifecycle" class="mt-4" :aria-labelledby="`${anchor}-lifecycle`">
            <h5 :id="`${anchor}-lifecycle`" class="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">{{ t('api_docs.catalog.lifecycle') }}</h5>
            <CatalogLifecycle :lifecycle="mod.lifecycle" />
        </section>

        <!-- Tabs -->
        <div class="mt-5 flex flex-wrap items-center justify-between gap-2">
            <div role="tablist" :aria-label="t('api_docs.catalog.reference_title')" class="inline-flex rounded-xl border border-neutral-200 dark:border-neutral-800 p-0.5" @keydown="onTabKey">
                <button v-for="tab in tabs" :id="`${anchor}-tab-${tab}`" :key="tab" type="button" role="tab"
                        :aria-selected="activeTab === tab" :aria-controls="`${anchor}-panel-${tab}`" :tabindex="activeTab === tab ? 0 : -1"
                        class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400"
                        :class="activeTab === tab ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'"
                        @click="selectTab(tab)">
                    {{ t(`api_docs.catalog.tab_${tab}`) }}
                    <span class="opacity-60">({{ tab === 'endpoints' ? mod.endpoints.length : tab === 'scenarios' ? mod.scenarioCount : mod.responseShapes.length }})</span>
                </button>
            </div>
            <label v-if="activeTab !== 'scenarios'" class="relative w-full sm:w-56">
                <span class="sr-only">{{ t('api_docs.catalog.filter_label') }}</span>
                <input v-model="filter" type="search" :placeholder="t('api_docs.catalog.filter_placeholder')"
                       class="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
                       @focus="lazy.ensure()" />
            </label>
        </div>
        <p v-if="lazy.error.value" class="mt-2 text-xs text-rose-600">{{ t('api_docs.catalog.load_error') }}</p>

        <!-- Endpoints -->
        <div v-show="activeTab === 'endpoints'" :id="`${anchor}-panel-endpoints`" role="tabpanel" :aria-labelledby="`${anchor}-tab-endpoints`" class="mt-3 flex flex-col gap-2">
            <div v-for="ep in mod.endpoints" :id="epAnchor(ep.id)" :key="ep.id" class="scroll-mt-28 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h5>
                    <button type="button" class="flex w-full flex-col gap-1 px-3 py-2.5 text-start hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400"
                            :aria-expanded="openEndpoints.has(ep.id)" :aria-controls="`${epAnchor(ep.id)}-body`" @click="toggle(openEndpoints, ep.id)">
                        <span class="flex flex-wrap items-center gap-2" dir="ltr">
                            <span class="rounded-md px-1.5 py-0.5 font-mono text-[10.5px] font-black" :class="methodClass(ep.method)">{{ ep.method }}</span>
                            <code class="font-mono text-[12.5px] font-semibold text-neutral-900 dark:text-white break-all">{{ ep.path }}</code>
                            <span class="ms-auto text-neutral-400 text-xs" aria-hidden="true">{{ openEndpoints.has(ep.id) ? '−' : '+' }}</span>
                        </span>
                        <span class="text-xs font-normal text-neutral-600 dark:text-neutral-400"><CatalogText :text="L(ep.summary)" /></span>
                        <span v-if="ep.webhooksFired.length" class="flex flex-wrap gap-1">
                            <span v-for="w in ep.webhooksFired" :key="w" class="rounded-full bg-emerald-500/10 px-2 py-px font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400">⚡ {{ w }}</span>
                        </span>
                    </button>
                </h5>
                <div v-if="openEndpoints.has(ep.id)" :id="`${epAnchor(ep.id)}-body`" class="border-t border-neutral-200 dark:border-neutral-800 px-3 py-3">
                    <p v-if="!endpointDetail(ep.id)" class="text-xs text-neutral-500">{{ t('api_docs.catalog.loading') }}</p>
                    <template v-else>
                        <template v-for="d in [endpointDetail(ep.id)]" :key="d.id">
                            <p v-if="d.notes" class="rounded-lg bg-amber-500/5 border border-amber-500/20 px-3 py-2 text-xs text-neutral-700 dark:text-neutral-300">
                                <span class="font-semibold">{{ t('api_docs.catalog.notes') }}:</span> <CatalogText :text="L(d.notes)" />
                            </p>

                            <template v-for="loc in ['pathParams', 'query', 'body']" :key="loc">
                                <div v-if="d[loc]?.length" class="mt-3">
                                    <h6 class="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t(`api_docs.catalog.loc_${loc}`) }}</h6>
                                    <CatalogParams :params="d[loc]" :filter="filter" />
                                </div>
                            </template>
                            <p v-if="!d.pathParams?.length && !d.query?.length && !d.body?.length" class="mt-1 text-xs text-neutral-500">{{ t('api_docs.catalog.no_params') }}</p>

                            <h6 class="mt-4 mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t('api_docs.catalog.example_request') }}</h6>
                            <CodeBlock :code="buildCurl(d)" />

                            <div class="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                                <span>{{ t('api_docs.catalog.success') }}:</span>
                                <span class="rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold" :class="statusClass(d.successStatus)">HTTP {{ d.successStatus }}</span>
                                <button type="button" class="font-mono text-[11px] text-primary-600 dark:text-primary-300 underline underline-offset-2"
                                        @click="reveal('responses', openShapes, d.responseShape, shapeAnchor(d.responseShape))">{{ d.responseShape }}</button>
                            </div>

                            <div class="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                                <span>{{ t('api_docs.catalog.webhooks_fired') }}:</span>
                                <a v-for="w in d.webhooksFired" :key="w" :href="`#${webhookAnchor(w)}`" class="rounded-full bg-emerald-500/10 px-2 py-px font-mono text-[10.5px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline">{{ w }}</a>
                                <span v-if="!d.webhooksFired?.length" class="italic text-neutral-400">{{ t('api_docs.catalog.none') }}</span>
                            </div>

                            <div v-if="scenariosFor(d).length" class="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                                <span>{{ t('api_docs.catalog.possible_outcomes') }}:</span>
                                <button v-for="s in scenariosFor(d)" :key="s.id" type="button"
                                        class="rounded-full border border-neutral-200 dark:border-neutral-700 px-2 py-px text-[11px] hover:border-primary-400"
                                        @click="reveal('scenarios', openScenarios, s.id, scAnchor(s.id))">{{ L(s.title) }}</button>
                            </div>

                            <div v-if="d.errors?.length" class="mt-4">
                                <h6 class="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t('api_docs.catalog.errors') }}</h6>
                                <ul class="flex flex-col gap-2">
                                    <li v-for="(err, i) in d.errors" :key="i" class="rounded-lg border border-neutral-200 dark:border-neutral-800 p-2.5">
                                        <div class="flex flex-wrap items-center gap-2">
                                            <span class="rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold" :class="statusClass(err.status)">HTTP {{ err.status }}</span>
                                            <code v-if="err.body?.errorCode" dir="ltr" class="font-mono text-[11px] font-bold text-rose-600 dark:text-rose-400">{{ err.body.errorCode }}</code>
                                        </div>
                                        <p class="mt-1 text-xs text-neutral-600 dark:text-neutral-400"><CatalogText :text="L(err.when)" /></p>
                                        <CodeBlock class="mt-1.5" :code="prettyJson(err.body)" />
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>

        <!-- Scenarios -->
        <div v-show="activeTab === 'scenarios'" :id="`${anchor}-panel-scenarios`" role="tabpanel" :aria-labelledby="`${anchor}-tab-scenarios`" class="mt-3 flex flex-col gap-2">
            <p v-if="!lazy.data.value" class="text-xs text-neutral-500">{{ t('api_docs.catalog.loading') }}</p>
            <p v-else-if="!scenarios.length" class="text-xs text-neutral-500">{{ t('api_docs.catalog.none') }}</p>
            <div v-for="s in scenarios" :id="scAnchor(s.id)" :key="s.id" class="scroll-mt-28 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h5>
                    <button type="button" class="flex w-full flex-wrap items-center gap-2 px-3 py-2.5 text-start rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400"
                            :aria-expanded="openScenarios.has(s.id)" :aria-controls="`${scAnchor(s.id)}-body`" @click="toggle(openScenarios, s.id)">
                        <span class="rounded-md px-1.5 py-0.5 font-mono text-[10.5px] font-bold" :class="statusClass(s.httpStatus)">{{ s.httpStatus }}</span>
                        <span class="text-sm font-semibold text-neutral-900 dark:text-white">{{ L(s.title) }}</span>
                        <span v-if="s.sandboxTrigger" class="rounded-full bg-violet-500/10 px-2 py-px font-mono text-[10px] font-bold text-violet-700 dark:text-violet-300">sandbox: {{ s.sandboxTrigger }}</span>
                        <span v-for="(w, wi) in s.webhooks" :key="wi" class="rounded-full bg-emerald-500/10 px-2 py-px font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400">⚡ {{ whType(w) }}</span>
                        <span class="ms-auto text-neutral-400 text-xs" aria-hidden="true">{{ openScenarios.has(s.id) ? '−' : '+' }}</span>
                    </button>
                </h5>
                <div v-if="openScenarios.has(s.id)" :id="`${scAnchor(s.id)}-body`" class="border-t border-neutral-200 dark:border-neutral-800 px-3 py-3">
                    <div class="rounded-lg bg-primary-500/5 border border-primary-500/20 px-3 py-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <span class="font-semibold">{{ t('api_docs.catalog.what_to_do') }}</span> <CatalogText :text="L(s.description)" />
                    </div>
                    <p class="mt-3 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t('api_docs.catalog.request') }}</p>
                    <code dir="ltr" class="mt-1 block font-mono text-[11.5px] text-neutral-800 dark:text-neutral-200 break-all">{{ s.request }}</code>
                    <p v-if="s.sandboxTrigger" class="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                        {{ t('api_docs.catalog.sandbox_trigger') }}: <code dir="ltr" class="font-mono font-bold">{{ s.sandboxTrigger }}</code> —
                        <a href="#catalog-sandbox" class="text-primary-600 dark:text-primary-300 underline underline-offset-2">{{ t('api_docs.catalog.see_sandbox') }}</a>
                    </p>
                    <p class="mt-3 mb-1 text-[10px] font-bold uppercase tracking-wide text-neutral-400">
                        {{ t('api_docs.catalog.response') }} — HTTP {{ s.httpStatus }} ·
                        <button type="button" class="font-mono normal-case text-primary-600 dark:text-primary-300 underline underline-offset-2" @click="reveal('responses', openShapes, s.shape, shapeAnchor(s.shape))">{{ s.shape }}</button>
                    </p>
                    <CodeBlock :code="prettyJson(s.response)" />
                    <p v-if="!s.webhooks?.length" class="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                        {{ t('api_docs.catalog.webhooks_triggered') }}: <span class="italic text-neutral-400">{{ t('api_docs.catalog.none') }}</span>
                    </p>
                    <div v-for="(w, wi) in s.webhooks" :key="wi" class="mt-3">
                        <p class="mb-1 text-[10px] font-bold uppercase tracking-wide text-neutral-400">
                            {{ t('api_docs.catalog.webhook_payload') }} ·
                            <a :href="`#${webhookAnchor(whType(w))}`" class="font-mono normal-case text-emerald-700 dark:text-emerald-400 underline underline-offset-2">{{ whType(w) }}</a>
                        </p>
                        <CodeBlock v-if="typeof w === 'object'" :code="prettyJson(w)" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Response shapes -->
        <div v-show="activeTab === 'responses'" :id="`${anchor}-panel-responses`" role="tabpanel" :aria-labelledby="`${anchor}-tab-responses`" class="mt-3 flex flex-col gap-2">
            <p v-if="!lazy.data.value" class="text-xs text-neutral-500">{{ t('api_docs.catalog.loading') }}</p>
            <div v-for="(shape, name) in responses" :id="shapeAnchor(String(name))" :key="name" class="scroll-mt-28 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h5>
                    <button type="button" class="flex w-full flex-wrap items-center gap-2 px-3 py-2.5 text-start rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400"
                            :aria-expanded="openShapes.has(String(name))" :aria-controls="`${shapeAnchor(String(name))}-body`" @click="toggle(openShapes, String(name))">
                        <code dir="ltr" class="font-mono text-[12.5px] font-bold text-neutral-900 dark:text-white">{{ name }}</code>
                        <span class="text-xs text-neutral-500">{{ L(shape.description) }}</span>
                        <span class="text-[10px] text-neutral-400">· {{ t('api_docs.catalog.field_count', { n: shape.fields.length }) }}</span>
                        <span class="ms-auto text-neutral-400 text-xs" aria-hidden="true">{{ openShapes.has(String(name)) ? '−' : '+' }}</span>
                    </button>
                </h5>
                <div v-if="openShapes.has(String(name))" :id="`${shapeAnchor(String(name))}-body`" class="border-t border-neutral-200 dark:border-neutral-800 p-3">
                    <CatalogFields :fields="shape.fields" :filter="filter" />
                </div>
            </div>
        </div>
    </div>
</template>
