<script setup>
import { useRoute, useI18n, useLocalePath } from '#imports'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    BankIcon,
    Wallet02Icon,
    Building01Icon,
    SmartPhone01Icon,
    MoneySend01Icon,
    GlobalIcon,
    ShoppingBag01Icon,
    GameController01Icon,
    BitcoinCircleIcon,
    Building03Icon,
    Location01Icon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    CheckmarkCircle01Icon,
    Shield01Icon,
    AiCloud01Icon,
    ChartEvaluationIcon
} from '@hugeicons/core-free-icons'
import { gsap } from 'gsap'

const route = useRoute()
const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()
const slug = computed(() => String(route.params.slug))
const baseUrl = 'https://www.protegey.com'
const localePrefix = locale.value === 'fr' ? '' : `/${locale.value}`

const industryIcons = {
    banks: BankIcon,
    lending: MoneySend01Icon,
    microfinance: Building01Icon,
    fintechs: Wallet02Icon,
    mobile_money: SmartPhone01Icon,
    remittance: GlobalIcon,
    ecommerce: ShoppingBag01Icon,
    gaming: GameController01Icon,
    crypto: BitcoinCircleIcon,
    regulators: Building03Icon,
    mobility: Location01Icon
}

const VALID_SLUGS = [
    'banks',
    'lending',
    'microfinance',
    'fintechs',
    'mobile_money',
    'remittance',
    'ecommerce',
    'gaming',
    'crypto',
    'regulators',
    'mobility'
]

const industryData = computed(() => {
    const currentSlug = slug.value
    if (!VALID_SLUGS.includes(currentSlug)) return null
    const sectorPath = 'industries.sectors.' + currentSlug
    const sector = tm(sectorPath)
    const risks = Array.isArray(sector?.risks) ? sector.risks.map(item => rt(item)) : []
    const howProtegeyHelps = Array.isArray(sector?.how_protegey_helps)
        ? sector.how_protegey_helps.map(item => rt(item))
        : []

    return {
        key: currentSlug,
        icon: industryIcons[currentSlug] || BankIcon,
        title: t(sectorPath + '.title'),
        desc: t(sectorPath + '.desc'),
        challenge: t(sectorPath + '.challenge'),
        solution: t(sectorPath + '.solution'),
        challengeBadge: t('industries.challenge_badge'),
        solutionBadge: t('industries.solution_badge'),
        challengeTitle: t('industries.challenge_heading', { industry: t(sectorPath + '.title') }),
        solutionTitle: t('industries.solution_heading', { industry: t(sectorPath + '.title') }),
        risks,
        howProtegeyHelps
    }
})

const relatedIndustries = computed(() => {
    if (!industryData.value) return []
    const allKeys = VALID_SLUGS.filter(k => k !== industryData.value.key)
    const shuffled = allKeys.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 4).map(key => ({
        key,
        icon: industryIcons[key] || BankIcon,
        title: t('industries.sectors.' + key + '.title')
    }))
})

usePageMeta({
    title: () => industryData.value?.title || 'Use Case',
    description: () => industryData.value?.desc || '',
    schemaOrg: industryData.value ? [
        {
            '@type': 'WebPage',
            name: industryData.value.title,
            description: industryData.value.desc,
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('nav.industries'), item: `${baseUrl}${localePrefix}/use-cases` },
                { '@type': 'ListItem', position: 3, name: industryData.value.title, item: `${baseUrl}${localePrefix}/use-cases/${industryData.value.key}` }
            ]
        }
    ] : []
})

onMounted(() => {
    if (!industryData.value) return

    gsap.from('.industry-hero', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    gsap.from('.industry-content-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
    })
})
</script>

<template>
    <div v-if="industryData" class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-36 pb-24 md:pt-44 overflow-hidden">
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3"></div>
            <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div class="container mx-auto px-6 relative z-10">
            <NuxtLink :to="localePath('/use-cases')" class="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-primary-500 transition-colors mb-10 group">
                <ClientOnly><HugeiconsIcon :icon="ArrowLeft01Icon" :size="18" class="group-hover:-translate-x-1 transition-transform" /></ClientOnly>
                {{ $t('nav.industries') }}
            </NuxtLink>

            <div class="max-w-4xl mb-24 industry-hero">
                <div class="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-primary-500 flex items-center justify-center mb-10 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <ClientOnly><HugeiconsIcon :icon="industryData.icon" :size="32" /></ClientOnly>
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-8 tracking-tight leading-tight">
                    {{ industryData.title }}
                </h1>
                <p class="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
                    {{ industryData.desc }}
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <div class="industry-content-card p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-8 text-neutral-100 dark:text-neutral-800/10 -mr-4 -mt-4 opacity-50">
                        <ClientOnly><HugeiconsIcon :icon="Shield01Icon" :size="120" /></ClientOnly>
                    </div>
                    <div class="relative z-10">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold tracking-widest uppercase mb-6">
                            {{ industryData.challengeBadge }}
                        </div>
                        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">{{ industryData.challengeTitle }}</h2>
                        <div class="text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-4">
                            <p class="text-base">{{ industryData.challenge }}</p>
                            <ul v-if="industryData.risks.length" class="space-y-3 pt-2">
                                <li v-for="risk in industryData.risks" :key="risk" class="flex gap-3 text-sm md:text-base">
                                    <span class="mt-2 h-2 w-2 rounded-full bg-red-500/70 shrink-0"></span>
                                    <span>{{ risk }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="industry-content-card p-10 rounded-[2.5rem] bg-neutral-900 text-white border border-neutral-800 shadow-xl relative overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-50"></div>
                    <div class="absolute top-0 right-0 p-8 text-primary-500/10 -mr-4 -mt-4">
                        <ClientOnly><HugeiconsIcon :icon="AiCloud01Icon" :size="120" /></ClientOnly>
                    </div>
                    <div class="relative z-10">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-[10px] font-bold tracking-widest uppercase mb-6">
                            {{ industryData.solutionBadge }}
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-6 tracking-tight">{{ industryData.solutionTitle }}</h2>
                        <div class="text-neutral-400 leading-relaxed space-y-4">
                            <p class="text-base text-neutral-300 font-medium">{{ industryData.solution }}</p>
                            <ul v-if="industryData.howProtegeyHelps.length" class="space-y-3 pt-2">
                                <li v-for="item in industryData.howProtegeyHelps" :key="item" class="flex gap-3 text-sm md:text-base text-neutral-300">
                                    <span class="mt-2 h-2 w-2 rounded-full bg-primary-400 shrink-0"></span>
                                    <span>{{ item }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-24 industry-content-card p-12 rounded-[3rem] border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/20 backdrop-blur-sm">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div class="flex flex-col gap-4">
                        <div class="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center text-primary-500 shadow-sm">
                            <ClientOnly><HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" /></ClientOnly>
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white">{{ $t('geo_pages.use_cases.slug.seamless_title') }}</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{{ $t('geo_pages.use_cases.slug.seamless_desc') }}</p>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center text-primary-500 shadow-sm">
                            <ClientOnly><HugeiconsIcon :icon="AiCloud01Icon" :size="20" /></ClientOnly>
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white">{{ $t('geo_pages.use_cases.slug.explainable_title') }}</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{{ $t('geo_pages.use_cases.slug.explainable_desc') }}</p>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center text-primary-500 shadow-sm">
                            <ClientOnly><HugeiconsIcon :icon="ChartEvaluationIcon" :size="20" /></ClientOnly>
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white">{{ $t('geo_pages.use_cases.slug.network_title') }}</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{{ $t('geo_pages.use_cases.slug.network_desc') }}</p>
                    </div>
                </div>
            </div>

            <div class="max-w-4xl mx-auto mt-32">
                <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">{{ $t('industries.related_industries') }}</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <NuxtLink v-for="ind in relatedIndustries" :key="ind.key"
                        :to="localePath(`/use-cases/${ind.key}`)"
                        class="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/40 hover:border-primary-500/30 transition-all group">
                        <HugeiconsIcon :icon="ind.icon" :size="20" class="text-neutral-400 group-hover:text-primary-500 shrink-0 transition-colors" />
                        <span class="text-sm font-bold text-neutral-700 dark:text-neutral-300 group-hover:text-primary-400 transition-colors">{{ ind.title }}</span>
                    </NuxtLink>
                </div>
            </div>

            <div class="max-w-4xl mx-auto mt-32 text-center">
                <h2 class="text-3xl font-bold text-neutral-900 dark:text-white mb-6">{{ $t('geo_pages.use_cases.slug.cta_title', { industry: industryData.title }) }}</h2>
                <p class="text-neutral-500 dark:text-neutral-400 mb-10 max-w-lg mx-auto">
                    {{ $t('geo_pages.use_cases.slug.cta_subtitle') }}
                </p>
                <div class="flex flex-wrap items-center justify-center gap-4">
                    <NuxtLink :to="localePath('/#waitlist')"
                        class="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-neutral-950 bg-primary-500 hover:bg-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/20">
                        {{ $t('geo_pages.use_cases.slug.cta_demo') }}
                    </NuxtLink>
                    <NuxtLink :to="localePath('/contact')"
                        class="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
                        {{ $t('geo_pages.use_cases.slug.cta_expert') }}
                    </NuxtLink> 
                </div>
            </div>
        </div>
    </div>

    <div v-else class="min-h-screen flex items-center justify-center px-6">
        <div class="text-center">
            <h1 class="text-6xl font-black text-neutral-900 dark:text-white mb-4">404</h1>
            <p class="text-neutral-500 mb-8">Use case not found.</p>
            <NuxtLink :to="localePath('/use-cases')" class="text-primary-500 font-bold hover:underline">Return to Use Cases</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.industry-content-card {
    transition: transform 0.3s ease, border-color 0.3s ease;
}
.industry-content-card:hover {
    transform: translateY(-4px);
    border-color: rgba(var(--color-primary-500), 0.2);
}
</style>
