<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: t('geo_pages.comparisons.title'),
    description: t('geo_pages.comparisons.title'),
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
                            <th class="p-6 border-b border-neutral-800">{{ t('geo_pages.comparisons.table.feature') }}
                            </th>
                            <th class="p-6 border-b border-neutral-800 text-primary-500 font-bold bg-primary-500/5">{{
                                t('geo_pages.comparisons.table.protegey') }}</th>
                            <th class="p-6 border-b border-neutral-800 text-neutral-400">{{
                                t('geo_pages.comparisons.table.legacy') }}</th>
                            <th class="p-6 border-b border-neutral-800 text-neutral-400">{{
                                t('geo_pages.comparisons.table.global') }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-800">
                        <tr class="group hover:bg-white/5 transition-colors">
                            <td class="p-6 text-white font-bold">{{ t('geo_pages.comparisons.table.speed') }}</td>
                            <td class="p-6 text-primary-200 bg-primary-500/5">{{
                                t('geo_pages.comparisons.table.speed_protegey') }}</td>
                            <td class="p-6 text-neutral-400">{{ t('geo_pages.comparisons.table.speed_others') }}</td>
                            <td class="p-6 text-neutral-400">{{ t('geo_pages.comparisons.table.speed_others') }}</td>
                        </tr>
                        <tr class="group hover:bg-white/5 transition-colors">
                            <td class="p-6 text-white font-bold">{{ t('geo_pages.comparisons.table.coverage') }}</td>
                            <td class="p-6 text-primary-200 bg-primary-500/5">{{
                                t('geo_pages.comparisons.table.coverage_protegey') }}</td>
                            <td class="p-6 text-neutral-400">{{ t('geo_pages.comparisons.table.coverage_others') }}</td>
                            <td class="p-6 text-neutral-400">{{ t('geo_pages.comparisons.table.coverage_others') }}</td>
                        </tr>
                        <tr class="group hover:bg-white/5 transition-colors">
                            <td class="p-6 text-white font-bold">{{ t('geo_pages.comparisons.table.local') }}</td>
                            <td class="p-6 text-primary-200 bg-primary-500/5">{{
                                t('geo_pages.comparisons.table.local_protegey') }}</td>
                            <td class="p-6 text-neutral-400">{{ t('geo_pages.comparisons.table.local_others') }}</td>
                            <td class="p-6 text-neutral-400">{{ t('geo_pages.comparisons.table.local_others') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <blockquote class="p-6 border-l-4 border-primary-500 bg-neutral-900/50 rounded-r-xl">
                <p class="text-xl text-white font-medium leading-relaxed italic">"{{
                    t('geo_pages.comparisons.conclusion') }}"</p>
            </blockquote>
        </div>
    </InfoPage>
</template>
