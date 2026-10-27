<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const localePath = useLocalePath();
const cards = [
    { key: 'signals_context', bar: 'bg-primary-500' },
    { key: 'onboarding_complexity', bar: 'bg-secondary-500' },
    { key: 'cross_border', bar: 'bg-accent-cyan-500' },
    { key: 'transaction_workflows', bar: 'bg-accent-orange-500' },
];

onMounted(() => {
    gsap.from('.insight-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.insights-grid', start: 'top 80%' },
    });
});
</script>

<template>
    <section id="insights" class="relative bg-neutral-100 dark:bg-neutral-950 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-14">
                <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                    {{ $t('insights2.eyebrow') }}
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
                    {{ $t('insights2.title') }}
                </h2>
                <p class="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {{ $t('insights2.subtitle') }}
                </p>
            </div>

            <div class="insights-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-12">
                <div v-for="card in cards" :key="card.key" class="insight-card bg-white dark:bg-neutral-900 rounded-xl overflow-hidden">
                    <div class="h-1.5" :class="card.bar"></div>
                    <div class="p-5">
                        <h3 class="font-bold text-neutral-900 dark:text-white text-sm leading-snug">
                            {{ $t(`insights2.cards.${card.key}.title`) }}
                        </h3>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <NuxtLink :to="localePath('/about')"
                    class="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all bg-white dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                    {{ $t('insights2.cta') }}
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
