<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { CheckmarkCircle01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

gsap.registerPlugin(ScrollTrigger);

const { tm, rt } = useI18n();
const localePath = useLocalePath();

onMounted(() => {
    gsap.from('.intel-reveal', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#intelligence-layer', start: 'top 75%' },
    });
});
</script>

<template>
    <section id="intelligence-layer" class="relative bg-neutral-900 dark:bg-neutral-950 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto mb-14">
                <div class="intel-reveal text-xs font-bold tracking-widest uppercase text-accent-cyan-400 mb-5">
                    {{ $t('intelligence_layer2.eyebrow') }}
                </div>
                <h2 class="intel-reveal text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                    {{ $t('intelligence_layer2.title') }}
                </h2>
            </div>

            <div class="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <p class="intel-reveal text-base text-neutral-400 leading-relaxed">
                    {{ $t('intelligence_layer2.body') }}
                </p>

                <div class="intel-reveal bg-neutral-800/60 border border-neutral-700 rounded-2xl p-7">
                    <div class="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-5">
                        {{ $t('intelligence_layer2.what_this_means') }}
                    </div>
                    <ul class="space-y-4 mb-7">
                        <li v-for="(point, i) in tm('intelligence_layer2.points')" :key="i" class="flex items-start gap-3">
                            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18" class="text-accent-cyan-400 flex-shrink-0 mt-0.5" />
                            <span class="text-sm text-neutral-300 leading-relaxed">{{ rt(point) }}</span>
                        </li>
                    </ul>
                    <NuxtLink :to="localePath('/solutions/pan-risk')"
                        class="inline-flex items-center gap-2 text-sm font-bold text-accent-cyan-400 hover:gap-3 transition-all">
                        {{ $t('intelligence_layer2.cta') }}
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="rtl:rotate-180" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
