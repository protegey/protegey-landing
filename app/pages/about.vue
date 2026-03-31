<template>
    <div ref="pageRoot" class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden">

        <!-- ── Hero ──────────────────────────────────────────── -->
        <section class="relative pt-20 pb-10 md:pt-28 md:pb-20 overflow-hidden">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            
            <!-- Animated Background Glows -->
            <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse" />
            <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

            <div class="container mx-auto px-4 max-w-7xl relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-10">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_#22c55e]" />
                        {{ $t('about_page.hero.badge') }}
                    </div>

                    <h1 class="hero-headline text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tighter mb-6 leading-[1.1]">
                        {{ $t('about_page.hero.title') }}
                    </h1>

                    <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        {{ $t('about_page.hero.subtitle') }}
                    </p>
                </div>

                <div class="mt-20 md:mt-32 relative max-w-6xl mx-auto hero-image-wrap">
                    <div class="absolute inset-x-0 -bottom-1 h-32 bg-gradient-to-t from-neutral-50 dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
                    <div class="relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800/50 shadow-2xl backdrop-blur-3xl">
                        <NuxtImg
                            src="/images/about-hero.png"
                            :alt="$t('about_page.hero.image_alt')"
                            format="webp"
                            class="w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Story ─────────────────────────────────────────── -->
        <section class="py-16 md:py-24">
            <div class="container mx-auto px-4 max-w-7xl">
                <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    <!-- Narrative -->
                    <div class="space-y-10">
                        <div data-reveal>
                            <p class="text-xs font-mono text-neutral-500 dark:text-neutral-600 tracking-[0.25em] uppercase mb-5">
                                01 — {{ $t('about_page.story.title') }}
                            </p>
                            <h2 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-5 leading-tight">
                                {{ $t('about_page.story.problem_title') }}
                            </h2>
                            <p class="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed">
                                {{ $t('about_page.story.problem_text') }}
                            </p>
                        </div>

                        <div data-reveal class="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" style="--delay:60ms" />

                        <div data-reveal style="--delay:120ms">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-8 h-8 rounded-lg bg-secondary-500/10 flex items-center justify-center shrink-0">
                                    <HugeiconsIcon :icon="Share01Icon" :size="16" class="text-secondary-400" />
                                </div>
                                <span class="text-secondary-300 font-bold">{{ $t('about_page.story.solution_title') }}</span>
                            </div>
                            <p class="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                                {{ $t('about_page.story.solution_text') }}
                            </p>
                        </div>
                    </div>

                    <!-- Stat bento -->
                    <div class="grid grid-cols-2 gap-3">
                        <div data-reveal class="col-span-2 p-7 rounded-2xl border border-primary-500/25 bg-primary-500/5 group hover:bg-primary-500/8 transition-colors" style="--delay:60ms">
                            <div class="text-3xl font-bold text-neutral-900 dark:text-white font-mono mb-1">{{ $t('about_page.stats.realtime_value') }}</div>
                            <div class="text-neutral-400 dark:text-neutral-500 text-sm">{{ $t('about_page.stats.realtime_label') }}</div>
                        </div>
                        <div data-reveal class="p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900/80 transition-colors" style="--delay:120ms">
                            <div class="text-2xl font-bold text-neutral-900 dark:text-white font-mono mb-1">{{ $t('about_page.stats.pipeline_value') }}</div>
                            <div class="text-neutral-400 dark:text-neutral-500 text-sm">{{ $t('about_page.stats.pipeline_label') }}</div>
                        </div>
                        <div data-reveal class="p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900/80 transition-colors" style="--delay:180ms">
                            <div class="text-2xl font-bold text-neutral-900 dark:text-white font-mono mb-1">{{ $t('about_page.stats.unified_value') }}</div>
                            <div class="text-neutral-400 dark:text-neutral-500 text-sm">{{ $t('about_page.stats.unified_label') }}</div>
                        </div>
                        <div data-reveal class="col-span-2 p-7 rounded-2xl border border-secondary-500/20 bg-secondary-500/5 group hover:bg-secondary-500/8 transition-colors" style="--delay:240ms">
                            <div class="text-2xl font-bold text-neutral-900 dark:text-white font-mono mb-1">{{ $t('about_page.stats.crossborder_value') }}</div>
                            <div class="text-neutral-400 dark:text-neutral-500 text-sm">{{ $t('about_page.stats.crossborder_label') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Mission & Vision ───────────────────────────────── -->
        <section class="py-16 md:py-20 bg-neutral-100/50 dark:bg-neutral-900/25 border-y border-neutral-200 dark:border-neutral-900">
            <div class="container mx-auto px-4 max-w-7xl">
                <div class="grid md:grid-cols-2 gap-6">
                    <div data-reveal class="group p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-primary-500/30 transition-colors duration-500 relative overflow-hidden">
                        <div class="absolute -top-2 -right-2 text-[6rem] leading-none font-bold text-primary-500/4 group-hover:text-primary-500/8 transition-colors select-none pointer-events-none">
                            <HugeiconsIcon :icon="QuotesIcon" :size="20" />
                        </div>
                        <div class="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6">
                            <HugeiconsIcon :icon="Target01Icon" :size="20" class="text-primary-400" />
                        </div>
                        <p class="text-[10px] font-mono text-primary-500 tracking-[0.2em] uppercase mb-4">{{ $t('about_page.mission_vision.mission_title') }}</p>
                        <p class="text-neutral-900 dark:text-white text-base leading-relaxed font-light">
                            {{ $t('about_page.mission_vision.mission_desc') }}
                        </p>
                    </div>

                    <div data-reveal class="group p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-secondary-500/30 transition-colors duration-500 relative overflow-hidden" style="--delay:80ms">
                        <div class="absolute -top-2 -right-2 text-[6rem] leading-none font-bold text-secondary-500/4 group-hover:text-secondary-500/8 transition-colors select-none pointer-events-none">
                            <HugeiconsIcon :icon="QuotesIcon" :size="20" />
                        </div>
                        <div class="w-10 h-10 rounded-xl bg-secondary-500/10 flex items-center justify-center mb-6">
                            <HugeiconsIcon :icon="ViewIcon" :size="20" class="text-secondary-400" />
                        </div>
                        <p class="text-[10px] font-mono text-secondary-400 tracking-[0.2em] uppercase mb-4">{{ $t('about_page.mission_vision.vision_title') }}</p>
                        <p class="text-neutral-900 dark:text-white text-base leading-relaxed font-light">
                            {{ $t('about_page.mission_vision.vision_desc') }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Values ─────────────────────────────────────────── -->
        <section class="py-16 md:py-24">
            <div class="container mx-auto px-4 max-w-7xl">
                <div data-reveal class="text-center mb-16">
                    <p class="text-xs font-mono text-neutral-500 dark:text-neutral-600 tracking-[0.25em] uppercase mb-4">03 — Ethos</p>
                    <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">{{ $t('about_page.values.title') }}</h2>
                </div>

                <div class="grid md:grid-cols-3 gap-5">
                    <div
                        v-for="(v, i) in values"
                        :key="v.key"
                        data-reveal
                        class="group p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-300"
                        :style="`--delay:${i * 80}ms`"
                    >
                        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-6', v.bgClass]">
                            <HugeiconsIcon :icon="v.icon" :size="20" :class="v.colorClass" />
                        </div>
                        <h3 class="text-base font-bold text-neutral-900 dark:text-white mb-3">{{ $t(`about_page.values.${v.key}_title`) }}</h3>
                        <p class="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">{{ $t(`about_page.values.${v.key}_desc`) }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── CTA ────────────────────────────────────────────── -->
        <section class="pb-24 px-4">
            <div data-reveal class="container mx-auto max-w-3xl">
                <div class="p-8 md:p-10 rounded-[2rem] border border-primary-500/20 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5">
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">{{ $t('about_page.cta.title') }}</h2>
                    <p class="text-neutral-500 dark:text-neutral-400 mb-8 text-base">{{ $t('about_page.cta.subtitle') }}</p>
                    <NuxtLink
                        :to="localePath('/contact')"
                        class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary-400 hover:bg-primary-300 text-neutral-950 font-bold transition-all hover:scale-[1.03] active:scale-95"
                    >
                        {{ $t('about_page.cta.button') }}
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="18" />
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    Shield01Icon, ZapIcon, Share01Icon,
    Target01Icon, ViewIcon, ChartIcon, ArrowRight01Icon,
    QuotesIcon
} from '@hugeicons/core-free-icons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const values = [
    { key: 'trust',      icon: Shield01Icon, colorClass: 'text-primary-400',   bgClass: 'bg-primary-500/10' },
    { key: 'innovation', icon: ZapIcon,       colorClass: 'text-secondary-400', bgClass: 'bg-secondary-500/10' },
    { key: 'impact',     icon: ChartIcon,     colorClass: 'text-accent-cyan-400',   bgClass: 'bg-accent-cyan-500/10' },
]

const pageRoot = ref(null)

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero title animation
    gsap.from('.hero-headline', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
    })

    // General reveal animation
    const reveals = gsap.utils.toArray('[data-reveal]')
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: el.dataset.delay ? parseFloat(el.dataset.delay) / 1000 : 0
        })
    })

    // Parallax effect for hero image
    gsap.to('.hero-image-wrap', {
        scrollTrigger: {
            trigger: '.hero-image-wrap',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -50,
        ease: 'none'
    })
})

useSeoMeta({
    title: t('seo.about_page.title'),
    ogTitle: t('seo.about_page.title'),
    description: t('seo.about_page.description'),
    ogDescription: t('seo.about_page.description'),
    ogImage: '/images/about-hero.png',
    twitterCard: 'summary_large_image',
    twitterTitle: t('seo.about_page.title'),
    twitterDescription: t('seo.about_page.description'),
    twitterImage: '/images/about-hero.png',
    twitterSite: '@ProtegeyHQ'
})

if (import.meta.server) {
const baseUrl = 'https://www.protegey.com'
const currentLocale = locale.value
const localePrefix = currentLocale === 'fr' ? '' : `/${currentLocale}`

usePageMeta({
    title: t('seo.about.title'),
    description: t('seo.about.description'),
    ogImage: t('seo.about.image'),
    schemaOrg: [
        {
            '@type': 'AboutPage',
            name: t('seo.about.title'),
            description: t('seo.about.description'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('footer.links.about'), item: `${baseUrl}${localePrefix}/about` }
            ]
        }
    ]
})

if (import.meta.server) {
    defineOgImageComponent('NuxtSeo', {
        title: t('seo.about.title'),
        description: t('seo.about.description'),
        theme: '#0B1741',
        colorMode: 'dark',
    })
}

    useSchemaOrg([
        {
            '@type': 'AboutPage',
            name: t('seo.about_page.title'),
            description: t('geo.canonical_definition'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('footer.links.about'), item: `${baseUrl}${localePrefix}/about` }
            ]
        }
    ])
}
</script>

<style scoped>
/* Light mode: deep blue → emerald — readable on white */
.hero-headline {
    background: linear-gradient(135deg, #0B1741 0%, #0cb99e 40%, #1b59ae 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Dark mode: white → emerald → blue */
:global(.dark) .hero-headline {
    background: linear-gradient(135deg, #ffffff 20%, #0cb99e 60%, #1b59ae 100%);
}

[data-reveal] {
    will-change: transform, opacity;
}
</style>
