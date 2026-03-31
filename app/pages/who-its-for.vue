<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'
import WhoItsFor from '~/components/sections/WhoItsFor.vue'

const { t } = useI18n()
const baseUrl = 'https://www.protegey.com'

usePageMeta({
    title: t('who_its_for.seo.title'),
    description: t('who_its_for.seo.description'),
    schemaOrg: [
        {
            '@type': 'WebPage',
            name: t('who_its_for.seo.title'),
            description: t('who_its_for.seo.description'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('who_its_for.seo.title'), item: `${baseUrl}/who-its-for` }
            ]
        }
    ]
})
</script>

<template>
    <InfoPage :title="t('who_its_for.title')" :subtitle="t('who_its_for.subtitle')">
        <!-- Cards -->
        <div class="max-w-5xl mx-auto">
            <WhoItsFor />
        </div>

        <!-- Closing note -->
        <p class="text-center text-neutral-500 dark:text-neutral-400 text-sm mt-14 max-w-xl mx-auto">
            {{ t('who_its_for.exclusion') }}
        </p>
    </InfoPage>
</template>
