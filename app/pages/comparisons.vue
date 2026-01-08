<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useHead(() => ({
    title: t('geo_pages.comparisons.title'),
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com' + (route.path === '/' ? '' : route.path) }
    ]
}))

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
            <section>
                <h2 class="mt-0">{{ t('geo_pages.comparisons.internal_header') }}</h2>
                <p>{{ t('geo_pages.comparisons.internal') }}</p>
            </section>

            <section>
                <h2>{{ t('geo_pages.comparisons.siloed_header') }}</h2>
                <p>{{ t('geo_pages.comparisons.siloed') }}</p>
            </section>

            <section>
                <h2>{{ t('geo_pages.comparisons.global_header') }}</h2>
                <p>{{ t('geo_pages.comparisons.global') }}</p>
            </section>

            <blockquote>
                {{ t('geo_pages.comparisons.conclusion') }}
            </blockquote>
        </div>
    </InfoPage>
</template>
