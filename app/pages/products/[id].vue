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
const { t, tm, rt, locale } = useI18n()

const iconMap = {
    signal: Activity01Icon,
    radar: ViewIcon,
    api: Settings01Icon,
    console: DashboardSquare01Icon,
    compliance: Shield01Icon,
    panid: FingerPrintIcon
}

const productIcon = iconMap[productId] || Activity01Icon

const baseUrl = 'https://www.protegey.com'
const currentLocale = locale.value
const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`

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
        "url": `${baseUrl}${localePrefix}/products/${productId}`,
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

if (import.meta.server) {
    defineOgImageComponent('NuxtSeo', {
        title: t('seo.product_detail.title', { name: t(`products.${productId}.title`) }),
        description: t(`products.${productId}.description`),
        theme: '#0B1741',
        colorMode: 'dark',
    })

    useSchemaOrg([
        productSchema.value,
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: t('nav.home'),
                    item: baseUrl
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: t('nav.products'),
                    item: `${baseUrl}${localePrefix}/products`
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: t(`products.${productId}.title`),
                    item: `${baseUrl}${localePrefix}/products/${productId}`
                }
            ]
        }
    ])
}

useHead({
    meta: [
        { name: 'geo.region', content: 'SN;CI;CM;MA;DZ;TN;EG;GH;NG;KE;ZA;ET;RW;TZ;UG;DZ;LY;SD;SS;MA;GW;SN;BF;ML;NE;TD;CF;GA;CG;CD;AO;ZM;ZW;MW;MZ;BI;DJ;ER;KM;MU;NA;SC;SO;SD' },
        { name: 'geo.placename', content: 'Dakar;Abidjan;Douala;Casablanca;Algiers;Tunis;Cairo;Accra;Lagos;Nairobi;Johannesburg;Addis Ababa;Kigali;Dodoma;Kampala;Tripoli;Khartoum;Rabat;Bissau;Ouagadougou;Bamako;Niamey;N;Djamena;Libreville;Brazzaville;Kinshasa;Luanda;Lusaka;Harare;Lilongwe;Maputo;Bujumbura;Djibouti;Asmara;Moroni;Port Louis;Windhoek;Victoria;Mogadishu' },
        { name: 'ICBM', content: '14.6925, -17.4467' },
        { name: 'geo.position', content: '14.6925,-17.4467;-1.9403,29.8739;6.4969,3.3792;4.0518,9.7679;-1.2921,36.8219;-26.2041,28.0473' },
        { name: 'keywords', content: t('seo.global.keywords') }
    ]
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-950 pt-32 md:pt-40 pb-20 overflow-hidden">
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-7xl mx-auto">
                <!-- Back Link -->
                <NuxtLink :to="localePath('products')"
                    class="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-400 mb-16 transition-colors group rtl:flex-row-reverse">
                    <span
                        class="group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform rtl:rotate-180">←</span>
                    {{ $t('products.back_to_all')
                    }}
                </NuxtLink>

                <!-- Hero Section -->
                <div
                    class="flex flex-col lg:flex-row gap-12 lg:items-start mb-32 rtl:lg:flex-row-reverse rtl:lg:items-start">
                    <div class="shrink-0 flex flex-col items-center lg:items-start rtl:lg:items-end">
                        <div
                            class="inline-flex p-6 rounded-[2rem] bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 text-primary-400 shadow-2xl shadow-primary-500/10 mb-6">
                            <HugeiconsIcon :icon="productIcon" :size="80" />
                        </div>
                        <div v-if="$te(`products.${productId}.status`)"
                            class="px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold uppercase tracking-widest">
                            {{ $t(`products.${productId}.status`) }}
                        </div>
                    </div>

                    <div class="flex-1 text-center lg:text-left rtl:lg:text-right">
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
                            class="w-12 h-12 rounded-2xl bg-secondary-500/10 text-secondary-400 flex items-center justify-center mb-6 rtl:self-end">
                            <HugeiconsIcon :icon="UserGroupIcon" :size="24" />
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-6 rtl:text-right">{{ $t('products.why_built_title')
                        }}</h2>
                        <p class="text-neutral-400 leading-relaxed rtl:text-right">{{
                            $t(`products.${productId}.why_built`) }}</p>
                    </div>

                    <!-- What you can do -->
                    <div class="p-10 rounded-[2.5rem] bg-neutral-900/30 border border-neutral-800 flex flex-col">
                        <div
                            class="w-12 h-12 rounded-2xl bg-accent-cyan-500/10 text-accent-cyan-400 flex items-center justify-center mb-6 rtl:self-end">
                            <HugeiconsIcon :icon="ZapIcon" :size="24" />
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-6 rtl:text-right">{{
                            $t('products.what_you_can_do_title') }}</h2>
                        <p class="text-neutral-400 leading-relaxed rtl:text-right">{{
                            $t(`products.${productId}.what_you_can_do`) }}
                        </p>
                    </div>
                </div>

                <!-- Features Grid -->
                <div v-if="$te(`products.${productId}.features`)" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div
                        class="p-10 md:p-14 rounded-[3rem] bg-neutral-900/50 border border-primary-500/10 hover:border-primary-500/30 transition-all group">
                        <h3
                            class="text-3xl font-bold text-white mb-6 group-hover:text-primary-400 transition-colors rtl:text-right">
                            {{ $t(`products.${productId}.features.f1_title`) }}
                        </h3>
                        <p class="text-xl text-neutral-400 leading-relaxed rtl:text-right">
                            {{ $t(`products.${productId}.features.f1_desc`) }}
                        </p>
                    </div>
                    <div
                        class="p-10 md:p-14 rounded-[3rem] bg-neutral-900/50 border border-primary-500/10 hover:border-primary-500/30 transition-all group">
                        <h3
                            class="text-3xl font-bold text-white mb-6 group-hover:text-primary-400 transition-colors rtl:text-right">
                            {{ $t(`products.${productId}.features.f2_title`) }}
                        </h3>
                        <p class="text-xl text-neutral-400 leading-relaxed rtl:text-right">
                            {{ $t(`products.${productId}.features.f2_desc`) }}
                        </p>
                    </div>
                </div>

                <!-- Detailed Lists: Capabilities & Target Users -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                    <!-- Capabilities -->
                    <div class="space-y-8">
                        <h2 class="text-4xl font-bold text-white mb-12 flex items-center gap-4 rtl:flex-row-reverse">
                            <span class="w-1.5 h-10 bg-primary-500 rounded-full"></span>
                            {{ $t('products.core_capabilities') }}
                        </h2>
                        <div class="grid gap-4">
                            <div v-for="(cap, index) in tm(`products.${productId}.capabilities`)" :key="index"
                                class="flex items-center gap-4 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 hover:bg-neutral-900 transition-colors group rtl:flex-row-reverse">
                                <div
                                    class="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" />
                                </div>
                                <span class="text-neutral-300 font-medium rtl:text-right">{{ rt(cap) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Target Users -->
                    <div class="space-y-8">
                        <h2 class="text-4xl font-bold text-white mb-12 flex items-center gap-4 rtl:flex-row-reverse">
                            <span class="w-1.5 h-10 bg-secondary-500 rounded-full"></span>
                            {{ $t('products.target_users_title') }}
                        </h2>
                        <div class="grid gap-4">
                            <div v-for="(user, index) in tm(`products.${productId}.target_users`)" :key="index"
                                class="flex items-center gap-4 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 hover:bg-neutral-900 transition-colors group rtl:flex-row-reverse">
                                <div
                                    class="w-10 h-10 rounded-xl bg-secondary-500/10 text-secondary-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <HugeiconsIcon :icon="UserIcon" :size="20" />
                                </div>
                                <span class="text-neutral-300 font-medium rtl:text-right">{{ rt(user) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Results -->
                <div class="mb-32">
                    <h2 class="text-4xl font-bold text-white mb-16 text-center rtl:text-center">{{
                        $t('products.results_title') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div v-for="(result, index) in (tm(`products.${productId}.results`).length ? tm(`products.${productId}.results`) : tm(`products.${productId}.expected_outcomes`))"
                            :key="index"
                            class="p-10 rounded-[3rem] bg-gradient-to-br from-neutral-900 to-neutral-800/30 border border-neutral-800 text-center flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                            <div
                                class="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            </div>
                            <h4 class="text-2xl font-bold text-white relative z-10 leading-tight rtl:text-center">
                                {{ rt(result) }}
                            </h4>
                        </div>
                    </div>
                </div>

                <!-- Extras: How it works / Deployment Options -->
                <div v-if="$te(`products.${productId}.how_it_works`) || $te(`products.${productId}.deployment_options`)"
                    class="mb-32">
                    <div v-if="$te(`products.${productId}.how_it_works`)"
                        class="max-w-4xl mx-auto p-10 md:p-16 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/20">
                        <h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-3 rtl:flex-row-reverse">
                            <HugeiconsIcon :icon="HelpCircleIcon" :size="28" class="text-indigo-400" />
                            {{ $t('products.how_it_works_title') }}
                        </h2>
                        <p class="text-xl text-neutral-300 leading-relaxed italic whitespace-pre-line rtl:text-right">
                            {{ $t(`products.${productId}.how_it_works`) }}
                        </p>
                    </div>

                    <div v-if="$te(`products.${productId}.deployment_options`)"
                        class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div v-for="(val, key) in tm(`products.${productId}.deployment_options`)" :key="key"
                            class="p-10 rounded-[2.5rem] bg-neutral-900/50 border border-neutral-800">
                            <h3
                                class="text-xl font-bold text-primary-400 uppercase tracking-widest mb-4 rtl:text-right">
                                {{ key }}
                                {{ $t('products.deployment_suffix') }}</h3>
                            <p class="text-lg text-neutral-300 rtl:text-right">{{ rt(val) }}</p>
                        </div>
                    </div>
                </div>

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
                class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3">
            </div>
        </div>
    </div>
</template>
