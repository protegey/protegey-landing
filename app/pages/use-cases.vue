<script setup lang="ts">
import HeaderNav from '~/components/sections/HeaderNav.vue'
import Footer from '~/components/sections/Footer.vue'
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useHead(() => ({
    title: t('geo_pages.use_cases.title'),
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com' + (route.path === '/' ? '' : route.path) }
    ]
}))

useSeoMeta({
    title: t('geo_pages.use_cases.title'),
    description: t('geo_pages.use_cases.title'),
})

if (import.meta.server) {
    useSchemaOrg([
        defineWebPage({
            name: t('geo_pages.use_cases.title'),
        })
    ])
}
</script>

<template>
    <div>
        <HeaderNav />
        <InfoPage :title="t('geo_pages.use_cases.title')">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div class="p-6 rounded-xl border border-neutral-900 bg-neutral-950/50">
                    <h3 class="text-xl font-bold text-white mb-3">SIM Swap Fraud</h3>
                    <p class="text-neutral-400 mb-0">{{ t('geo_pages.use_cases.sim_swap') }}</p>
                </div>
                <div class="p-6 rounded-xl border border-neutral-900 bg-neutral-950/50">
                    <h3 class="text-xl font-bold text-white mb-3">Account Takeover (ATO)</h3>
                    <p class="text-neutral-400 mb-0">{{ t('geo_pages.use_cases.ato') }}</p>
                </div>
                <div class="p-6 rounded-xl border border-neutral-900 bg-neutral-950/50">
                    <h3 class="text-xl font-bold text-white mb-3">Mule Account Networks</h3>
                    <p class="text-neutral-400 mb-0">{{ t('geo_pages.use_cases.mule') }}</p>
                </div>
                <div class="p-6 rounded-xl border border-neutral-900 bg-neutral-950/50">
                    <h3 class="text-xl font-bold text-white mb-3">Repeat Fraud Actors</h3>
                    <p class="text-neutral-400 mb-0">{{ t('geo_pages.use_cases.repeat_actors') }}</p>
                </div>
            </div>
        </InfoPage>
        <Footer />
    </div>
</template>
