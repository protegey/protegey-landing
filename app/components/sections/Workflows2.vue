<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { FingerPrintIcon, Settings01Icon, Link01Icon } from '@hugeicons/core-free-icons';

gsap.registerPlugin(ScrollTrigger);

const localePath = useLocalePath();
const cards = [
    { key: 'onboarding', icon: FingerPrintIcon },
    { key: 'rules', icon: Settings01Icon },
    { key: 'capabilities', icon: Link01Icon },
];

onMounted(() => {
    gsap.from('.workflow-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.workflow-grid', start: 'top 80%' },
    });
});
</script>

<template>
    <section id="workflows" class="relative bg-white dark:bg-neutral-900 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-14">
                <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                    {{ $t('workflows2.eyebrow') }}
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
                    {{ $t('workflows2.title') }}
                </h2>
                <p class="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {{ $t('workflows2.subtitle') }}
                </p>
            </div>

            <div class="workflow-grid grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
                <div v-for="card in cards" :key="card.key" class="workflow-card bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7">
                    <HugeiconsIcon :icon="card.icon" :size="22" class="text-primary-500 mb-4" />
                    <h3 class="font-bold text-neutral-900 dark:text-white text-base mb-2">
                        {{ $t(`workflows2.cards.${card.key}.title`) }}
                    </h3>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {{ $t(`workflows2.cards.${card.key}.body`) }}
                    </p>
                </div>
            </div>

            <div class="text-center">
                <NuxtLink :to="localePath('/solutions/pan-studio')"
                    class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
                    {{ $t('workflows2.cta') }}
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
