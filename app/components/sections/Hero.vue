<script setup>
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import WaveDivider from '~/components/illustrations/WaveDivider.vue';

defineProps({ isDark: Boolean });

const localePath = useLocalePath();

let tl;

onMounted(() => {
    try {
        gsap.set('.hero-badge', { opacity: 0, y: -16 });
        gsap.set('.hero-title', { opacity: 0, y: 32 });
        gsap.set('.hero-subtitle', { opacity: 0, y: 16 });
        gsap.set('.hero-cta-button', { opacity: 0, y: 16 });
        gsap.set('.hero-footnote', { opacity: 0 });
        gsap.set('.dashboard-card', { opacity: 0, scale: 0.96 });
        gsap.set('.alert-float-card', { opacity: 0, y: 12, scale: 0.95 });
        gsap.set('.connected-flow-tag', { opacity: 0, y: 10 });

        tl = gsap.timeline();
        tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
          .to('.hero-title', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
          .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          .to('.hero-cta-button', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.5')
          .to('.hero-footnote', { opacity: 1, duration: 0.6 }, '-=0.3')
          .to('.dashboard-card', { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
          .to('.alert-float-card', { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.3')
          .to('.connected-flow-tag', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    } catch (error) {
        console.warn('GSAP animation failed:', error);
    }
});

onUnmounted(() => {
    if (tl && tl.kill) tl.kill();
});
</script>

<template>
    <section id="hero" class="relative bg-neutral-50 dark:bg-neutral-950 overflow-hidden pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-20">
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent"></div>
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/8 rounded-full blur-3xl"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-[5fr_6fr] gap-16 lg:gap-16 items-center">

                <!-- Left Content -->
                <div class="text-left rtl:text-right space-y-7">
                    <div class="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold tracking-widest uppercase">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        {{ $t('hero2.badge') }}
                    </div>

                    <h1 class="hero-title text-4xl lg:text-5xl font-bold leading-[1.12] text-neutral-900 dark:text-white tracking-tight">
                        {{ $t('hero2.title') }}
                    </h1>

                    <p class="hero-subtitle text-lg text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
                        {{ $t('hero2.subtitle') }}
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4 pt-2">
                        <NuxtLink :to="localePath('/#waitlist')"
                            class="hero-cta-button group bg-primary-500 hover:bg-primary-400 text-white px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(12,185,158,0.25)] hover:shadow-[0_0_30px_rgba(12,185,158,0.4)]">
                            {{ $t('hero2.cta_primary') }}
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="18"
                                class="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                        </NuxtLink>
                        <NuxtLink :to="localePath('/solutions')"
                            class="hero-cta-button group border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 bg-white dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                            {{ $t('hero2.cta_secondary') }}
                        </NuxtLink>
                    </div>

                    <p class="hero-footnote text-sm text-neutral-400 dark:text-neutral-500 pt-2 max-w-md leading-relaxed">
                        {{ $t('hero2.footnote') }}
                    </p>
                </div>

                <!-- Right Visual -->
                <div class="relative perspective-1000">
                    <div class="dashboard-card relative z-10 mx-auto lg:mx-0 lg:ml-auto w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 shadow-xl">
                        <img
                            src="/images/hero-two-men.webp"
                            :alt="$t('hero2.photo_alt')"
                            width="1000"
                            height="1500"
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <!-- Floating alert card -->
                    <div class="alert-float-card absolute -top-6 right-2 sm:-top-8 sm:-right-6 z-20 w-72 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl p-4">
                        <div class="flex items-center gap-2 mb-1.5">
                            <span class="w-2 h-2 rounded-full bg-accent-orange-500 flex-shrink-0"></span>
                            <p class="text-sm font-bold text-neutral-900 dark:text-white leading-snug">{{ $t('hero2.alert_card.title') }}</p>
                        </div>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">{{ $t('hero2.alert_card.description') }}</p>
                        <NuxtLink :to="localePath('/solutions/pan-risk')"
                            class="inline-flex items-center justify-center bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                            {{ $t('hero2.alert_card.cta') }}
                        </NuxtLink>
                    </div>

                    <div class="connected-flow-tag absolute -bottom-6 left-2 sm:-bottom-10 sm:-left-10 z-20 w-64 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl p-4">
                        <p class="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-secondary-600 dark:text-secondary-400 mb-2.5">
                            {{ $t('hero2.connected_flow') }}
                        </p>
                        <div class="grid grid-cols-2 gap-1.5">
                            <span v-for="(step, i) in 6" :key="i"
                                class="text-[0.65rem] font-semibold px-2.5 py-1.5 rounded-full text-center truncate"
                                :class="i === 4 ? 'bg-accent-cyan-500/15 text-accent-cyan-700 dark:text-accent-cyan-400' : i === 5 ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'">
                                {{ $t(`hero2.flow_steps.${i}`) }}
                            </span>
                        </div>
                    </div>

                    <div class="absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl -z-10" />
                    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </div>

        <!-- Decorative wave transition -->
        <WaveDivider />
    </section>
</template>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}
</style>
