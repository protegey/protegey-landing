<template>
    <section id="solution" ref="solutionSection" class="snap-start min-h-screen h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-300">
        <BackgroundGradientAnimation
            :gradient-background-start="isDark ? 'rgb(0, 0, 0)' : 'rgb(249, 250, 251)'"
            :gradient-background-end="isDark ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)'"
            first-color="163, 230, 53"
            second-color="168, 85, 247"
            third-color="96, 165, 250"
            fourth-color="163, 230, 53"
            fifth-color="168, 85, 247"
            pointer-color="163, 230, 53"
            size="80%"
            blending-value="hard-light"
            :interactive="true"
            container-class-name="absolute inset-0"
            class-name="relative z-10 h-full w-full"
        >
            <div class="px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 h-full flex items-center relative z-20">
                <div class="max-w-7xl mx-auto w-full">
                    <div class="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
                <div class="fade-up">
                    <div
                        :class="[isDark ? 'text-lime-400' : 'text-lime-600', 'font-bold mb-3 sm:mb-4 uppercase tracking-wider text-xs sm:text-sm']">
                        The Solution</div>
                    <h2
                        :class="[isDark ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-slate-900']">
                        Protect What<br />Matters Most
                    </h2>
                    <p
                        :class="[isDark ? 'text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed' : 'text-base sm:text-lg md:text-xl text-slate-700 mb-6 sm:mb-8 leading-relaxed']">
                        Centry's advanced fraud detection technology safeguards Africa's financial ecosystem in
                        real-time.
                    </p>
                    <p
                        :class="[isDark ? 'text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed mb-6 sm:mb-8' : 'text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8']">
                        Next-Generation Fraud Prevention — Built with ML and real-time analytics, Centry seamlessly
                        integrates with telecoms, banks, and fintech APIs to protect millions of transactions.
                    </p>
                    <div class="space-y-3 sm:space-y-4">
                        <div class="flex items-start gap-3 sm:gap-4">
                            <div
                                :class="[isDark ? 'bg-lime-400/20' : 'bg-lime-100', 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1']">
                                <svg :class="[isDark ? 'text-lime-400' : 'text-lime-600', 'w-4 h-4 sm:w-5 sm:h-5']"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div
                                    :class="[isDark ? 'font-semibold text-base sm:text-lg mb-0.5 sm:mb-1' : 'font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 text-slate-900']">
                                    Machine Learning Detection</div>
                                <div :class="[isDark ? 'text-slate-400 text-sm sm:text-base' : 'text-slate-600 text-sm sm:text-base']">AI-powered pattern
                                    recognition identifies fraud in milliseconds</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 sm:gap-4">
                            <div
                                :class="[isDark ? 'bg-lime-400/20' : 'bg-lime-100', 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1']">
                                <svg :class="[isDark ? 'text-lime-400' : 'text-lime-600', 'w-4 h-4 sm:w-5 sm:h-5']"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div
                                    :class="[isDark ? 'font-semibold text-base sm:text-lg mb-0.5 sm:mb-1' : 'font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 text-slate-900']">
                                    Real-Time Integration</div>
                                <div :class="[isDark ? 'text-slate-400 text-sm sm:text-base' : 'text-slate-600 text-sm sm:text-base']">Seamless API connections
                                    with existing infrastructure</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 sm:gap-4">
                            <div
                                :class="[isDark ? 'bg-lime-400/20' : 'bg-lime-100', 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1']">
                                <svg :class="[isDark ? 'text-lime-400' : 'text-lime-600', 'w-4 h-4 sm:w-5 sm:h-5']"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div
                                    :class="[isDark ? 'font-semibold text-base sm:text-lg mb-0.5 sm:mb-1' : 'font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 text-slate-900']">
                                    Africa-First Design</div>
                                <div :class="[isDark ? 'text-slate-400 text-sm sm:text-base' : 'text-slate-600 text-sm sm:text-base']">Built for the unique
                                    challenges of African financial systems</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center">
                    <div class="main-card relative">
                        <!-- Main Protection Card -->
                        <div
                            class="relative w-96 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">

                            <!-- Card Header -->
                            <div class="p-8">
                                <div class="flex items-center justify-between mb-6">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center">
                                            <HugeiconsIcon :icon="Shield01Icon" class="w-6 h-6 text-black" />
                                        </div>
                                        <div>
                                            <div class="text-lime-400 font-bold text-lg">CENTRY SHIELD</div>
                                            <div class="text-gray-400 text-sm">Real-time Protection</div>
                                        </div>
                                    </div>
                                    <div class="text-lime-400 text-sm font-semibold animate-pulse">● ACTIVE</div>
                                </div>

                                <!-- Protection Stats -->
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-400 text-sm">Threats Blocked Today</span>
                                        <span class="text-white font-bold">2,847</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-400 text-sm">Response Time</span>
                                        <span class="text-lime-400 font-bold">&lt;50ms</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-400 text-sm">Risk Score</span>
                                        <span class="text-purple-400 font-bold">99.9% Safe</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Animated Background Pattern -->
                            <div
                                class="absolute inset-0 bg-gradient-to-tr from-transparent via-lime-400/5 to-purple-500/10">
                            </div>

                            <!-- Flowing Data Points -->
                            <div class="absolute bottom-4 left-8 right-8">
                                <div class="flex justify-between">
                                    <div class="w-2 h-2 bg-lime-400 rounded-full animate-ping"></div>
                                    <div class="w-2 h-2 bg-purple-400 rounded-full animate-ping"
                                        style="animation-delay: 0.5s;"></div>
                                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-ping"
                                        style="animation-delay: 1s;"></div>
                                    <div class="w-2 h-2 bg-lime-400 rounded-full animate-ping"
                                        style="animation-delay: 1.5s;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Elements Around Card -->
                        <div class="absolute -inset-8">
                            <!-- Data flow indicators -->
                            <div class="absolute top-4 -right-4 w-3 h-3 bg-lime-400 rounded-full animate-pulse">
                            </div>
                            <div class="absolute top-12 -right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                                style="animation-delay: 0.7s;"></div>
                            <div class="absolute bottom-12 -left-6 w-4 h-4 bg-blue-400 rounded-full animate-pulse"
                                style="animation-delay: 1.4s;"></div>
                            <div class="absolute bottom-4 -left-2 w-2 h-2 bg-lime-300 rounded-full animate-pulse"
                                style="animation-delay: 2.1s;"></div>

                            <!-- Geometric shapes -->
                            <div
                                class="absolute top-8 -left-4 w-3 h-3 bg-purple-500 rotate-45 animate-spin-slow opacity-70">
                            </div>
                            <div
                                class="absolute bottom-8 -right-6 w-4 h-4 bg-lime-400 rotate-45 animate-bounce-slow opacity-80">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>
        </BackgroundGradientAnimation>
    </section>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { Shield01Icon } from '@hugeicons/core-free-icons';
import BackgroundGradientAnimation from '~/components/ui/BackgroundGradientAnimation.vue';

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