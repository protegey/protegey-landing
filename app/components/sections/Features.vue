<script setup>
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import {
    Shield01Icon,
    ChartHistogramIcon,
    FileValidationIcon,
    Activity01Icon,
    Notification02Icon,
    Settings01Icon
} from '@hugeicons/core-free-icons';

defineProps({ isDark: Boolean });
const { t, tm, rt } = useI18n();

if (typeof window !== 'undefined' && !gsap.plugins.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

let st;

// Icon + accent color mapping per feature key
const featureMeta = {
    fraud:       { icon: Shield01Icon,        accent: 'primary' },
    behavioral:  { icon: ChartHistogramIcon,  accent: 'secondary' },
    compliance:  { icon: FileValidationIcon,  accent: 'cyan' },
    monitoring:  { icon: Activity01Icon,      accent: 'primary' },
    alerts:      { icon: Notification02Icon,  accent: 'secondary' },
    integration: { icon: Settings01Icon,      accent: 'cyan' },
};

const accentClasses = {
    primary:   { icon: 'text-primary-400',   bg: 'bg-primary-500/10',   border: 'border-primary-500/20',   hover: 'hover:border-primary-500/40 hover:bg-primary-500/5' },
    secondary: { icon: 'text-secondary-400', bg: 'bg-secondary-500/10', border: 'border-secondary-500/20', hover: 'hover:border-secondary-500/40 hover:bg-secondary-500/5' },
    cyan:      { icon: 'text-accent-cyan-500', bg: 'bg-accent-cyan-500/10', border: 'border-accent-cyan-500/20', hover: 'hover:border-accent-cyan-500/40 hover:bg-accent-cyan-500/5' },
};

onMounted(() => {
    try {
        setTimeout(() => {
            st = ScrollTrigger.create({
                trigger: '.features-modern',
                start: 'top center+=100',
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();
                    tl.from('.features-title', {
                        y: 50, opacity: 0, duration: 1, ease: 'power3.out'
                    })
                    .from('.features-subtitle', {
                        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
                    }, '-=0.6')
                    .from('.feature-card', {
                        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
                    }, '-=0.4');
                }
            });
        }, 100);
    } catch (error) {
        console.warn('GSAP animation failed:', error);
    }
});

onUnmounted(() => {
    if (st && st.kill) st.kill();
});
</script>

<template>
    <section id="features" class="features-modern relative py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">

        <!-- Subtle background glow -->
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
            <div class="absolute top-0 left-1/3 w-[600px] h-[400px] bg-primary-500/5 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-0 right-1/3 w-[500px] h-[300px] bg-secondary-500/5 rounded-full blur-[100px]"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="mx-auto max-w-7xl">

                <!-- Section panel -->
                <div class="relative rounded-3xl border border-neutral-200/80 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/40 backdrop-blur-sm px-6 sm:px-10 md:px-14 py-12 md:py-16 overflow-hidden">

                    <!-- Inner grid texture — dark uses white lines, light uses dark lines -->
                    <div class="pointer-events-none absolute inset-0 rounded-3xl
                        bg-[linear-gradient(rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.06)_1px,transparent_1px)]
                        dark:bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)]
                        bg-[size:36px_36px]" aria-hidden="true">
                    </div>

                    <!-- Header -->
                    <div class="relative text-center max-w-3xl mx-auto mb-10 md:mb-14">
                        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-primary-500/30 bg-primary-500/10 text-primary-400">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse"></span>
                            {{ t('features.badge') }}
                        </span>
                        <h2 class="features-title mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white rtl:text-center">
                            {{ t('features.title_main') }}
                            <span class="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                                {{ t('features.title_highlight') }}
                            </span>
                        </h2>
                        <p class="features-subtitle mt-4 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 rtl:text-center">
                            {{ t('features.subtitle') }}
                        </p>
                    </div>

                    <!-- Features Grid -->
                    <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        <div v-for="(feature, key) in tm('features.items')" :key="key" class="feature-card">
                            <div :class="[
                                'h-full rounded-2xl border transition-all duration-300 p-6 md:p-7 group',
                                accentClasses[featureMeta[key]?.accent ?? 'primary'].border,
                                accentClasses[featureMeta[key]?.accent ?? 'primary'].hover,
                                'bg-white dark:bg-neutral-900/60'
                            ]">
                                <div class="flex items-start gap-4 rtl:flex-row-reverse">
                                    <!-- Icon -->
                                    <div :class="[
                                        'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                                        accentClasses[featureMeta[key]?.accent ?? 'primary'].bg,
                                        accentClasses[featureMeta[key]?.accent ?? 'primary'].icon
                                    ]">
                                        <HugeiconsIcon
                                            :icon="featureMeta[key]?.icon ?? Shield01Icon"
                                            :size="18" />
                                    </div>
                                    <div>
                                        <h3 class="text-base md:text-lg font-semibold text-neutral-900 dark:text-white mb-1.5 rtl:text-right">
                                            {{ rt(feature.title) }}
                                        </h3>
                                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed rtl:text-right">
                                            {{ rt(feature.description) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>
