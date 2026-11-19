<script setup lang="ts">
// Global error shape + account-level errorCode values + example bodies — server-rendered.
import { computed } from 'vue'
import CodeBlock from '~/components/CodeBlock.vue'
import { prettyJson, usePartnerApiCatalog } from '~/composables/usePartnerApiCatalog'
import CatalogText from './CatalogText.vue'
import CatalogValues from './CatalogValues.vue'

const { t } = useI18n()
const { catalog, L } = usePartnerApiCatalog()
const ef = computed(() => catalog.conventions.errorFormat)
</script>

<template>
    <div v-if="ef" class="mt-4" dir="ltr">
        <p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"><CatalogText :text="L(ef.description)" /></p>
        <div v-if="ef.errorCodes?.length" class="mt-4">
            <h3 class="mb-1.5 text-xs font-semibold uppercase text-neutral-400">errorCode</h3>
            <CatalogValues :values="ef.errorCodes" />
        </div>
        <h3 class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.catalog.error_examples') }}</h3>
        <ul class="flex flex-col gap-3">
            <li v-for="(ex, i) in ef.examples" :key="i">
                <p class="mb-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <span class="me-1 rounded-md bg-amber-500/15 px-1.5 py-0.5 font-mono text-[11px] font-bold text-amber-700 dark:text-amber-300">HTTP {{ ex.status }}</span>
                    <CatalogText :text="L(ex.when)" />
                </p>
                <CodeBlock :code="prettyJson(ex.body)" />
            </li>
        </ul>
        <p class="mt-3 text-xs text-neutral-500">{{ t('api_docs.catalog.errors_per_endpoint') }}</p>
    </div>
</template>
