<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SignalFeedTerminal from '~/components/illustrations/SignalFeedTerminal.vue';

gsap.registerPlugin(ScrollTrigger);

const localePath = useLocalePath();
const steps = ['s1', 's2', 's3', 's4'];

onMounted(() => {
    gsap.from('.step-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.steps-grid', start: 'top 80%' },
    });
});
</script>

<template>
    <section id="how-it-works" class="relative bg-neutral-50 dark:bg-neutral-950 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-14">
                <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                    {{ $t('how_it_works2.eyebrow') }}
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
                    {{ $t('how_it_works2.title') }}
                </h2>
            </div>

            <div class="steps-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
                <div v-for="(step, i) in steps" :key="step" class="step-card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                    <div class="text-3xl font-black text-primary-500/30 mb-4 font-mono">{{ String(i + 1).padStart(2, '0') }}</div>
                    <h3 class="font-bold text-neutral-900 dark:text-white text-base mb-2 leading-snug">
                        {{ $t(`how_it_works2.steps.${step}.title`) }}
                    </h3>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {{ $t(`how_it_works2.steps.${step}.body`) }}
                    </p>
                </div>
            </div>

            <div class="max-w-2xl mx-auto mb-14">
                <SignalFeedTerminal />
            </div>

            <div class="max-w-2xl mx-auto text-center">
                <p class="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                    {{ $t('how_it_works2.body') }}
                </p>
                <NuxtLink :to="localePath('/solutions')"
                    class="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all bg-white dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                    {{ $t('how_it_works2.cta') }}
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
