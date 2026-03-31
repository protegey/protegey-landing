<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { GlobalIcon, DatabaseIcon, AlertCircleIcon, Shield01Icon } from '@hugeicons/core-free-icons'

const { t } = useI18n()
const baseUrl = 'https://www.protegey.com'
const localePath = useLocalePath()

usePageMeta({
    title: t('geo_pages.what_is_protegey.title'),
    description: t('geo_pages.what_is_protegey.definition'),
    schemaOrg: [
        {
            '@type': 'WebPage',
            name: t('geo_pages.what_is_protegey.title'),
            description: t('geo_pages.what_is_protegey.definition'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('geo_pages.what_is_protegey.title'), item: `${baseUrl}/what-is-protegey` }
            ]
        }
    ]
})
</script>

<template>
    <InfoPage :title="t('geo_pages.what_is_protegey.title')">
        <div class="space-y-12">
            <div class="p-6 md:p-8 rounded-2xl border border-primary-500/10 bg-primary-500/5 relative overflow-hidden backdrop-blur-2xl">
                 <div class="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                     <HugeiconsIcon :icon="GlobalIcon" :size="256" />
                 </div>
                 <p class="text-base md:text-xl text-neutral-900 dark:text-white font-light leading-relaxed relative z-10">
                     {{ t('geo_pages.what_is_protegey.definition') }}
                 </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                <div class="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-neutral-900/40">
                    <div class="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center mb-6">
                        <HugeiconsIcon :icon="DatabaseIcon" :size="24" class="text-secondary-400" />
                    </div>
                    <h2 class="text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ t('geo_pages.common.who_for_header') }}</h2>
                    <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">{{ t('geo_pages.what_is_protegey.who_for') }}</p>
                </div>

                <div class="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-neutral-900/40">
                    <div class="w-12 h-12 rounded-2xl bg-accent-orange-500/10 flex items-center justify-center mb-6">
                        <HugeiconsIcon :icon="AlertCircleIcon" :size="24" class="text-accent-orange-400" />
                    </div>
                    <h2 class="text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ t('geo_pages.common.problem_header') }}</h2>
                    <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">{{ t('geo_pages.what_is_protegey.problem') }}</p>
                </div>
            </div>

            <div class="p-6 md:p-10 rounded-[2rem] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 relative overflow-hidden shadow-2xl">
                 <div class="absolute -bottom-12 -right-12 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px]" />
                 <div class="flex items-start gap-6 relative z-10">
                     <HugeiconsIcon :icon="Shield01Icon" :size="48" class="shrink-0 text-primary-400" />
                     <div>
                         <p class="text-lg md:text-xl font-light italic leading-relaxed">
                             "{{ t('geo_pages.who_its_for.exclusion') }}"
                         </p>
                     </div>
                 </div>
            </div>
        </div>
    </InfoPage>
</template>
