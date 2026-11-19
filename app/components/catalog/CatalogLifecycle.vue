<script setup lang="ts">
import { usePartnerApiCatalog } from '~/composables/usePartnerApiCatalog'
// Lifecycle flow built from the catalog: every state (with its meaning), then every transition
// as "from → to", what triggers it and which webhook fires. Plain HTML + inline SVG arrows that
// stack vertically on phones — no image files, no layout engine.
import CatalogText from './CatalogText.vue'
import CatalogValues from './CatalogValues.vue'

defineProps<{ lifecycle: any }>()
const { t } = useI18n()
const { L } = usePartnerApiCatalog()

const splitTo = (to: string) => to.split(' | ').map((s) => s.trim()).filter(Boolean)
</script>

<template>
    <div class="flex flex-col gap-4">
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
            {{ t('api_docs.catalog.lifecycle_field') }}
            <code dir="ltr" class="font-mono font-bold text-neutral-800 dark:text-neutral-200">{{ lifecycle.field }}</code>
        </p>

        <div>
            <p class="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t('api_docs.catalog.states') }}</p>
            <CatalogValues :values="lifecycle.states" />
        </div>

        <div v-if="lifecycle.submissionStates?.length">
            <p class="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t('api_docs.catalog.submission_states') }}</p>
            <CatalogValues :values="lifecycle.submissionStates" />
        </div>

        <div v-if="lifecycle.transitions?.length">
            <p class="mb-2 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t('api_docs.catalog.transitions') }}</p>
            <ol class="flex flex-col gap-2.5">
                <li v-for="(tr, i) in lifecycle.transitions" :key="i"
                    class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-3">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2" dir="ltr">
                        <div class="flex flex-wrap gap-1 sm:max-w-[45%]">
                            <span v-if="!tr.from.length" class="inline-flex items-center gap-1 rounded-full border border-dashed border-neutral-400 px-2 py-0.5 text-[11px] font-semibold text-neutral-500">
                                <span class="size-1.5 rounded-full bg-neutral-500" aria-hidden="true" />{{ t('api_docs.catalog.start') }}
                            </span>
                            <template v-for="f in tr.from" :key="f">
                                <span v-if="f === '*'" class="rounded-full border border-dashed border-neutral-400 px-2 py-0.5 text-[11px] font-semibold text-neutral-500">{{ t('api_docs.catalog.any_state') }}</span>
                                <span v-else class="rounded-full bg-neutral-200/70 dark:bg-neutral-800 px-2 py-0.5 font-mono text-[11px] font-semibold text-neutral-700 dark:text-neutral-200">{{ f }}</span>
                            </template>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0">
                            <svg viewBox="0 0 64 12" class="hidden sm:block h-3 w-12 text-neutral-400 shrink-0" aria-hidden="true">
                                <line x1="0" y1="6" x2="56" y2="6" stroke="currentColor" stroke-width="1.5" :stroke-dasharray="tr.webhook ? undefined : '3,3'" />
                                <path d="M54,1 L63,6 L54,11 Z" fill="currentColor" />
                            </svg>
                            <svg viewBox="0 0 12 24" class="sm:hidden h-6 w-3 ms-3 text-neutral-400 shrink-0" aria-hidden="true">
                                <line x1="6" y1="0" x2="6" y2="17" stroke="currentColor" stroke-width="1.5" :stroke-dasharray="tr.webhook ? undefined : '3,3'" />
                                <path d="M1,15 L6,24 L11,15 Z" fill="currentColor" />
                            </svg>
                            <span class="sr-only">→</span>
                            <span v-if="tr.webhook" class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10.5px] font-bold text-emerald-700 dark:text-emerald-400">
                                <span class="sr-only">{{ t('api_docs.catalog.webhook') }}:</span>{{ tr.webhook }}
                            </span>
                            <span v-else class="text-[10.5px] italic text-neutral-400">{{ t('api_docs.catalog.no_webhook') }}</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            <span v-for="to in splitTo(tr.to)" :key="to" class="rounded-full bg-primary-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-primary-700 dark:text-primary-300">{{ to }}</span>
                        </div>
                    </div>
                    <p class="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400"><CatalogText :text="L(tr.trigger)" /></p>
                </li>
            </ol>
        </div>

        <p v-if="lifecycle.note" class="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-3 text-xs text-neutral-600 dark:text-neutral-400">
            <CatalogText :text="L(lifecycle.note)" />
        </p>

        <div v-if="lifecycle.dispositions?.length">
            <p class="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-neutral-400">{{ t('api_docs.catalog.dispositions') }}</p>
            <CatalogValues :values="lifecycle.dispositions" />
        </div>
    </div>
</template>
