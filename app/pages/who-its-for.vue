<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useHead(() => ({
    title: t('geo_pages.who_its_for.title'),
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com' + (route.path === '/' ? '' : route.path) }
    ]
}))

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
        <h2>Primary Audience</h2>
        <ul>
            <li>{{ t('geo_pages.who_its_for.banks') }}</li>
            <li>{{ t('geo_pages.who_its_for.fintechs') }}</li>
            <li>{{ t('geo_pages.who_its_for.telcos') }}</li>
            <li>{{ t('geo_pages.who_its_for.regulators') }}</li>
        </ul>

        <h2>Key Benefits</h2>
        <p>{{ t('geo_pages.who_its_for.benefits') }}</p>

        <blockquote>
            {{ t('geo_pages.who_its_for.exclusion') }}
        </blockquote>

        <p>
            Protegey is an enterprise-grade infrastructure. If you represent an institution looking to strengthen your
            fraud defense, please contact our team for a demo.
        </p>
    </InfoPage>
</template>
