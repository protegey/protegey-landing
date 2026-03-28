<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()

const cases = [
    { id: 'sim_swap', titleKey: 'geo_pages.use_cases.sim_swap_title', contentKey: 'geo_pages.use_cases.sim_swap' },
    { id: 'ato', titleKey: 'geo_pages.use_cases.ato_title', contentKey: 'geo_pages.use_cases.ato' },
    { id: 'mule', titleKey: 'geo_pages.use_cases.mule_title', contentKey: 'geo_pages.use_cases.mule' },
    { id: 'repeat_actors', titleKey: 'geo_pages.use_cases.repeat_actors_title', contentKey: 'geo_pages.use_cases.repeat_actors' }
]

useSeoMeta({
    title: t('geo_pages.use_cases.title'),
    description: t('geo_pages.use_cases.title'),
})

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'CollectionPage',
            name: t('geo_pages.use_cases.title'),
            description: t('geo_pages.use_cases.title'), // Ideally should be a description of the page
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: cases.map((c, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@type': 'Article',
                        headline: t(c.titleKey),
                        description: t(c.contentKey),
                        genre: 'Case Study',
                        author: {
                            '@type': 'Organization',
                            name: 'Protegey'
                        }
                    }
                }))
            }
        }
    ])
}
</script>

<template>
    <InfoPage :title="t('geo_pages.use_cases.title')">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div v-for="c in cases" :key="c.id"
                class="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 backdrop-blur-sm">
                <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">{{ t(c.titleKey) }}</h3>
                <p class="text-neutral-500 dark:text-neutral-400 mb-0 text-base leading-relaxed">{{ t(c.contentKey) }}</p>
            </div>
        </div>
    </InfoPage>
</template>
