<script setup>
import { useI18n } from '#imports'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    BankIcon,
    Wallet02Icon,
    BitcoinCircleIcon,
    Building03Icon,
    Building01Icon,
    ArrowRight01Icon,
    MoneySend01Icon,
    SmartPhone01Icon,
    GlobalIcon
} from '@hugeicons/core-free-icons'

const { t } = useI18n()
const baseUrl = 'https://www.protegey.com'
const localePath = useLocalePath()

const industryIcons = {
    banks: BankIcon,
    lending: MoneySend01Icon,
    microfinance: Building01Icon,
    fintechs: Wallet02Icon,
    mobile_money: SmartPhone01Icon,
    remittance: GlobalIcon,
    crypto: BitcoinCircleIcon,
    regulators: Building03Icon,
}

const SECTOR_KEYS = [
    'banks',
    'lending',
    'microfinance',
    'fintechs',
    'mobile_money',
    'remittance',
    'crypto',
    'regulators',
]

const industriesList = computed(() => {
    return SECTOR_KEYS.map(key => ({
        key,
        icon: industryIcons[key] || BankIcon,
        title: t('industries.sectors.' + key + '.title'),
        desc: t('industries.sectors.' + key + '.desc')
    }))
})

usePageMeta({
    title: () => t('industries.title'),
    description: () => t('industries.subtitle'),
    schemaOrg: [
        {
            '@type': 'CollectionPage',
            name: t('industries.title'),
            description: t('industries.subtitle'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('nav.industries'), item: `${baseUrl}/use-cases` }
            ]
        }
    ]
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-36 pb-24 md:pt-44 overflow-hidden">
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3"></div>
            <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-4xl mx-auto text-center mb-24">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold tracking-widest uppercase mb-8">
                    {{ $t('nav.industries') }}
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white mb-8 tracking-tight leading-tight">
                    {{ $t('industries.title') }}
                </h1>
                <p class="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                    {{ $t('industries.subtitle') }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                <div v-for="industry in industriesList" :key="industry.key"
                    class="group p-8 rounded-3xl bg-white/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5 flex flex-col h-full">
                    <div class="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-neutral-950 transition-colors duration-300">
                        <ClientOnly>
                            <HugeiconsIcon :icon="industry.icon" :size="28" />
                        </ClientOnly>
                    </div>

                    <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
                        {{ industry.title }}
                    </h2>

                    <p class="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-8 flex-1">
                        {{ industry.desc }}
                    </p>

                    <NuxtLink :to="localePath(`/use-cases/${industry.key}`)" class="mt-auto flex items-center text-sm font-bold text-neutral-400 dark:text-neutral-500 group-hover:text-primary-500 transition-colors gap-2">
                        Learn how
                        <ClientOnly>
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="group-hover:translate-x-1 transition-transform" />
                        </ClientOnly>
                    </NuxtLink>
                </div>
            </div>

            <div class="max-w-4xl mx-auto mt-32 text-center p-12 rounded-[3rem] bg-neutral-900 border border-neutral-800 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent pointer-events-none"></div>
                <div class="relative z-10">
                    <h2 class="text-3xl font-bold text-white mb-4">{{ $t('geo_pages.use_cases.index.cta_title') }}</h2>
                    <p class="text-neutral-400 mb-8 max-w-lg mx-auto">{{ $t('geo_pages.use_cases.index.cta_subtitle') }}</p>
                    <NuxtLink :to="localePath('/contact')"
                        class="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
                        {{ $t('geo_pages.use_cases.index.cta_expert') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
