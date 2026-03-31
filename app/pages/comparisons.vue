<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()

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
    ogTitle: t('geo_pages.comparisons.title'),
    description: t('geo_pages.comparisons.conclusion'),
    ogDescription: t('geo_pages.comparisons.conclusion'),
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
        <div class="space-y-16">
            <div class="overflow-x-auto rounded-[2rem] border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-neutral-900/60 backdrop-blur-2xl shadow-2xl shadow-black/5 dark:shadow-black/20">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-neutral-50/50 dark:bg-white/5">
                            <th class="p-4 md:p-5 border-b border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 font-bold text-xs uppercase tracking-widest w-1/4">{{ t('geo_pages.comparisons.table.feature') }}</th>
                            <th class="p-4 md:p-5 border-b border-neutral-200 dark:border-white/10 text-primary-400 font-black bg-primary-500/5 w-1/4 text-sm tracking-tight">{{ t('geo_pages.comparisons.table.protegey') }}</th>
                            <th class="p-4 md:p-5 border-b border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 w-1/4 text-xs font-bold uppercase tracking-widest">{{ t('geo_pages.comparisons.table.legacy') }}</th>
                            <th class="p-4 md:p-5 border-b border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 w-1/4 text-xs font-bold uppercase tracking-widest">{{ t('geo_pages.comparisons.table.global') }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-100 dark:divide-white/5">
                        <tr v-for="row in rows" :key="row.key" class="group hover:bg-neutral-50 dark:hover:bg-white/5 transition-all duration-300">
                            <td class="p-4 md:p-5 text-neutral-900 dark:text-white font-bold text-sm tracking-tight">{{ t(`geo_pages.comparisons.table.${row.key}`) }}</td>
                            <td class="p-4 md:p-5 bg-primary-500/5 dark:bg-primary-500/10 text-xs">
                                <span class="flex items-center gap-3 text-primary-400 font-bold">
                                    <div class="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                                        <span class="text-[10px]">✓</span>
                                    </div>
                                    {{ t(`geo_pages.comparisons.table.${row.key}_protegey`) }}
                                </span>
                            </td>
                            <td class="p-4 md:p-5 text-neutral-500 dark:text-neutral-500 text-[10px] md:text-xs font-medium">{{ t(`geo_pages.comparisons.table.${row.key}_legacy`) }}</td>
                            <td class="p-4 md:p-5 text-neutral-500 dark:text-neutral-500 text-[10px] md:text-xs font-medium">{{ t(`geo_pages.comparisons.table.${row.key}_global`) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="relative p-8 rounded-[2rem] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 overflow-hidden shadow-2xl">
                <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px] -mr-32 -mt-32" />
                <p class="text-lg md:text-xl font-bold tracking-tighter leading-[1.1] mb-6 relative z-10">
                    "{{ t('geo_pages.comparisons.conclusion') }}"
                </p>
                <NuxtLink :to="localePath('/contact')" class="inline-flex items-center gap-2 text-primary-400 dark:text-primary-600 font-bold hover:gap-3 transition-all relative z-10">
                    See our comparative advantages
                    <span class="text-xl">→</span>
                </NuxtLink>
            </div>
        </div>
    </InfoPage>
</template>
