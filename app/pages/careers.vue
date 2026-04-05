<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden">
        <!-- ── Hero ──────────────────────────────────────────── -->
        <section class="relative pt-32 pb-16 md:pt-40 md:pb-28 overflow-hidden">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            
            <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

            <div class="container mx-auto px-4 max-w-7xl relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-500/20 bg-secondary-500/5 text-secondary-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-12">
                        <span class="w-1.5 h-1.5 rounded-full bg-secondary-400 shadow-[0_0_10px_#f59e0b]" />
                        {{ $t('careers.eyebrow') }}
                    </div>

                    <h1 class="hero-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">
                        {{ $t('careers.title') }}
                    </h1>

                    <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        {{ $t('careers.subtitle') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- ── Culture & Pillars ─────────────────────────────── -->
        <section class="py-24 md:py-32 relative">
            <div class="container mx-auto px-4 max-w-7xl">
                <div class="grid lg:grid-cols-3 gap-12 lg:gap-20 items-end mb-20">
                    <div class="lg:col-span-2">
                        <p data-reveal class="text-xs font-mono text-neutral-500 dark:text-neutral-600 tracking-[0.25em] uppercase mb-5">
                            01 — {{ $t('careers.culture_title') }}
                        </p>
                        <h2 data-reveal class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white leading-[1.1]" style="--delay:100ms">
                            {{ $t('careers.culture_subtitle') }}
                        </h2>
                    </div>
                </div>

                <div class="grid md:grid-cols-3 gap-6">
                    <div v-for="(pillar, i) in $tm('careers.pillars')" :key="i"
                        data-reveal
                        class="group p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-secondary-500/30 transition-all duration-500"
                        :style="`--delay:${i * 100}ms`"
                    >
                        <div class="text-secondary-400 font-mono text-xs mb-6">0{{ i + 1 }}</div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4 group-hover:text-secondary-400 transition-colors">
                            {{ $rt(pillar.title) }}
                        </h3>
                        <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            {{ $rt(pillar.desc) }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Benefits ──────────────────────────────────────── -->
        <section class="py-16 md:py-24 bg-neutral-100/50 dark:bg-neutral-900/20 border-y border-neutral-200 dark:border-neutral-900">
            <div class="container mx-auto px-4 max-w-7xl">
                <div data-reveal class="text-center mb-16">
                    <p class="text-xs font-mono text-neutral-500 dark:text-neutral-600 tracking-[0.25em] uppercase mb-4">02 — {{ $t('careers.perks_eyebrow') }}</p>
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">{{ $t('careers.benefits_title') }}</h2>
                </div>

                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div v-for="(benefit, i) in $tm('careers.benefits')" :key="i"
                        data-reveal
                        class="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 hover:bg-white dark:hover:bg-neutral-950 transition-colors"
                        :style="`--delay:${i * 80}ms`"
                    >
                        <div class="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6">
                            <HugeiconsIcon :icon="getBenefitIcon(i)" :size="20" class="text-primary-400" />
                        </div>
                        <h3 class="font-bold text-neutral-900 dark:text-white mb-2">{{ $rt(benefit.title) }}</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{{ $rt(benefit.desc) }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Open Roles / Talent Pool ──────────────────────── -->
        <section class="py-24 px-4">
            <div class="container mx-auto max-w-5xl">
                <div data-reveal class="relative p-10 md:p-14 rounded-[2rem] border border-secondary-500/30 bg-neutral-900 dark:bg-neutral-900 overflow-hidden group">
                    <!-- Background decorative element -->
                    <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary-500/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000" />
                    
                    <div class="relative z-10 max-w-2xl">
                        <div class="text-secondary-400 font-bold text-sm mb-6 flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-secondary-400 animate-bounce" />
                            {{ $t('careers.no_roles') }}
                        </div>
                        <h2 class="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                            {{ $t('careers.no_roles_desc') }}
                        </h2>
                        <a href="mailto:careers@protegey.com" 
                            class="inline-flex items-center gap-3 text-lg md:text-xl font-bold text-secondary-400 hover:text-white transition-all hover:gap-5">
                            {{ $t('careers.cta') }}
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="24" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    GlobalIcon, ArrowRight01Icon,
    Briefcase02Icon, RocketIcon, HealthIcon, ChartIcon
} from '@hugeicons/core-free-icons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()
const baseUrl = 'https://www.protegey.com'

const getBenefitIcon = (index) => {
    const icons = [GlobalIcon, HealthIcon, ChartIcon, RocketIcon]
    return icons[index] || Briefcase02Icon
}

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
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: el.dataset.delay ? parseFloat(el.dataset.delay) / 1000 : 0
        })
    })
})

usePageMeta({
    title: t('seo.careers.title'),
    description: t('seo.careers.description'),
    schemaOrg: [
        {
            '@type': 'WebPage',
            name: t('seo.careers.title'),
            description: t('seo.careers.description'),
            publisher: { '@type': 'Organization', name: 'Protegey' },
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('footer.links.careers'), item: `${baseUrl}/careers` }
            ]
        }
    ]
})

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'Organization',
            '@id': `${baseUrl}#organization`,
            name: 'Protegey',
            url: baseUrl,
            sameAs: ['https://www.linkedin.com/company/protegeyhq/', 'https://x.com/ProtegeyHQ']
        }
    ])
}
</script>

<style scoped>
.hero-headline {
    background: linear-gradient(135deg, #0B1741 0%, #f59e0b 50%, #d97706 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

:global(.dark) .hero-headline {
    background: linear-gradient(135deg, #ffffff 20%, #f59e0b 60%, #d97706 100%);
}

[data-reveal] {
    will-change: transform, opacity;
}
</style>
