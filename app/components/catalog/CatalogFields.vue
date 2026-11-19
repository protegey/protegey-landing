<script setup lang="ts">
import { usePartnerApiCatalog } from '~/composables/usePartnerApiCatalog'
// Response / webhook payload field reference: every path, type, nullability, when it appears,
// possible values with meanings, and an example.
import { computed } from 'vue'
import CatalogText from './CatalogText.vue'
import CatalogValues from './CatalogValues.vue'

const props = defineProps<{ fields: any[]; filter?: string }>()
const { t } = useI18n()
const { L } = usePartnerApiCatalog()

const rows = computed(() => {
    const q = (props.filter ?? '').trim().toLowerCase()
    const all = props.fields ?? []
    if (!q) return all
    return all.filter((f: any) => f.path.toLowerCase().includes(q)
        || L(f.description).toLowerCase().includes(q)
        || (f.values ?? []).some((v: any) => String(v.value).toLowerCase().includes(q)))
})

const depth = (path: string) => Math.min(3, path.split('.').length - 1)
const exampleText = (v: unknown) => (typeof v === 'string' ? v : JSON.stringify(v))
</script>

<template>
    <div class="divide-y divide-neutral-200 dark:divide-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-800">
        <p v-if="!rows.length" class="px-3 py-2 text-xs text-neutral-500">{{ t('api_docs.catalog.no_match') }}</p>
        <div v-for="f in rows" :key="f.path" class="px-3 py-2.5" :style="{ paddingInlineStart: `${0.75 + depth(f.path) * 0.75}rem` }">
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                <code dir="ltr" class="font-mono text-[12.5px] font-bold text-neutral-900 dark:text-white break-all">{{ f.path }}</code>
                <span dir="ltr" class="font-mono text-[11px] text-secondary-500 dark:text-secondary-300">{{ f.type }}</span>
                <span v-if="f.nullable" class="rounded-full bg-amber-500/10 px-1.5 py-px text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">{{ t('api_docs.catalog.nullable') }}</span>
                <span v-if="f.optional" class="rounded-full bg-neutral-500/10 px-1.5 py-px text-[10px] font-bold uppercase text-neutral-500">{{ t('api_docs.catalog.may_be_absent') }}</span>
                <span v-if="f.opaque" class="rounded-full bg-neutral-500/10 px-1.5 py-px text-[10px] font-bold uppercase text-neutral-500" :title="t('api_docs.catalog.opaque_hint')">{{ t('api_docs.catalog.opaque') }}</span>
            </div>
            <p v-if="f.description" class="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400"><CatalogText :text="L(f.description)" /></p>
            <p v-if="f.appearsWhen" class="mt-1 text-[11px] text-neutral-500"><span class="font-semibold">{{ t('api_docs.catalog.appears_when') }}:</span> <CatalogText :text="L(f.appearsWhen)" /></p>
            <div v-if="f.values?.length" class="mt-1.5">
                <p class="text-[10px] font-bold uppercase tracking-wide text-neutral-400 mb-1">{{ t('api_docs.catalog.possible_values') }}</p>
                <CatalogValues :values="f.values" />
            </div>
            <p v-if="f.example !== undefined" class="mt-1 text-[11px] text-neutral-500">{{ t('api_docs.catalog.example') }}: <code dir="ltr" class="font-mono break-all text-neutral-700 dark:text-neutral-300">{{ exampleText(f.example) }}</code></p>
        </div>
    </div>
</template>
