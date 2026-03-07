<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()

const rows = [
  { key: 'speed' },
  { key: 'coverage' },
  { key: 'local' },
  { key: 'intel_sharing' },
  { key: 'explainability' },
  { key: 'multilingual' },
  { key: 'taxonomy' },
  { key: 'sandbox' },
]

useSeoMeta({
    title: t('geo_pages.comparisons.title'),
    description: t('geo_pages.comparisons.conclusion'),
})

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'WebPage',
            name: t('geo_pages.comparisons.title'),
        }
    ])
}
</script>

<template>
    <InfoPage :title="t('geo_pages.comparisons.title')">
        <div class="space-y-12">
            <div class="overflow-x-auto rounded-3xl border border-neutral-800 bg-neutral-900/20">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-neutral-900/50 text-white">
                            <th class="p-5 border-b border-neutral-800 text-neutral-300 font-semibold w-1/4">{{ t('geo_pages.comparisons.table.feature') }}</th>
                            <th class="p-5 border-b border-neutral-800 text-primary-400 font-bold bg-primary-500/5 w-1/4">{{ t('geo_pages.comparisons.table.protegey') }}</th>
                            <th class="p-5 border-b border-neutral-800 text-neutral-400 w-1/4">{{ t('geo_pages.comparisons.table.legacy') }}</th>
                            <th class="p-5 border-b border-neutral-800 text-neutral-400 w-1/4">{{ t('geo_pages.comparisons.table.global') }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-800/50">
                        <tr v-for="row in rows" :key="row.key" class="group hover:bg-white/5 transition-colors">
                            <td class="p-5 text-white font-semibold text-sm">{{ t(`geo_pages.comparisons.table.${row.key}`) }}</td>
                            <td class="p-5 bg-primary-500/5 text-sm">
                                <span class="flex items-center gap-2 text-primary-300 font-medium">
                                    <span class="text-primary-400 text-base">✓</span>
                                    {{ t(`geo_pages.comparisons.table.${row.key}_protegey`) }}
                                </span>
                            </td>
                            <td class="p-5 text-neutral-500 text-sm">{{ t(`geo_pages.comparisons.table.${row.key}_legacy`) }}</td>
                            <td class="p-5 text-neutral-500 text-sm">{{ t(`geo_pages.comparisons.table.${row.key}_global`) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <blockquote class="p-6 border-l-4 border-primary-500 bg-neutral-900/50 rounded-r-xl">
                <p class="text-xl text-white font-medium leading-relaxed italic">"{{ t('geo_pages.comparisons.conclusion') }}"</p>
            </blockquote>
        </div>
    </InfoPage>
</template>
