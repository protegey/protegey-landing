<script setup lang="ts">
import HeaderNav from '~/components/sections/HeaderNav.vue'
import Footer from '~/components/sections/Footer.vue'
import InfoPage from '~/components/sections/InfoPage.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useHead(() => ({
    title: t('geo_pages.what_is_protegey.title'),
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com' + (route.path === '/' ? '' : route.path) }
    ]
}))

useSeoMeta({
    title: t('geo_pages.what_is_protegey.title'),
    description: t('geo_pages.what_is_protegey.definition'),
})

if (import.meta.server) {
    useSchemaOrg([
        defineWebPage({
            name: t('geo_pages.what_is_protegey.title'),
            description: t('geo_pages.what_is_protegey.definition'),
        })
    ])
}
</script>

<template>
    <div>
        <HeaderNav />
        <div class="py-24 bg-black text-white">
            <div class="max-w-4xl mx-auto px-4">
                <h1 class="text-4xl font-bold mb-8 text-white">{{ t('geo_pages.what_is_protegey.title') }}</h1>
                <p class="text-xl text-neutral-300">{{ t('geo_pages.what_is_protegey.definition') }}</p>

                <h2 class="text-2xl font-bold mt-12 mb-6">Who It Is For</h2>
                <p class="text-neutral-400">{{ t('geo_pages.what_is_protegey.who_for') }}</p>

                <h2 class="text-2xl font-bold mt-12 mb-6">Core Problem Solved</h2>
                <p class="text-neutral-400">{{ t('geo_pages.what_is_protegey.problem') }}</p>

                <blockquote class="border-l-4 border-primary-500 pl-4 italic mt-8 text-neutral-500">
                    {{ t('geo_pages.who_its_for.exclusion') }}
                </blockquote>
            </div>
        </div>
        <Footer />
    </div>
</template>
