<script setup lang="ts">
import HeaderNav from '~/components/sections/HeaderNav.vue'
import Footer from '~/components/sections/Footer.vue'
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
        defineWebPage({
            name: t('geo_pages.comparisons.title'),
        })
    ])
}
</script>

<template>
    <div>
        <HeaderNav />
        <InfoPage :title="t('geo_pages.comparisons.title')">
            <div class="space-y-12 mt-8">
                <section>
                    <h2 class="mt-0">Protegey vs Internal Systems</h2>
                    <p>{{ t('geo_pages.comparisons.internal') }}</p>
                </section>

                <section>
                    <h2>Protegey vs Siloed Reporting</h2>
                    <p>{{ t('geo_pages.comparisons.siloed') }}</p>
                </section>

                <section>
                    <h2>Protegey vs Global Tools</h2>
                    <p>{{ t('geo_pages.comparisons.global') }}</p>
                </section>
            </div>
        </InfoPage>
        <Footer />
    </div>
</template>
