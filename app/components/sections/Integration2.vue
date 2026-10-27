<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';

gsap.registerPlugin(ScrollTrigger);

const { tm, rt } = useI18n();
const localePath = useLocalePath();

onMounted(() => {
    gsap.from('.integration-reveal', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#integration', start: 'top 75%' },
    });
});
</script>

<template>
    <section id="integration" class="relative bg-neutral-50 dark:bg-neutral-950 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
                <div class="integration-reveal">
                    <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                        {{ $t('integration2.eyebrow') }}
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
                        {{ $t('integration2.title') }}
                    </h2>
                    <p class="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {{ $t('integration2.body') }}
                    </p>
                </div>

                <div class="integration-reveal bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7">
                    <ul class="space-y-4 mb-7">
                        <li v-for="(point, i) in tm('integration2.points')" :key="i" class="flex items-start gap-3">
                            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-primary-500 flex-shrink-0 mt-0.5" />
                            <span class="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{{ rt(point) }}</span>
                        </li>
                    </ul>
                    <NuxtLink :to="localePath('/contact')"
                        class="inline-flex items-center justify-center w-full bg-primary-500 hover:bg-primary-400 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
                        {{ $t('integration2.cta') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
