<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Settings01Icon } from '@hugeicons/core-free-icons';

gsap.registerPlugin(ScrollTrigger);

const localePath = useLocalePath();

const cards = [
    { key: 'identity', slug: 'pan-id', accent: 'secondary' },
    { key: 'fraud', slug: 'transaction-monitoring', accent: 'primary' },
    { key: 'risk', slug: 'pan-risk', accent: 'cyan' },
];

const accentClasses = {
    secondary: { badge: 'bg-secondary-500/10 text-secondary-600 dark:text-secondary-400', border: 'border-secondary-500/20', link: 'text-secondary-600 dark:text-secondary-400' },
    primary: { badge: 'bg-primary-500/10 text-primary-600 dark:text-primary-400', border: 'border-primary-500/20', link: 'text-primary-600 dark:text-primary-400' },
    cyan: { badge: 'bg-accent-cyan-500/10 text-accent-cyan-600 dark:text-accent-cyan-400', border: 'border-accent-cyan-500/20', link: 'text-accent-cyan-600 dark:text-accent-cyan-400' },
};

onMounted(() => {
    gsap.from('.platform-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.platform-grid', start: 'top 80%' },
    });
    gsap.from('.platform-layer-banner', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.platform-layer-banner', start: 'top 85%' },
    });
});
</script>

<template>
    <section id="platform" class="relative bg-white dark:bg-neutral-900 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-14">
                <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                    {{ $t('platform2.eyebrow') }}
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
                    {{ $t('platform2.title') }}
                </h2>
                <p class="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {{ $t('platform2.subtitle') }}
                </p>
            </div>

            <div class="platform-grid grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div v-for="card in cards" :key="card.key"
                    class="platform-card bg-neutral-50 dark:bg-neutral-950 border rounded-2xl p-7 flex flex-col"
                    :class="accentClasses[card.accent].border">
                    <div class="inline-flex items-center justify-center w-11 h-11 rounded-xl font-bold text-sm mb-5"
                        :class="accentClasses[card.accent].badge">
                        {{ $t(`platform2.cards.${card.key}.badge`) }}
                    </div>
                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                        {{ $t(`platform2.cards.${card.key}.title`) }}
                    </h3>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 flex-1">
                        {{ $t(`platform2.cards.${card.key}.body`) }}
                    </p>
                    <NuxtLink :to="localePath(`/solutions/${card.slug}`)"
                        class="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                        :class="accentClasses[card.accent].link">
                        {{ $t(`platform2.cards.${card.key}.cta`) }}
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="rtl:rotate-180" />
                    </NuxtLink>
                </div>
            </div>

            <!-- Platform Layer banner -->
            <div class="platform-layer-banner max-w-6xl mx-auto mt-10 bg-neutral-900 dark:bg-neutral-950 border border-neutral-800 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 p-3 rounded-xl bg-accent-orange-500/15">
                        <HugeiconsIcon :icon="Settings01Icon" :size="24" class="text-accent-orange-400" />
                    </div>
                    <div>
                        <div class="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-1.5">
                            {{ $t('platform2.platform_layer.label') }}
                        </div>
                        <h3 class="text-xl font-bold text-white mb-1.5">{{ $t('platform2.platform_layer.title') }}</h3>
                        <p class="text-sm text-neutral-400 leading-relaxed max-w-md">{{ $t('platform2.platform_layer.body') }}</p>
                    </div>
                </div>
                <NuxtLink :to="localePath('/solutions/pan-studio')"
                    class="flex-shrink-0 bg-white text-neutral-900 hover:bg-neutral-100 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
                    {{ $t('platform2.platform_layer.cta') }}
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
