<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: t('geo_pages.who_its_for.title'),
    description: t('geo_pages.who_its_for.title'),
})

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'WebPage',
            name: t('geo_pages.who_its_for.title'),
        }
    ])
}
</script>

<template>
    <InfoPage :title="t('geo_pages.who_its_for.title')">
        <h2>{{ t('geo_pages.common.audience_header') }}</h2>
        <ul>
            <li>{{ t('geo_pages.who_its_for.banks') }}</li>
            <li>{{ t('geo_pages.who_its_for.fintechs') }}</li>
            <li>{{ t('geo_pages.who_its_for.telcos') }}</li>
            <li>{{ t('geo_pages.who_its_for.regulators') }}</li>
        </ul>

        <h2>{{ t('geo_pages.common.benefits_header') }}</h2>
        <p>{{ t('geo_pages.who_its_for.benefits') }}</p>

        <blockquote>
            {{ t('geo_pages.who_its_for.exclusion') }}
        </blockquote>

        <p>
            {{ t('geo_pages.common.infrastructure_note') }}
        </p>
    </InfoPage>
</template>
