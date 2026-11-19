<script setup lang="ts">
// Global conventions (auth, casing, timestamps, amounts, nulls, pagination, rate limits),
// straight from the catalog — server-rendered.
import { computed } from 'vue'
import { usePartnerApiCatalog } from '~/composables/usePartnerApiCatalog'
import CatalogText from './CatalogText.vue'

const { t } = useI18n()
const { catalog, L } = usePartnerApiCatalog()
const c = computed(() => catalog.conventions)

const rows = computed(() => [
    { key: 'base_url', text: L(c.value.baseUrl) },
    { key: 'auth', code: c.value.authentication?.header, text: L(c.value.authentication?.description) },
    { key: 'content_type', code: c.value.contentType },
    { key: 'casing', text: L(c.value.casing?.description), chips: c.value.casing?.upperCasedFields },
    { key: 'timestamps', text: L(c.value.timestamps) },
    { key: 'amounts', text: L(c.value.amounts) },
    { key: 'nulls', text: L(c.value.nulls) },
    { key: 'unknown_fields', text: L(c.value.unknownFields) },
    { key: 'pagination', text: L(c.value.pagination) },
    { key: 'rate_limiting', text: L(c.value.rateLimiting) },
].filter((r) => r.text || r.code))
</script>

<template>
    <dl dir="ltr" class="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-800">
        <div v-for="r in rows" :key="r.key" class="grid gap-1 px-3 py-2.5 sm:grid-cols-[9rem_1fr] sm:gap-3">
            <dt class="text-xs font-bold text-neutral-900 dark:text-white">{{ t(`api_docs.catalog.conv_${r.key}`) }}</dt>
            <dd class="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                <code v-if="r.code" dir="ltr" class="me-1 rounded bg-neutral-100 dark:bg-neutral-800 px-1 py-px font-mono text-neutral-800 dark:text-neutral-200">{{ r.code }}</code>
                <CatalogText v-if="r.text" :text="r.text" />
                <span v-if="r.chips?.length" class="mt-1.5 flex flex-wrap gap-1">
                    <code v-for="f in r.chips" :key="f" dir="ltr" class="rounded bg-primary-500/10 px-1.5 py-px font-mono text-[10.5px] text-primary-700 dark:text-primary-300">{{ f }}</code>
                </span>
            </dd>
        </div>
    </dl>
</template>
