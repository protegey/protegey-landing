<script setup lang="ts">
// Sandbox scenarios table — how to trigger each outcome, what happens, which webhooks fire.
// Server-rendered from the bundled index.
import { computed } from 'vue'
import { usePartnerApiCatalog, webhookAnchor } from '~/composables/usePartnerApiCatalog'
import CatalogText from './CatalogText.vue'

const { t } = useI18n()
const { catalog, L, isFr } = usePartnerApiCatalog()
const sb = computed(() => catalog.sandboxScenarios)

const moduleLabel = (key: string) => {
    // Sandbox rows name sanctions screening "sanctions"; the module key is "screening".
    const m = catalog.modules.find((x: any) => x.key === (key === 'sanctions' ? 'screening' : key))
    return m ? L(m.title) : key
}
</script>

<template>
    <div class="mt-4" dir="ltr">
        <p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"><CatalogText :text="L(sb.description)" /></p>
        <ul class="mt-4 flex flex-col gap-2">
            <li v-for="(s, i) in sb.scenarios" :key="i" class="rounded-xl border border-neutral-200 dark:border-neutral-800 p-3">
                <div class="flex flex-wrap items-center gap-2">
                    <span class="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-px text-[10.5px] font-semibold text-neutral-600 dark:text-neutral-300">{{ moduleLabel(s.module) }}</span>
                    <code dir="ltr" class="font-mono text-[12px] text-neutral-700 dark:text-neutral-300">{{ s.field }}</code>
                    <span class="text-[11px] text-neutral-500">{{ t(s.match === 'prefix' ? 'api_docs.catalog.match_prefix' : 'api_docs.catalog.match_exact') }}</span>
                    <code dir="ltr" class="rounded bg-violet-500/10 px-1.5 py-px font-mono text-[12px] font-bold text-violet-700 dark:text-violet-300">{{ s.value }}</code>
                </div>
                <p class="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400"><CatalogText :text="isFr() ? (s.resultFr || s.result) : s.result" /></p>
                <div class="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-500">
                    <code v-for="e in s.endpoints" :key="e" dir="ltr" class="font-mono">{{ e }}</code>
                    <span aria-hidden="true">·</span>
                    <span>{{ t('api_docs.catalog.webhooks_triggered') }}:</span>
                    <a v-for="w in s.webhooks" :key="w" :href="`#${webhookAnchor(w)}`" class="rounded-full bg-emerald-500/10 px-2 py-px font-mono text-[10.5px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline">{{ w }}</a>
                    <span v-if="!s.webhooks?.length" class="italic">{{ t('api_docs.catalog.none') }}</span>
                </div>
            </li>
        </ul>
        <p class="mt-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-3 text-xs text-neutral-600 dark:text-neutral-400">
            {{ t('api_docs.catalog.kyb_no_sandbox') }}
        </p>
    </div>
</template>
