<script setup lang="ts">
// Webhook reference: delivery contract (server-rendered) + every event with its full payload
// field reference and examples (lazy chunk, loaded when the list nears the viewport).
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import CodeBlock from '~/components/CodeBlock.vue'
import { loadWebhookEvents, prettyJson, useLazyChunk, usePartnerApiCatalog, webhookAnchor } from '~/composables/usePartnerApiCatalog'
import CatalogText from './CatalogText.vue'
import CatalogFields from './CatalogFields.vue'

const { t } = useI18n()
const { catalog, L } = usePartnerApiCatalog()
const delivery = computed(() => catalog.webhooks.delivery)
const events = computed(() => catalog.webhooks.events as Array<{ type: string; description: any }>)
const root = ref<HTMLElement | null>(null)
const lazy = useLazyChunk(loadWebhookEvents)
const open = ref(new Set<string>())
const filter = ref('')

const detail = (type: string) => (lazy.data.value as any)?.[type]

function toggle(type: string) {
    const next = new Set(open.value)
    next.has(type) ? next.delete(type) : next.add(type)
    open.value = next
    lazy.ensure()
}

const deliveryRows = computed(() => [
    { key: 'method', code: `${delivery.value.method} · ${delivery.value.contentType}` },
    { key: 'success', text: L(delivery.value.success) },
    { key: 'retries', text: L(delivery.value.retries) },
    { key: 'ordering', text: L(delivery.value.ordering) },
    { key: 'environments', text: L(delivery.value.environments) },
    { key: 'casing', text: L(delivery.value.casing) },
])

onMounted(async () => {
    lazy.observe(root.value)
    const hash = decodeURIComponent(window.location.hash.slice(1))
    const ev = events.value.find((e) => webhookAnchor(e.type) === hash)
    if (!ev) return
    open.value = new Set([ev.type])
    await lazy.ensure()
    await nextTick()
    document.getElementById(hash)?.scrollIntoView({ block: 'start' })
})
onBeforeUnmount(() => lazy.stop())
</script>

<template>
    <div id="catalog-webhooks" ref="root" dir="ltr" class="scroll-mt-28 mt-5">
        <h3 class="mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.catalog.wh_delivery') }}</h3>
        <dl class="divide-y divide-neutral-200 dark:divide-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div v-for="r in deliveryRows" :key="r.key" class="grid gap-1 px-3 py-2.5 sm:grid-cols-[9rem_1fr] sm:gap-3">
                <dt class="text-xs font-bold text-neutral-900 dark:text-white">{{ t(`api_docs.catalog.wh_${r.key}`) }}</dt>
                <dd class="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    <code v-if="r.code" dir="ltr" class="font-mono">{{ r.code }}</code>
                    <CatalogText v-else :text="r.text" />
                </dd>
            </div>
            <div v-for="h in delivery.headers" :key="h.name" class="grid gap-1 px-3 py-2.5 sm:grid-cols-[9rem_1fr] sm:gap-3">
                <dt><code dir="ltr" class="font-mono text-xs font-bold text-neutral-900 dark:text-white">{{ h.name }}</code></dt>
                <dd class="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400"><CatalogText :text="L(h.description)" /></dd>
            </div>
        </dl>

        <div class="mt-5 flex flex-wrap items-center justify-between gap-2">
            <h3 class="text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.catalog.wh_events') }}</h3>
            <label class="w-full sm:w-56">
                <span class="sr-only">{{ t('api_docs.catalog.filter_label') }}</span>
                <input v-model="filter" type="search" :placeholder="t('api_docs.catalog.filter_placeholder')"
                       class="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
                       @focus="lazy.ensure()" />
            </label>
        </div>
        <div class="mt-2 flex flex-col gap-2">
            <div v-for="ev in events" :id="webhookAnchor(ev.type)" :key="ev.type" class="scroll-mt-28 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h4>
                    <button type="button" class="flex w-full flex-col gap-1 px-3 py-2.5 text-start rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400"
                            :aria-expanded="open.has(ev.type)" :aria-controls="`${webhookAnchor(ev.type)}-body`" @click="toggle(ev.type)">
                        <span class="flex items-center gap-2">
                            <code dir="ltr" class="font-mono text-[12.5px] font-bold text-emerald-700 dark:text-emerald-400">{{ ev.type }}</code>
                            <span class="ms-auto text-neutral-400 text-xs" aria-hidden="true">{{ open.has(ev.type) ? '−' : '+' }}</span>
                        </span>
                        <span class="text-xs font-normal text-neutral-600 dark:text-neutral-400"><CatalogText :text="L(ev.description)" /></span>
                    </button>
                </h4>
                <div v-if="open.has(ev.type)" :id="`${webhookAnchor(ev.type)}-body`" class="border-t border-neutral-200 dark:border-neutral-800 p-3">
                    <p v-if="!detail(ev.type)" class="text-xs text-neutral-500">{{ t('api_docs.catalog.loading') }}</p>
                    <template v-else>
                        <h5 class="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t('api_docs.catalog.payload_fields') }}</h5>
                        <CatalogFields :fields="detail(ev.type).fields" :filter="filter" />
                        <h5 class="mt-4 mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t('api_docs.catalog.payload_examples') }}</h5>
                        <div class="flex flex-col gap-2">
                            <CodeBlock v-for="(ex, i) in detail(ev.type).examples" :key="i" :code="prettyJson(ex)" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <p v-if="lazy.error.value" class="mt-2 text-xs text-rose-600">{{ t('api_docs.catalog.load_error') }}</p>
    </div>
</template>
