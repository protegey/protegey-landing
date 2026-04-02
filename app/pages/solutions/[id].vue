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
    HelpCircleIcon,
    SmartPhone01Icon,
    Shield01Icon as ShieldIcon,
    UserStar01Icon,
    Share08Icon
} from '@hugeicons/core-free-icons'
import SolutionCTA from '~/components/solutions/SolutionCTA.vue'

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
    panid: FingerPrintIcon,
    'transaction-monitoring': Activity01Icon,
    'account-protection': SmartPhone01Icon,
    'aml-compliance': ShieldIcon,
    'risk-profiling': UserStar01Icon,
    'fraud-intelligence': Share08Icon
}

const allSolutions = [
    { key: 'transaction-monitoring', icon: Activity01Icon, color: 'text-primary-400' },
    { key: 'account-protection', icon: SmartPhone01Icon, color: 'text-secondary-400' },
    { key: 'aml-compliance', icon: ShieldIcon, color: 'text-accent-cyan-400' },
    { key: 'risk-profiling', icon: UserStar01Icon, color: 'text-accent-orange-400' },
    { key: 'fraud-intelligence', icon: Share08Icon, color: 'text-primary-400' },
]

const relatedSolutions = computed(() =>
    allSolutions.filter(s => s.key !== productId).slice(0, 4)
)

const baseUrl = 'https://www.protegey.com'
const currentLocale = locale.value
const localePrefix = currentLocale === 'fr' ? '' : `/${currentLocale}`
const collectionUrl = `${baseUrl}${localePrefix}/solutions`
const canonicalUrl = `${collectionUrl}/${productId}`

const solutionSchema = computed(() => ({
    "@type": "Product",
    "name": t(`solutions.modules.${productId}.title`),
    "description": t(`solutions.modules.${productId}.description`),
    "brand": {
        "@type": "Brand",
        "name": "Protegey"
    }
}))

usePageMeta({
    title: () => t('seo.solution_detail.title', { name: t(`solutions.modules.${productId}.title`) }),
    description: () => t(`solutions.modules.${productId}.description`),
    schemaOrg: [
        solutionSchema.value,
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('nav.solutions'), item: collectionUrl },
                { '@type': 'ListItem', position: 3, name: t(`solutions.modules.${productId}.title`), item: canonicalUrl }
            ]
        }
    ]
})

</script>

<template>
    <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-28 md:pt-40 pb-16 overflow-hidden">
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-7xl mx-auto">
                <!-- Back Link -->
                    <NuxtLink :to="localePath('/solutions')"
                        class="inline-flex items-center gap-2 text-neutral-400 dark:text-neutral-500 hover:text-primary-400 mb-12 transition-colors group rtl:flex-row-reverse">
                        <span
                            class="group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform rtl:rotate-180">←</span>
                        {{ $t('solutions.back_to_all')
                        }}
                    </NuxtLink>
    
                    <!-- Hero Section -->
                    <div
                        class="flex flex-col lg:flex-row gap-12 lg:items-start mb-32 rtl:lg:flex-row-reverse rtl:lg:items-start">
                        <div class="shrink-0 flex flex-col items-center lg:items-start rtl:lg:items-end">
                            <div
                                class="inline-flex p-5 rounded-2xl bg-white/90 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 text-primary-400 shadow-2xl shadow-primary-500/10 mb-8">
                                <HugeiconsIcon :icon="productIcon" :size="64" />
                            </div>
                            <div v-if="$te(`solutions.modules.${productId}.status`)"
                                class="px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold uppercase tracking-widest">
                                {{ $t(`solutions.modules.${productId}.status`) }}
                            </div>
                        </div>
    
                        <div class="flex-1 text-center lg:text-left rtl:lg:text-right">
                            <p class="text-primary-500 font-bold tracking-[0.2em] uppercase text-sm mb-6">{{
                                $t(`solutions.modules.${productId}.tagline`) }}</p>
                            <h1
                                class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tight capitalize leading-none">
                                {{ $t(`solutions.modules.${productId}.title`) }}
                            </h1>
                            <p
                                class="text-lg sm:text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-4xl font-light">
                                {{ $t(`solutions.modules.${productId}.description`) }}
                            </p>
                        </div>
                    </div>
    
                    <!-- Two Pillar Sections -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
                        <!-- Why we built it -->
                        <div class="p-8 rounded-3xl bg-white/70 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 flex flex-col">
                            <div
                                class="w-12 h-12 rounded-2xl bg-secondary-500/10 text-secondary-400 flex items-center justify-center mb-6 rtl:self-end">
                                <HugeiconsIcon :icon="UserGroupIcon" :size="24" />
                            </div>
                            <h2 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-6 rtl:text-right">{{ $t('solutions.why_built_title')
                            }}</h2>
                            <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed rtl:text-right">{{
                                $t(`solutions.modules.${productId}.why_built`) }}</p>
                        </div>
    
                        <!-- What you can do -->
                        <div class="p-8 rounded-3xl bg-white/70 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 flex flex-col">
                            <div
                                class="w-12 h-12 rounded-2xl bg-accent-cyan-500/10 text-accent-cyan-400 flex items-center justify-center mb-6 rtl:self-end">
                                <HugeiconsIcon :icon="ZapIcon" :size="24" />
                            </div>
                            <h2 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-6 rtl:text-right">{{
                                $t('solutions.what_you_can_do_title') }}</h2>
                            <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed rtl:text-right">{{
                                $t(`solutions.modules.${productId}.what_you_can_do`) }}
                            </p>
                        </div>
                    </div>
    
                    <!-- Features Grid -->
                    <!-- Handle new array-based features -->
                    <div v-if="tm(`solutions.modules.${productId}.features`) && Array.isArray(tm(`solutions.modules.${productId}.features`))" 
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                        <div v-for="(feature, fi) in tm(`solutions.modules.${productId}.features`)" :key="fi"
                            class="p-6 md:p-8 rounded-2xl bg-white/80 dark:bg-neutral-900/50 border border-primary-500/10 hover:border-primary-500/30 transition-all group">
                            <p class="text-base md:text-lg text-neutral-900 dark:text-white leading-relaxed rtl:text-right font-bold">
                                {{ rt(feature) }}
                            </p>
                        </div>
                    </div>
                    <!-- Handle legacy object-based features -->
                    <div v-else-if="$te(`solutions.modules.${productId}.features`)" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                        <div
                            class="p-8 md:p-12 rounded-[2.5rem] bg-white/80 dark:bg-neutral-900/50 border border-primary-500/10 hover:border-primary-500/30 transition-all group">
                            <h3
                                class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-4 group-hover:text-primary-400 transition-colors rtl:text-right">
                                {{ $t(`solutions.modules.${productId}.features.f1_title`) }}
                            </h3>
                            <p class="text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed rtl:text-right">
                                {{ $t(`solutions.modules.${productId}.features.f1_desc`) }}
                            </p>
                        </div>
                        <div
                            class="p-8 md:p-12 rounded-[2.5rem] bg-white/80 dark:bg-neutral-900/50 border border-primary-500/10 hover:border-primary-500/30 transition-all group">
                            <h3
                                class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-4 group-hover:text-primary-400 transition-colors rtl:text-right">
                                {{ $t(`solutions.modules.${productId}.features.f2_title`) }}
                            </h3>
                            <p class="text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed rtl:text-right">
                                {{ $t(`solutions.modules.${productId}.features.f2_desc`) }}
                            </p>
                        </div>
                    </div>
    
                    <!-- Detailed Lists: Capabilities & Target Users -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                        <!-- Capabilities -->
                        <div class="space-y-6">
                            <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-10 flex items-center gap-4 rtl:flex-row-reverse">
                                <span class="w-1.5 h-8 bg-primary-500 rounded-full"></span>
                                {{ $t('solutions.core_capabilities') }}
                            </h2>
                            <div class="grid gap-3">
                                <div v-for="(cap, index) in tm(`solutions.modules.${productId}.capabilities`)" :key="index"
                                    class="flex items-center gap-4 p-4 rounded-xl bg-white/80 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/50 hover:bg-white dark:hover:bg-neutral-900 transition-colors group rtl:flex-row-reverse">
                                    <div
                                        class="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" />
                                    </div>
                                    <span class="text-neutral-600 dark:text-neutral-300 font-medium rtl:text-right">{{ rt(cap) }}</span>
                                </div>
                            </div>
                        </div>
    
                        <!-- Target Users -->
                        <div class="space-y-6">
                            <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-10 flex items-center gap-4 rtl:flex-row-reverse">
                                <span class="w-1.5 h-8 bg-secondary-500 rounded-full"></span>
                                {{ $t('solutions.target_users_title') }}
                            </h2>
                            <div class="grid gap-3">
                                <div v-for="(user, index) in tm(`solutions.modules.${productId}.target_users`)" :key="index"
                                    class="flex items-center gap-4 p-4 rounded-xl bg-white/80 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/50 hover:bg-white dark:hover:bg-neutral-900 transition-colors group rtl:flex-row-reverse">
                                    <div
                                        class="w-10 h-10 rounded-xl bg-secondary-500/10 text-secondary-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <HugeiconsIcon :icon="UserIcon" :size="20" />
                                    </div>
                                    <span class="text-neutral-600 dark:text-neutral-300 font-medium rtl:text-right">{{ rt(user) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <!-- Results -->
                    <div class="mb-32">
                        <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-10 text-center rtl:text-center">{{
                            $t('solutions.results_title') }}</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div v-for="(result, index) in (tm(`solutions.modules.${productId}.results`).length ? tm(`solutions.modules.${productId}.results`) : tm(`solutions.modules.${productId}.expected_outcomes`))"
                                :key="index"
                                class="p-8 rounded-3xl bg-gradient-to-br from-white to-neutral-100/30 dark:from-neutral-900 dark:to-neutral-800/30 border border-neutral-200 dark:border-neutral-800 text-center flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                                <div
                                    class="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                </div>
                                <h4 class="text-xl font-bold text-neutral-900 dark:text-white relative z-10 leading-tight rtl:text-center">
                                    {{ rt(result) }}
                                </h4>
                            </div>
                        </div>
                    </div>
    
                    <!-- Extras: How it works / Deployment Options -->
                    <div v-if="$te(`solutions.modules.${productId}.how_it_works`) || $te(`solutions.modules.${productId}.deployment_options`)"
                        class="mb-32">
                        <div v-if="$te(`solutions.modules.${productId}.how_it_works`)"
                            class="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-200/50 dark:border-indigo-500/20">
                            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-3 rtl:flex-row-reverse">
                                <HugeiconsIcon :icon="HelpCircleIcon" :size="24" class="text-indigo-400" />
                                {{ $t('solutions.how_it_works_title') }}
                            </h2>
                            <p class="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed italic whitespace-pre-line rtl:text-right">
                                {{ $t(`solutions.modules.${productId}.how_it_works`) }}
                            </p>
                        </div>
    
                        <div v-if="$te(`solutions.modules.${productId}.deployment_options`)"
                            class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div v-for="(val, key) in tm(`solutions.modules.${productId}.deployment_options`)" :key="key"
                                class="p-8 rounded-3xl bg-white/90 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                                <h3
                                    class="text-lg font-bold text-primary-400 uppercase tracking-widest mb-4 rtl:text-right">
                                    {{ key }}
                                    {{ $t('solutions.deployment_suffix') }}</h3>
                                <p class="text-base text-neutral-600 dark:text-neutral-300 rtl:text-right">{{ rt(val) }}</p>
                            </div>
                        </div>
                    </div>

                <!-- Related Solutions -->
                <div class="mb-32">
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-10 text-center">{{
                        $t('solutions.related_solutions') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <NuxtLink v-for="mod in relatedSolutions" :key="mod.key"
                            :to="localePath(`/solutions/${mod.key}`)"
                            class="p-6 rounded-2xl bg-white/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/30 transition-all group">
                            <div class="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 group-hover:bg-primary-500/10 transition-colors">
                                <HugeiconsIcon :icon="mod.icon" :size="20" :class="mod.color" />
                            </div>
                            <h3 class="text-sm font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-primary-400 transition-colors">{{
                                $t(`solutions.modules.${mod.key}.title`) }}</h3>
                            <p class="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">{{
                                $t(`solutions.modules.${mod.key}.subtext`) }}</p>
                        </NuxtLink>
                    </div>
                </div>

                <!-- CTA -->
                <SolutionCTA />
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
