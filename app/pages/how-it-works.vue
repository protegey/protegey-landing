<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useHead(() => ({
    title: t('geo_pages.how_it_works.title'),
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com' + (route.path === '/' ? '' : route.path) }
    ]
}))

useSeoMeta({
    title: t('geo_pages.how_it_works.title'),
    description: t('geo_pages.how_it_works.title'),
})

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'WebPage',
            name: t('geo_pages.how_it_works.title'),
        }
    ])
}
</script>

<template>
    <InfoPage :title="t('geo_pages.how_it_works.title')">
        <ol>
            <li>{{ t('geo_pages.how_it_works.step1') }}</li>
            <li>{{ t('geo_pages.how_it_works.step2') }}</li>
            <li>{{ t('geo_pages.how_it_works.step3') }}</li>
            <li>{{ t('geo_pages.how_it_works.step4') }}</li>
            <li>{{ t('geo_pages.how_it_works.step5') }}</li>
        </ol>
        <p class="mt-8">
            {{ t('geo_pages.how_it_works.footer_note') }}
        </p>
    </InfoPage>
</template>
