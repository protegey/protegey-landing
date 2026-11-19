<script setup lang="ts">
import { usePartnerApiCatalog } from '~/composables/usePartnerApiCatalog'
// Request reference for one location (path / query / body): one row per field, nested object
// fields flattened as parent.child. Rendered as stacked rows (not a wide table) so every column
// stays readable on a phone.
import { computed } from 'vue'
import CatalogText from './CatalogText.vue'
import CatalogValues from './CatalogValues.vue'

const props = defineProps<{ params: any[]; filter?: string }>()
const { t } = useI18n()
const { L } = usePartnerApiCatalog()

const rows = computed(() => {
    const out: any[] = []
    for (const p of props.params ?? []) {
        out.push({ ...p, fullName: p.name, depth: 0 })
        for (const f of p.fields ?? []) out.push({ ...f, fullName: `${p.name}.${f.name}`, depth: 1 })
    }
    const q = (props.filter ?? '').trim().toLowerCase()
    if (!q) return out
    return out.filter((r) => r.fullName.toLowerCase().includes(q)
        || L(r.description).toLowerCase().includes(q)
        || (r.allowedValues ?? []).some((v: any) => String(v.value).toLowerCase().includes(q)))
})

const constraintLabel = (key: string, value: unknown) => {
    const map: Record<string, string> = {
        minimum: 'api_docs.catalog.c_minimum', maximum: 'api_docs.catalog.c_maximum',
        exclusiveMinimum: 'api_docs.catalog.c_exclusive_minimum', minLength: 'api_docs.catalog.c_min_length',
        maxLength: 'api_docs.catalog.c_max_length', notEmpty: 'api_docs.catalog.c_not_empty',
    }
    return map[key] ? t(map[key], { n: String(value) }) : `${key}: ${value}`
}

const exampleText = (v: unknown) => (typeof v === 'string' ? v : JSON.stringify(v))
</script>

<template>
    <div class="divide-y divide-neutral-200 dark:divide-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-800">
        <p v-if="!rows.length" class="px-3 py-2 text-xs text-neutral-500">{{ t('api_docs.catalog.no_match') }}</p>
        <div v-for="r in rows" :key="r.fullName" class="px-3 py-2.5" :class="r.depth ? 'ps-7 bg-neutral-50/60 dark:bg-neutral-900/30' : ''">
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                <code dir="ltr" class="font-mono text-[12.5px] font-bold text-neutral-900 dark:text-white break-all">{{ r.fullName }}</code>
                <span dir="ltr" class="font-mono text-[11px] text-secondary-500 dark:text-secondary-300">{{ r.type }}<template v-if="r.format"> · {{ r.format }}</template></span>
                <span v-if="r.required" class="rounded-full bg-rose-500/10 px-1.5 py-px text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">{{ t('api_docs.catalog.required') }}</span>
                <span v-else class="rounded-full bg-neutral-500/10 px-1.5 py-px text-[10px] font-bold uppercase text-neutral-500">{{ t('api_docs.catalog.optional') }}</span>
                <span v-if="r.default !== undefined" class="text-[11px] text-neutral-500">{{ t('api_docs.catalog.default') }}: <code dir="ltr" class="font-mono">{{ exampleText(r.default) }}</code></span>
            </div>
            <p v-if="r.description" class="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400"><CatalogText :text="L(r.description)" /></p>
            <p v-if="r.requiredWhen" class="mt-1 text-xs text-amber-700 dark:text-amber-400"><span class="font-semibold">{{ t('api_docs.catalog.required_when') }}:</span> <CatalogText :text="L(r.requiredWhen)" /></p>
            <div v-if="r.constraints && Object.keys(r.constraints).length" class="mt-1 flex flex-wrap gap-1">
                <span v-for="(v, k) in r.constraints" :key="k" class="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-px text-[10.5px] text-neutral-600 dark:text-neutral-300">{{ constraintLabel(String(k), v) }}</span>
            </div>
            <div v-if="r.allowedValues?.length" class="mt-1.5">
                <p class="text-[10px] font-bold uppercase tracking-wide text-neutral-400 mb-1">{{ t('api_docs.catalog.allowed_values') }}</p>
                <CatalogValues :values="r.allowedValues" />
            </div>
            <p v-if="r.casing" class="mt-1 text-[11px] text-neutral-500"><span class="font-semibold">{{ t('api_docs.catalog.casing') }}:</span> <CatalogText :text="L(r.casing)" /></p>
            <p v-if="r.notes" class="mt-1 text-[11px] text-neutral-500"><span class="font-semibold">{{ t('api_docs.catalog.notes') }}:</span> <CatalogText :text="L(r.notes)" /></p>
            <p v-if="r.example !== undefined && !r.fields" class="mt-1 text-[11px] text-neutral-500">{{ t('api_docs.catalog.example') }}: <code dir="ltr" class="font-mono break-all text-neutral-700 dark:text-neutral-300">{{ exampleText(r.example) }}</code></p>
        </div>
    </div>
</template>
