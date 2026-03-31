<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import {
    Activity01Icon,
    SmartPhone01Icon,
    Shield01Icon,
    UserStar01Icon,
    Share08Icon,
    ArrowRight01Icon,
} from '@hugeicons/core-free-icons';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);

const layerIcons = [Activity01Icon, SmartPhone01Icon, Shield01Icon, UserStar01Icon, Share08Icon];
const layerColors = [
    'text-primary-400 bg-primary-500/10 border-primary-500/20',
    'text-secondary-400 bg-secondary-500/10 border-secondary-500/20',
    'text-accent-cyan-400 bg-accent-cyan-500/10 border-accent-cyan-500/20',
    'text-accent-orange-400 bg-accent-orange-500/10 border-accent-orange-500/20',
    'text-primary-400 bg-primary-500/10 border-primary-500/20',
];

onMounted(() => {
    if (typeof window === 'undefined' || !sectionRef.value) return;

    gsap.fromTo(sectionRef.value.querySelector('.adv-header'),
        { y: 24, opacity: 0 },
        {
            scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        }
    );

    gsap.fromTo(sectionRef.value.querySelectorAll('.adv-layer'),
        { x: -20, opacity: 0 },
        {
            scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' },
            x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power3.out',
        }
    );
});

const scrollTo = (selector) => {
    const el = document.getElementById(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<template>
    <section id="advantage" ref="sectionRef"
        class="relative py-16 md:py-24 overflow-hidden bg-neutral-50 dark:bg-neutral-950">

        <!-- BG orbs -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
            <div class="absolute top-1/4 right-0 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl"></div>
        </div>

        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                <!-- Left: headline + CTA -->
                <div class="adv-header">
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold tracking-widest uppercase mb-8">
                        <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        {{ $t('solutions.closing_advantage.eyebrow') }}
                    </div>

                    <h2 class="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white leading-tight mb-4">
                        {{ $t('solutions.closing_advantage.title') }}
                    </h2>
                    <p class="text-base text-primary-400 font-semibold mb-8">
                        {{ $t('solutions.closing_advantage.subtitle') }}
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <button @click.prevent="scrollTo('waitlist')"
                            class="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-neutral-950 bg-primary-500 hover:bg-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40">
                            {{ $t('nav.request_demo') }}
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="18"
                                class="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button @click.prevent="scrollTo('waitlist')"
                            class="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/40 bg-white/60 dark:bg-neutral-900/60 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300">
                            {{ $t('nav.speak_expert') }}
                        </button>
                    </div>
                </div>

                <!-- Right: layered list -->
                <div class="space-y-3">
                    <div v-for="(layer, idx) in $tm('solutions.closing_advantage.layers')"
                        :key="idx"
                        class="adv-layer group flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5">

                        <!-- Number/icon tag -->
                        <div class="flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            :class="layerColors[idx]">
                            <HugeiconsIcon :icon="layerIcons[idx]" :size="18" />
                        </div>

                        <div class="min-w-0">
                            <div class="font-bold text-neutral-900 dark:text-white text-sm">
                                {{ $rt(layer.name) }}
                            </div>
                            <div class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                {{ $rt(layer.desc) }}
                            </div>
                        </div>

                        <!-- subtle arrow on hover -->
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="14"
                            class="ml-auto flex-shrink-0 text-neutral-300 dark:text-neutral-700 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
.adv-header,
.adv-layer {
    will-change: transform, opacity;
}
</style>
