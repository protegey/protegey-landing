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
        defineWebPage({
            name: t('geo_pages.how_it_works.title'),
        })
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
            This sequential logic ensures that intelligence propagates through the network faster than the fraud itself,
            enabling proactive defense for all participants.
        </p>
    </InfoPage>
</template>
