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

                    <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                        {{ $t('careers.subtitle') }}
                    </p>

                    <button @click="scrollToRoles"
                        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-500/30 bg-primary-500/5 text-primary-400 hover:bg-primary-500/10 hover:border-primary-500/50 font-semibold text-sm transition-all">
                        {{ $t('careers.view_roles_btn') }}
                        <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" class="animate-bounce" />
                    </button>
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
        <section class="py-20 md:py-28 bg-neutral-100/50 dark:bg-neutral-900/20 border-y border-neutral-200 dark:border-neutral-900">
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

        <!-- ── Open Roles ────────────────────────────────────── -->
        <section id="open-roles" class="py-24 px-4">
            <div class="container mx-auto max-w-5xl">
                <!-- Section header -->
                <div data-reveal class="text-center mb-14">
                    <p class="text-xs font-mono text-neutral-500 dark:text-neutral-600 tracking-[0.25em] uppercase mb-4">03 — {{ $t('careers.roles_eyebrow') }}</p>
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">{{ $t('careers.roles_title') }}</h2>
                    <p class="mt-4 text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">{{ $t('careers.roles_subtitle') }}</p>
                </div>

                <!-- Country Partner listing card -->
                <div data-reveal class="rounded-[2rem] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
                    <!-- Card header -->
                    <div class="p-8 md:p-10">
                        <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
                            <div class="flex flex-wrap items-center gap-3">
                                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                                    <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                                    {{ $t('careers.cp_badge') }}
                                </span>
                                <span class="inline-flex items-center px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 text-[10px] font-semibold tracking-widest uppercase">
                                    {{ $t('careers.cp_type') }}
                                </span>
                            </div>
                        </div>

                        <h3 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-1">{{ $t('careers.cp_title') }}</h3>
                        <p class="text-primary-400 font-semibold mb-5">{{ $t('careers.cp_region') }}</p>
                        <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 max-w-2xl">{{ $t('careers.cp_about') }}</p>

                        <!-- Priority Markets -->
                        <div class="mb-8">
                            <p class="text-[10px] font-semibold text-neutral-500 dark:text-neutral-500 uppercase tracking-[0.2em] mb-3">{{ $t('careers.cp_markets_label') }}</p>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="market in $tm('careers.cp_markets')" :key="$rt(market)"
                                    class="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
                                    {{ $rt(market) }}
                                </span>
                            </div>
                        </div>

                        <!-- CTA row -->
                        <div class="flex flex-wrap items-center gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                            <a :href="`mailto:${$t('careers.cp_apply_email')}?subject=Country Partner Application`"
                                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-400 text-white font-bold text-sm transition-colors">
                                {{ $t('careers.cp_apply_btn') }}
                                <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" />
                            </a>
                            <button @click="expanded = !expanded"
                                class="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                {{ expanded ? $t('careers.cp_collapse') : $t('careers.cp_expand') }}
                                <HugeiconsIcon :icon="ArrowDown01Icon" :size="16" class="transition-transform duration-300" :class="{ 'rotate-180': expanded }" />
                            </button>
                        </div>
                    </div>

                    <!-- Expandable details -->
                    <Transition name="expand">
                        <div v-if="expanded" class="border-t border-neutral-200 dark:border-neutral-800">
                            <div class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
                                <!-- Left col: Mission + Success -->
                                <div class="p-8 space-y-8">
                                    <div>
                                        <h4 class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.2em] uppercase mb-4">{{ $t('careers.cp_mission_title') }}</h4>
                                        <ul class="space-y-2.5">
                                            <li v-for="(item, i) in $tm('careers.cp_mission')" :key="i"
                                                class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                                                {{ $rt(item) }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.2em] uppercase mb-4">{{ $t('careers.cp_success_title') }}</h4>
                                        <ul class="space-y-2.5">
                                            <li v-for="(item, i) in $tm('careers.cp_success')" :key="i"
                                                class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                                                {{ $rt(item) }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.2em] uppercase mb-4">{{ $t('careers.cp_not_for_title') }}</h4>
                                        <ul class="space-y-2.5">
                                            <li v-for="(item, i) in $tm('careers.cp_not_for')" :key="i"
                                                class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                <span class="w-1.5 h-1.5 rounded-full bg-accent-orange-500 mt-1.5 shrink-0" />
                                                {{ $rt(item) }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <!-- Right col: Profile + Compensation + Growth -->
                                <div class="p-8 space-y-8">
                                    <div>
                                        <h4 class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.2em] uppercase mb-4">{{ $t('careers.cp_profile_title') }}</h4>
                                        <ul class="space-y-2.5">
                                            <li v-for="(item, i) in $tm('careers.cp_profile')" :key="i"
                                                class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                <span class="w-1.5 h-1.5 rounded-full bg-secondary-400 mt-1.5 shrink-0" />
                                                {{ $rt(item) }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.2em] uppercase mb-4">{{ $t('careers.cp_comp_title') }}</h4>
                                        <ul class="space-y-2.5">
                                            <li v-for="(item, i) in $tm('careers.cp_comp')" :key="i"
                                                class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                                                {{ $rt(item) }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="p-5 rounded-2xl bg-primary-500/5 border border-primary-500/15">
                                        <h4 class="text-[10px] font-mono text-primary-400 tracking-[0.2em] uppercase mb-3">{{ $t('careers.cp_growth_title') }}</h4>
                                        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ $t('careers.cp_growth') }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- How to Apply footer -->
                            <div class="p-8 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50">
                                <h4 class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.2em] uppercase mb-4">{{ $t('careers.cp_apply_title') }}</h4>
                                <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                    {{ $t('careers.cp_apply_intro') }}
                                    <a :href="`mailto:${$t('careers.cp_apply_email')}`" class="text-primary-400 hover:text-primary-500 font-semibold transition-colors">{{ $t('careers.cp_apply_email') }}</a>:
                                </p>
                                <ul class="space-y-2.5 mb-6">
                                    <li v-for="(item, i) in $tm('careers.cp_apply_items')" :key="i"
                                        class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        <span class="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-500 dark:text-neutral-400 shrink-0 mt-0.5">{{ i + 1 }}</span>
                                        {{ $rt(item) }}
                                    </li>
                                </ul>
                                <a :href="`mailto:${$t('careers.cp_apply_email')}?subject=Country Partner Application`"
                                    class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-400 text-white font-bold text-sm transition-colors">
                                    {{ $t('careers.cp_apply_btn') }}
                                    <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" />
                                </a>
                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Talent pool fallback -->
                <div data-reveal class="mt-6 p-6 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-center">
                    <p class="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">{{ $t('careers.no_roles') }}</p>
                    <p class="text-sm text-neutral-500 dark:text-neutral-500">
                        {{ $t('careers.no_roles_desc') }}
                        <a href="mailto:careers@protegey.com" class="text-primary-400 hover:text-primary-500 transition-colors ml-1">{{ $t('careers.cta') }}</a>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    GlobalIcon, ArrowRight01Icon, ArrowDown01Icon,
    Briefcase02Icon, RocketIcon, HealthIcon, ChartIcon
} from '@hugeicons/core-free-icons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()
const expanded = ref(false)

const scrollToRoles = () => {
    document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })
}
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

.expand-enter-active,
.expand-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
