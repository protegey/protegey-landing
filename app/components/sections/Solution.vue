<template>
    <section id="solution" ref="solutionSection" class="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto w-full">
                <div class="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
                    <div class="fade-up">
                        <div class="text-blue-600 font-bold mb-3 uppercase tracking-wider text-sm rtl:text-right">{{
                            $t('solution.badge') }}</div>
                        <h2
                            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 rtl:text-right">
                            {{ $t('solution.title_main') }}
                            <span class="text-blue-600">{{ $t('solution.title_highlight') }}</span>
                        </h2>
                        <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed rtl:text-right">
                            {{ $t('solution.description') }}
                        </p>
                        <p
                            :class="[isDark ? 'text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed mb-6 sm:mb-8 rtl:text-right' : 'text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 rtl:text-right']">
                            {{ $t('solution.hero_text') }}
                        </p>
                        <div class="space-y-4 mb-8">
                            <div v-for="(feature, index) in tm('solution.features')" :key="index"
                                class="flex items-start gap-4 rtl:flex-row-reverse">
                                <div
                                    class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg class="w-5 h-5 text-blue-600 rtl:rotate-180" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="rtl:text-right">
                                    <div class="font-semibold text-lg mb-1 text-gray-900">{{ rt(feature.title) }}</div>
                                    <div class="text-gray-600">{{ rt(feature.text) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center lg:justify-end rtl:lg:justify-start">
                        <div class="main-card relative w-full max-w-md">
                            <!-- Main Protection Card -->
                            <div
                                class="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 transform hover:-translate-y-2 transition-all duration-300">
                                <div class="flex items-center justify-between mb-6 rtl:flex-row-reverse">
                                    <div class="flex items-center gap-3 rtl:flex-row-reverse">
                                        <div
                                            class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                                            <HugeiconsIcon :icon="Shield01Icon" class="w-7 h-7 text-white" />
                                        </div>
                                        <div class="rtl:text-right">
                                            <div class="text-blue-600 font-bold text-lg leading-none mb-1">{{
                                                $t('solution.card.title') }}</div>
                                            <div class="text-gray-500 text-sm">{{ $t('solution.card.tagline') }}</div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-1.5 rtl:flex-row-reverse">
                                        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span class="text-green-600 text-sm font-semibold">{{ $t('solution.card.status')
                                            }}</span>
                                    </div>
                                </div>

                                <!-- Protection Stats -->
                                <div class="space-y-4">
                                    <div
                                        class="flex justify-between items-center py-3 border-b border-gray-100 rtl:flex-row-reverse">
                                        <span class="text-gray-600 rtl:text-right">{{ $t('solution.card.stat1_label')
                                            }}</span>
                                        <span class="text-gray-900 font-bold text-lg rtl:text-left">{{
                                            $t('solution.card.stat1_value') }}</span>
                                    </div>
                                    <div
                                        class="flex justify-between items-center py-3 border-b border-gray-100 rtl:flex-row-reverse">
                                        <span class="text-gray-600 rtl:text-right">{{ $t('solution.card.stat2_label')
                                            }}</span>
                                        <span class="text-blue-600 font-bold text-lg rtl:text-left">{{
                                            $t('solution.card.stat2_value') }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-3 rtl:flex-row-reverse">
                                        <span class="text-gray-600 rtl:text-right">{{ $t('solution.card.stat3_label')
                                            }}</span>
                                        <span class="text-lime-600 font-bold text-lg rtl:text-left">{{
                                            $t('solution.card.stat3_value') }}</span>
                                    </div>
                                </div>

                                <!-- Progress Bar -->
                                <div class="mt-6">
                                    <div class="flex justify-between text-sm mb-2 rtl:flex-row-reverse">
                                        <span class="text-gray-600 rtl:text-right">{{
                                            $t('solution.card.protection_level') }}</span>
                                        <span class="text-gray-900 font-semibold rtl:text-left">{{
                                            $t('solution.card.protection_status') }}</span>
                                    </div>
                                    <div class="w-full bg-gray-100 rounded-full h-2.5">
                                        <div class="bg-gradient-to-r from-blue-600 to-lime-400 h-2.5 rounded-full rtl:from-lime-400 rtl:to-blue-600"
                                            style="width: 99.9%"></div>
                                    </div>
                                </div>
                            </div>
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
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out'
                    })
                        .from('.main-card', {
                            scale: 0.9,
                            y: 60,
                            opacity: 0,
                            duration: 1.2,
                            ease: 'power3.out'
                        }, '-=0.4');

                    // Continuous floating animation
                    gsap.to('.main-card', {
                        y: -10,
                        duration: 4,
                        ease: 'power2.inOut',
                        yoyo: true,
                        repeat: -1
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

<style scoped>
@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-5px);
    }
}

.animate-spin-slow {
    animation: spin-slow 8s linear infinite;
}

.animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
}
</style>