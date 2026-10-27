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
    gsap.from('.regulated-reveal', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#regulated', start: 'top 75%' },
    });
});
</script>

<template>
    <section id="regulated" class="relative bg-white dark:bg-neutral-900 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
                <div class="regulated-reveal">
                    <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                        {{ $t('regulated2.eyebrow') }}
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
                        {{ $t('regulated2.title') }}
                    </h2>
                    <p class="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {{ $t('regulated2.body') }}
                    </p>
                </div>

                <div class="regulated-reveal bg-neutral-900 dark:bg-neutral-950 border border-neutral-800 rounded-2xl p-7">
                    <div class="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-5">
                        {{ $t('regulated2.box_title') }}
                    </div>
                    <ul class="space-y-4 mb-7">
                        <li v-for="(point, i) in tm('regulated2.points')" :key="i" class="flex items-start gap-3">
                            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-primary-400 flex-shrink-0 mt-0.5" />
                            <span class="text-sm text-neutral-300 leading-relaxed">{{ rt(point) }}</span>
                        </li>
                    </ul>
                    <NuxtLink :to="localePath('/trust')"
                        class="inline-flex items-center justify-center w-full bg-white text-neutral-900 hover:bg-neutral-100 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
                        {{ $t('regulated2.cta') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
