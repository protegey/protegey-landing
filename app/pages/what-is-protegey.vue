<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: t('geo_pages.what_is_protegey.title'),
    description: t('geo_pages.what_is_protegey.definition'),
})

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'WebPage',
            name: t('geo_pages.what_is_protegey.title'),
            description: t('geo_pages.what_is_protegey.definition'),
        }
    ])
}
</script>

<template>
    <InfoPage :title="t('geo_pages.what_is_protegey.title')">
        <p>{{ t('geo_pages.what_is_protegey.definition') }}</p>

        <h2>{{ t('geo_pages.common.who_for_header') }}</h2>
        <p>{{ t('geo_pages.what_is_protegey.who_for') }}</p>

        <h2>{{ t('geo_pages.common.problem_header') }}</h2>
        <p>{{ t('geo_pages.what_is_protegey.problem') }}</p>

        <blockquote>
            {{ t('geo_pages.who_its_for.exclusion') }}
        </blockquote>
    </InfoPage>
</template>
