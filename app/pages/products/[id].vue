<script setup>
import { useRoute } from 'vue-router'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    Activity01Icon,
    ViewIcon,
    Settings01Icon,
    DashboardSquare01Icon
} from '@hugeicons/core-free-icons'
import ProductCTA from '~/components/products/ProductCTA.vue'

const route = useRoute()
const productId = route.params.id
const localePath = useLocalePath()

const iconMap = {
    signal: Activity01Icon,
    radar: ViewIcon,
    api: Settings01Icon,
    console: DashboardSquare01Icon
}

const productIcon = iconMap[productId] || Activity01Icon

const { t } = useI18n()

const productSchema = computed(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t(`products.${productId}.title`),
    "description": t(`products.${productId}.description`),
    "brand": {
        "@type": "Brand",
        "name": "Protegey"
    },
    "offers": {
        "@type": "Offer",
        "url": `https://protegey.com/products/${productId}`,
        "availability": "https://schema.org/InStock"
    }
}))

useHead({
    title: t('seo.product_detail.title', { name: t(`products.${productId}.title`) }),
    meta: [
        { name: 'description', content: t(`products.${productId}.description`) },
        { property: 'og:title', content: t('seo.product_detail.title', { name: t(`products.${productId}.title`) }) },
        { property: 'og:description', content: t(`products.${productId}.description`) },
        { property: 'og:image', content: t('seo.global.image') },
        { name: 'twitter:title', content: t('seo.product_detail.title', { name: t(`products.${productId}.title`) }) },
        { name: 'twitter:description', content: t(`products.${productId}.description`) },
        { name: 'twitter:image', content: t('seo.global.image') }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: computed(() => JSON.stringify(productSchema.value))
        }
    ]
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-950 pt-32 md:pt-40 pb-20 overflow-x-hidden">
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-7xl mx-auto">
                <!-- Back Link -->
                <NuxtLink :to="localePath('products')"
                    class="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-400 mb-16 transition-colors group">
                    <span class="group-hover:-translate-x-1 transition-transform">←</span> {{ $t('products.back_to_all')
                    }}
                </NuxtLink>

                <!-- Header Section -->
                <div class="flex flex-col lg:flex-row gap-12 lg:items-start mb-24">
                    <div class="shrink-0">
                        <div
                            class="inline-flex p-6 rounded-3xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 text-primary-400 shadow-2xl shadow-primary-500/10 mb-8 lg:mb-0">
                            <HugeiconsIcon :icon="productIcon" :size="64" />
                        </div>
                    </div>

                    <div class="flex-1">
                        <h1
                            class="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight capitalize leading-none">
                            {{ $t(`products.${productId}.title`) }}
                        </h1>
                        <p class="text-2xl md:text-3xl text-neutral-400 leading-relaxed max-w-4xl font-light">
                            {{ $t(`products.${productId}.description`) }}
                        </p>
                    </div>
                </div>

                <!-- Product detail sections -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-32">
                    <div
                        class="p-10 md:p-14 rounded-[2rem] bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700/80 transition-all hover:bg-neutral-900/50 group">
                        <h3 class="text-2xl font-bold text-white mb-6 group-hover:text-primary-400 transition-colors">{{
                            $t(`products.${productId}.features.f1_title`) }}</h3>
                        <p class="text-lg text-neutral-400 leading-relaxed">{{
                            $t(`products.${productId}.features.f1_desc`) }}</p>
                    </div>
                    <div
                        class="p-10 md:p-14 rounded-[2rem] bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700/80 transition-all hover:bg-neutral-900/50 group">
                        <h3 class="text-2xl font-bold text-white mb-6 group-hover:text-primary-400 transition-colors">{{
                            $t(`products.${productId}.features.f2_title`) }}</h3>
                        <p class="text-lg text-neutral-400 leading-relaxed">{{
                            $t(`products.${productId}.features.f2_desc`) }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6">
            <ProductCTA />
        </div>

        <!-- Background Decor -->
        <div
            class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3">
        </div>
    </div>
</template>
