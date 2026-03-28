<template>
    <section id="solution" ref="solutionSection" class="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">

        <!-- Background glows -->
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
            <div class="absolute top-1/4 left-0 w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]"></div>
        </div>

        <div class="px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-7xl mx-auto w-full">
                <div class="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">

                    <!-- Left: Text content -->
                    <div class="fade-up">
                        <div class="inline-flex items-center gap-2 text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4 rtl:text-right">
                            <span class="w-6 h-px bg-primary-500"></span>
                            {{ $t('solution.badge') }}
                        </div>
                        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-neutral-900 dark:text-white rtl:text-right">
                            {{ $t('solution.title_main') }}
                            <span class="text-primary-400">{{ $t('solution.title_highlight') }}</span>
                        </h2>
                        <p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed rtl:text-right">
                            {{ $t('solution.description') }}
                        </p>
                        <p class="text-sm sm:text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 rtl:text-right">
                            {{ $t('solution.hero_text') }}
                        </p>

                        <div class="space-y-4 mb-8">
                            <div v-for="(feature, index) in tm('solution.features')" :key="index"
                                class="flex items-start gap-4 rtl:flex-row-reverse">
                                <div class="w-8 h-8 bg-primary-500/10 border border-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg class="w-4 h-4 text-primary-400 rtl:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="rtl:text-right">
                                    <div class="font-semibold text-base mb-0.5 text-neutral-900 dark:text-white">{{ rt(feature.title) }}</div>
                                    <div class="text-sm text-neutral-500 dark:text-neutral-400">{{ rt(feature.text) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Protection card -->
                    <div class="flex justify-center lg:justify-end rtl:lg:justify-start">
                        <div class="main-card relative w-full max-w-md">
                            <div class="relative bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-2xl shadow-neutral-200 dark:shadow-neutral-900 hover:-translate-y-2 transition-all duration-300">

                                <!-- Card glow -->
                                <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 pointer-events-none"></div>

                                <!-- Card header -->
                                <div class="relative flex items-center justify-between mb-6 rtl:flex-row-reverse">
                                    <div class="flex items-center gap-3 rtl:flex-row-reverse">
                                        <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                                            <HugeiconsIcon :icon="Shield01Icon" class="w-6 h-6 text-white" />
                                        </div>
                                        <div class="rtl:text-right">
                                            <div class="text-primary-400 font-bold text-lg leading-none mb-0.5">
                                                {{ $t('solution.card.title') }}
                                            </div>
                                            <div class="text-neutral-400 dark:text-neutral-500 text-sm">{{ $t('solution.card.tagline') }}</div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-1.5 rtl:flex-row-reverse">
                                        <div class="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                                        <span class="text-primary-400 text-sm font-semibold">{{ $t('solution.card.status') }}</span>
                                    </div>
                                </div>

                                <!-- Protection stats -->
                                <div class="relative space-y-1">
                                    <div class="flex justify-between items-center py-3 border-b border-neutral-200 dark:border-neutral-800 rtl:flex-row-reverse">
                                        <span class="text-neutral-500 dark:text-neutral-400 text-sm rtl:text-right">{{ $t('solution.card.stat1_label') }}</span>
                                        <span class="text-neutral-900 dark:text-white font-bold text-lg rtl:text-left">{{ $t('solution.card.stat1_value') }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-3 border-b border-neutral-200 dark:border-neutral-800 rtl:flex-row-reverse">
                                        <span class="text-neutral-500 dark:text-neutral-400 text-sm rtl:text-right">{{ $t('solution.card.stat2_label') }}</span>
                                        <span class="text-secondary-400 font-bold text-lg rtl:text-left">{{ $t('solution.card.stat2_value') }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-3 rtl:flex-row-reverse">
                                        <span class="text-neutral-500 dark:text-neutral-400 text-sm rtl:text-right">{{ $t('solution.card.stat3_label') }}</span>
                                        <span class="text-primary-400 font-bold text-lg rtl:text-left">{{ $t('solution.card.stat3_value') }}</span>
                                    </div>
                                </div>

                                <!-- Progress bar -->
                                <div class="relative mt-6">
                                    <div class="flex justify-between text-sm mb-2 rtl:flex-row-reverse">
                                        <span class="text-neutral-500 dark:text-neutral-400 rtl:text-right">{{ $t('solution.card.protection_level') }}</span>
                                        <span class="text-neutral-900 dark:text-white font-semibold rtl:text-left">{{ $t('solution.card.protection_status') }}</span>
                                    </div>
                                    <div class="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2">
                                        <div class="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full rtl:from-secondary-500 rtl:to-primary-500"
                                            style="width: 99.9%"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Decorative glow behind card -->
                            <div class="absolute -top-8 -right-8 w-32 h-32 bg-primary-500/15 rounded-full blur-2xl -z-10"></div>
                            <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-500/15 rounded-full blur-2xl -z-10"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { Shield01Icon } from '@hugeicons/core-free-icons';

if (typeof window !== 'undefined' && !gsap.plugins.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

defineProps({ isDark: Boolean });

const solutionSection = ref(null);
let st;

onMounted(() => {
    try {
        setTimeout(() => {
            st = ScrollTrigger.create({
                trigger: solutionSection.value,
                start: 'top center+=100',
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();
                    tl.from('.fade-up', {
                        y: 50, opacity: 0, duration: 1, ease: 'power3.out'
                    })
                    .from('.main-card', {
                        scale: 0.9, y: 60, opacity: 0, duration: 1.2, ease: 'power3.out'
                    }, '-=0.4');

                    gsap.to('.main-card', {
                        y: -10, duration: 4, ease: 'power2.inOut', yoyo: true, repeat: -1
                    });
                }
            });
        }, 100);
    } catch (error) {
        console.warn('GSAP animation failed:', error);
    }
});

onUnmounted(() => {
    if (st && st.kill) st.kill();
    gsap.killTweensOf('.main-card');
});
</script>
