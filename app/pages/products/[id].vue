<script setup>
import { useRoute } from 'vue-router'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    Activity01Icon,
    ViewIcon,
    Settings01Icon,
    DashboardSquare01Icon,
    Shield01Icon,
    FingerPrintIcon,
    UserGroupIcon,
    ZapIcon,
    CheckmarkCircle01Icon,
    UserIcon,
    HelpCircleIcon
} from '@hugeicons/core-free-icons'
import ProductCTA from '~/components/products/ProductCTA.vue'

const route = useRoute()
const productId = route.params.id
const localePath = useLocalePath()

const iconMap = {
    signal: Activity01Icon,
    radar: ViewIcon,
    api: Settings01Icon,
    console: DashboardSquare01Icon,
    compliance: Shield01Icon,
    panid: FingerPrintIcon
}

const productIcon = iconMap[productId] || Activity01Icon

const { t, tm, rt } = useI18n()

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
        "url": `https://www.protegey.com/products/${productId}`,
        "availability": "https://schema.org/InStock"
    }
}))

useSeoMeta({
    title: t('seo.product_detail.title', { name: t(`products.${productId}.title`) }),
    ogTitle: t('seo.product_detail.title', { name: t(`products.${productId}.title`) }),
    description: t(`products.${productId}.description`),
    ogDescription: t(`products.${productId}.description`),
    ogImage: t('seo.global.image'),
    twitterCard: 'summary_large_image',
    twitterTitle: t('seo.product_detail.title', { name: t(`products.${productId}.title`) }),
    twitterDescription: t(`products.${productId}.description`),
    twitterImage: t('seo.global.image'),
    twitterSite: '@ProtegeyHQ'
})

useSchemaOrg([
    defineProduct({
        name: t(`products.${productId}.title`),
        description: t(`products.${productId}.description`),
        brand: { name: 'Protegey' },
        offers: [
            { url: `https://www.protegey.com/products/${productId}`, availability: 'https://schema.org/InStock' }
        ]
    }),
    defineBreadcrumb({
        items: [
            { name: t('nav.home'), item: '/' },
            { name: t('nav.products'), item: '/products' },
            { name: t(`products.${productId}.title`), item: `/products/${productId}` }
        ]
    })
])

useHead({
    link: [
        { rel: 'canonical', href: `https://www.protegey.com/products/${productId}` }
    ]
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-950 pt-32 md:pt-40 pb-20 overflow-hidden">
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-7xl mx-auto">
                <!-- Back Link -->
                <NuxtLink :to="localePath('products')"
                    class="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-400 mb-16 transition-colors group">
                    <span class="group-hover:-translate-x-1 transition-transform">←</span> {{ $t('products.back_to_all')
                    }}
                </NuxtLink>

                <!-- Hero Section -->
                <div class="flex flex-col lg:flex-row gap-12 lg:items-start mb-32">
                    <div class="shrink-0 flex flex-col items-center lg:items-start">
                        <div
                            class="inline-flex p-6 rounded-[2rem] bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 text-primary-400 shadow-2xl shadow-primary-500/10 mb-6">
                            <HugeiconsIcon :icon="productIcon" :size="80" />
                        </div>
                        <div v-if="$te(`products.${productId}.status`)"
                            class="px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold uppercase tracking-widest">
                            {{ $t(`products.${productId}.status`) }}
                        </div>
                    </div>

                    <div class="flex-1 text-center lg:text-left">
                        <p class="text-primary-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">{{
                            $t(`products.${productId}.tagline`) }}</p>
                        <h1
                            class="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight capitalize leading-none">
                            {{ $t(`products.${productId}.title`) }}
                        </h1>
                        <p
                            class="text-lg sm:text-2xl md:text-3xl text-neutral-400 leading-relaxed max-w-4xl font-light">
                            {{ $t(`products.${productId}.description`) }}
                        </p>
                    </div>
                </div>

                <!-- Two Pillar Sections -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
                    <!-- Why we built it -->
                    <div class="p-10 rounded-[2.5rem] bg-neutral-900/30 border border-neutral-800 flex flex-col">
                        <div
                            class="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-6">
                            <HugeiconsIcon :icon="UserGroupIcon" :size="24" />
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-6">{{ $t('products.why_built_title') }}</h2>
                        <p class="text-neutral-400 leading-relaxed">{{ $t(`products.${productId}.why_built`) }}</p>
                    </div>

                    <!-- What you can do -->
                    <div class="p-10 rounded-[2.5rem] bg-neutral-900/30 border border-neutral-800 flex flex-col">
                        <div
                            class="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                            <HugeiconsIcon :icon="ZapIcon" :size="24" />
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-6">{{ $t('products.what_you_can_do_title') }}</h2>
                        <p class="text-neutral-400 leading-relaxed">{{ $t(`products.${productId}.what_you_can_do`) }}
                        </p>
                    </div>
                </div>

                <!-- Features Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div
                        class="p-10 md:p-14 rounded-[3rem] bg-neutral-900/50 border border-primary-500/10 hover:border-primary-500/30 transition-all group">
                        <h3 class="text-3xl font-bold text-white mb-6 group-hover:text-primary-400 transition-colors">
                            {{ $t(`products.${productId}.features.f1_title`) }}
                        </h3>
                        <p class="text-xl text-neutral-400 leading-relaxed">
                            {{ $t(`products.${productId}.features.f1_desc`) }}
                        </p>
                    </div>
                    <div
                        class="p-10 md:p-14 rounded-[3rem] bg-neutral-900/50 border border-primary-500/10 hover:border-primary-500/30 transition-all group">
                        <h3 class="text-3xl font-bold text-white mb-6 group-hover:text-primary-400 transition-colors">
                            {{ $t(`products.${productId}.features.f2_title`) }}
                        </h3>
                        <p class="text-xl text-neutral-400 leading-relaxed">
                            {{ $t(`products.${productId}.features.f2_desc`) }}
                        </p>
                    </div>
                </div>

                <!-- Detailed Lists: Capabilities & Target Users -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                    <!-- Capabilities -->
                    <div class="space-y-8">
                        <h2 class="text-4xl font-bold text-white mb-12 flex items-center gap-4">
                            <span class="w-1.5 h-10 bg-primary-500 rounded-full"></span>
                            {{ $t('products.core_capabilities') }}
                        </h2>
                        <div class="grid gap-4">
                            <div v-for="(cap, index) in tm(`products.${productId}.capabilities`)" :key="index"
                                class="flex items-center gap-4 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 hover:bg-neutral-900 transition-colors group">
                                <div
                                    class="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" />
                                </div>
                                <span class="text-neutral-300 font-medium">{{ rt(cap) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Target Users -->
                    <div class="space-y-8">
                        <h2 class="text-4xl font-bold text-white mb-12 flex items-center gap-4">
                            <span class="w-1.5 h-10 bg-violet-500 rounded-full"></span>
                            {{ $t('products.target_users_title') }}
                        </h2>
                        <div class="grid gap-4">
                            <div v-for="(user, index) in tm(`products.${productId}.target_users`)" :key="index"
                                class="flex items-center gap-4 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 hover:bg-neutral-900 transition-colors group">
                                <div
                                    class="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <HugeiconsIcon :icon="UserIcon" :size="20" />
                                </div>
                                <span class="text-neutral-300 font-medium">{{ rt(user) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Results -->
                <div class="mb-32">
                    <h2 class="text-4xl font-bold text-white mb-16 text-center">{{ $t('products.results_title') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div v-for="(result, index) in (tm(`products.${productId}.results`).length ? tm(`products.${productId}.results`) : tm(`products.${productId}.expected_outcomes`))"
                            :key="index"
                            class="p-10 rounded-[3rem] bg-gradient-to-br from-neutral-900 to-neutral-800/30 border border-neutral-800 text-center flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                            <div
                                class="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            </div>
                            <h4 class="text-2xl font-bold text-white relative z-10 leading-tight">
                                {{ rt(result) }}
                            </h4>
                        </div>
                    </div>
                </div>

                <!-- Extras: How it works / Deployment Options -->
                <!-- <div v-if="$te(`products.${productId}.how_it_works`) || $te(`products.${productId}.deployment_options`)"
                    class="mb-32">
                    <div v-if="$te(`products.${productId}.how_it_works`)"
                        class="max-w-4xl mx-auto p-10 md:p-16 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/20">
                        <h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <HugeiconsIcon :icon="HelpCircleIcon" :size="28" class="text-indigo-400" />
                            {{ $t('products.how_it_works_title') }}
                        </h2>
                        <p class="text-xl text-neutral-300 leading-relaxed italic">
                            {{ $t(`products.${productId}.how_it_works`) }}
                        </p>
                    </div>

                    <div v-if="$te(`products.${productId}.deployment_options`)"
                        class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div v-for="(val, key) in tm(`products.${productId}.deployment_options`)" :key="key"
                            class="p-10 rounded-[2.5rem] bg-neutral-900/50 border border-neutral-800">
                            <h3 class="text-xl font-bold text-primary-400 uppercase tracking-widest mb-4">{{ key }}
                                {{ $t('products.deployment_suffix') }}</h3>
                            <p class="text-lg text-neutral-300">{{ rt(val) }}</p>
                        </div>
                    </div>
                </div> -->

                <!-- CTA -->
                <ProductCTA />
            </div>
        </div>

        <!-- Background Decor -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div
                class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3">
            </div>
            <div
                class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3">
            </div>
        </div>
    </div>
</template>
