<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    Activity01Icon,
    SmartPhone01Icon,
    Shield01Icon,
    UserStar01Icon,
    Share08Icon,
    CheckmarkCircle01Icon,
    ArrowRight01Icon,
    FingerPrintIcon,
} from '@hugeicons/core-free-icons'
import SolutionCTA from '~/components/solutions/SolutionCTA.vue'
import PANIDTeaser from '~/components/sections/PANIDTeaser.vue'

gsap.registerPlugin(ScrollTrigger)

const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()
const baseUrl = 'https://www.protegey.com'
const localePrefix = locale.value === 'fr' ? '' : `/${locale.value}`
const canonicalUrl = `${baseUrl}${localePrefix}/solutions`

const activeModule = ref(0)
const sectionRef = ref(null)

const modules = [
    { key: 'transaction-monitoring', icon: Activity01Icon, colorClass: 'text-primary-400', bgClass: 'bg-primary-500/10', borderClass: 'border-primary-500/20', gradientClass: 'from-primary-500/10' },
    { key: 'account-protection', icon: SmartPhone01Icon, colorClass: 'text-secondary-400', bgClass: 'bg-secondary-500/10', borderClass: 'border-secondary-500/20', gradientClass: 'from-secondary-500/10' },
    { key: 'aml-compliance', icon: Shield01Icon, colorClass: 'text-accent-cyan-400', bgClass: 'bg-accent-cyan-500/10', borderClass: 'border-accent-cyan-500/20', gradientClass: 'from-accent-cyan-500/10' },
    { key: 'risk-profiling', icon: UserStar01Icon, colorClass: 'text-accent-orange-400', bgClass: 'bg-accent-orange-500/10', borderClass: 'border-accent-orange-500/20', gradientClass: 'from-accent-orange-500/10' },
    { key: 'fraud-intelligence', icon: Share08Icon, colorClass: 'text-primary-400', bgClass: 'bg-primary-500/10', borderClass: 'border-primary-500/20', gradientClass: 'from-primary-500/10' },
]

const activeData = () => modules[activeModule.value]
const moduleKey = () => modules[activeModule.value].key

usePageMeta({
    title: t('seo.solutions.title'),
    description: t('seo.solutions.description'),
    schemaOrg: [
        { '@type': 'CollectionPage', name: t('seo.solutions.title') },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('nav.solutions'), item: canonicalUrl }
            ]
        }
    ]
})

if (import.meta.server) {
    defineOgImageComponent('NuxtSeo', {
        title: t('seo.solutions.title'),
        description: t('seo.solutions.description'),
        theme: '#0B1741',
        colorMode: 'dark',
    })
}
</script>

<template>
    <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden">

        <!-- Hero -->
        <section class="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-gradient-to-b from-primary-500/8 via-transparent to-transparent pointer-events-none"></div>
            <div class="container mx-auto px-6 relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold tracking-widest uppercase mb-8">
                        <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        {{ $t('solutions.badge') }}
                    </div>
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
                        {{ $t('solutions.hero.title_start') }}
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                            {{ $t('solutions.hero.title_highlight') }}
                        </span>
                    </h1>
                    <p class="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                        {{ $t('solutions.subtitle') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Interactive Module Explorer -->
        <section ref="sectionRef" class="relative py-8 pb-24">
            <div class="container mx-auto px-6">
                <div class="max-w-7xl mx-auto grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">

                    <!-- Left: Tabs -->
                    <div class="lg:col-span-2 flex flex-col gap-3">
                        <button v-for="(mod, idx) in modules" :key="mod.key"
                            :id="`solutions-tab-${idx}`"
                            @click="activeModule = idx"
                            class="module-tab group relative text-left px-5 py-4 rounded-2xl border transition-all duration-300 overflow-hidden"
                            :class="[
                                activeModule === idx
                                    ? `${mod.borderClass} bg-white dark:bg-neutral-900 shadow-lg`
                                    : 'border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700'
                            ]">
                            <div v-if="activeModule === idx"
                                class="absolute inset-0 bg-gradient-to-r to-transparent opacity-25 pointer-events-none"
                                :class="mod.gradientClass"></div>
                            <div class="relative z-10 flex items-center gap-4">
                                <div class="flex-shrink-0 p-2.5 rounded-xl transition-all duration-300"
                                    :class="activeModule === idx ? mod.bgClass : 'bg-neutral-100 dark:bg-neutral-800'">
                                    <HugeiconsIcon :icon="mod.icon" :size="20"
                                        :class="activeModule === idx ? mod.colorClass : 'text-neutral-400'" />
                                </div>
                                <div class="min-w-0">
                                    <div class="font-bold text-neutral-900 dark:text-white text-sm leading-snug">
                                        {{ $t(`solutions.modules.${mod.key}.title`) }}
                                    </div>
                                    <div class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                                        {{ $t(`solutions.modules.${mod.key}.subtext`) }}
                                    </div>
                                </div>
                                <HugeiconsIcon :icon="ArrowRight01Icon" :size="16"
                                    class="ml-auto flex-shrink-0 transition-colors"
                                    :class="activeModule === idx ? mod.colorClass : 'text-neutral-300 dark:text-neutral-600'" />
                            </div>
                        </button>
                    </div>

                    <!-- Right: Detail -->
                    <div class="lg:col-span-3">
                        <transition name="fade-slide" mode="out-in">
                            <div :key="activeModule"
                                class="bg-white dark:bg-neutral-900 border rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden relative"
                                :class="activeData().borderClass">
                                <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
                                    :class="activeData().bgClass"></div>
                                <div class="relative z-10">
                                    <!-- Header -->
                                    <div class="flex items-start gap-4 mb-8">
                                        <div class="flex-shrink-0 p-4 rounded-2xl shadow-lg" :class="activeData().bgClass">
                                            <HugeiconsIcon :icon="activeData().icon" :size="32" :class="activeData().colorClass" />
                                        </div>
                                        <div>
                                            <div class="text-xs font-bold tracking-widest uppercase mb-1" :class="activeData().colorClass">
                                                Module {{ activeModule + 1 }} of 5
                                            </div>
                                            <h2 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                                                {{ $t(`solutions.modules.${moduleKey()}.title`) }}
                                            </h2>
                                        </div>
                                    </div>
                                    <!-- Subtext -->
                                    <p class="text-neutral-500 dark:text-neutral-400 text-base md:text-lg leading-relaxed mb-8 border-l-2 pl-4"
                                        :class="activeData().borderClass">
                                        {{ $t(`solutions.modules.${moduleKey()}.subtext`) }}
                                    </p>
                                    <!-- Features -->
                                    <ul class="space-y-3">
                                        <li v-for="(feature, fi) in tm(`solutions.modules.${moduleKey()}.features`)"
                                            :key="fi"
                                            class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                                            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18"
                                                class="flex-shrink-0 mt-0.5" :class="activeData().colorClass" />
                                            <span class="text-sm leading-snug">{{ rt(feature) }}</span>
                                        </li>
                                    </ul>
                                    <!-- Dots & Link -->
                                    <div class="flex items-center justify-between gap-2 mt-10">
                                        <div class="flex items-center gap-2">
                                            <button v-for="(_, i) in modules" :key="i"
                                                @click="activeModule = i"
                                                class="h-1.5 rounded-full transition-all duration-300"
                                                :class="activeModule === i ? `w-6 ${activeData().bgClass.replace('/10', '/80')}` : 'w-1.5 bg-neutral-200 dark:bg-neutral-700'"
                                                :aria-label="`Module ${i + 1}`">
                                            </button>
                                        </div>
                                        <NuxtLink :to="localePath(`/solutions/${moduleKey()}`)" 
                                            class="flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                                            :class="activeData().colorClass">
                                            Learn more about {{ $t(`solutions.modules.${moduleKey()}.title`) }} &rarr;
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>

                <!-- Geographic Coverage -->
                <div class="max-w-7xl mx-auto mt-12 p-6 md:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div class="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                                {{ $t('solutions.geographic_coverage.heading_part1') }}
                                <span class="text-primary-400">{{ $t('solutions.geographic_coverage.heading_highlight') }}</span>
                            </h3>
                            <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {{ $t('solutions.geographic_coverage.description') }}
                            </p>
                        </div>
                        <div class="space-y-3">
                            <div v-for="(region, i) in tm('solutions.geographic_coverage.regions')" :key="i"
                                class="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                                <div class="w-2 h-8 bg-primary-500 rounded-full flex-shrink-0"></div>
                                <span class="text-neutral-700 dark:text-neutral-300 font-medium text-sm">{{ rt(region) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PAN-ID Teaser -->
        <PANIDTeaser />

        <!-- CTA -->
        <div class="bg-neutral-50 dark:bg-neutral-950 py-16">
            <div class="container mx-auto px-6">
                <SolutionCTA />
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-6px); }
.module-tab { will-change: transform, opacity; }
</style>
