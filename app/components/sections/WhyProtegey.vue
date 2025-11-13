<script setup>
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { Shield01Icon, ChartDownIcon, ZapIcon } from '@hugeicons/core-free-icons';

if (typeof window !== 'undefined' && !gsap.plugins.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

let st;

onMounted(() => {
    try {
        setTimeout(() => {
            st = ScrollTrigger.create({
                trigger: '.why-protegey-section',
                start: 'top center+=100',
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();

                    tl.from('.section-title', {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out'
                    })
                        .from('.problem-card', {
                            y: 40,
                            opacity: 0,
                            duration: 0.8,
                            ease: 'power3.out'
                        }, '-=0.6')
                        .from('.solution-card', {
                            y: 40,
                            opacity: 0,
                            duration: 0.8,
                            ease: 'power3.out'
                        }, '-=0.6')
                        .from('.diff-card', {
                            y: 40,
                            opacity: 0,
                            duration: 0.8,
                            ease: 'power3.out'
                        }, '-=0.6');
                }
            });
        }, 100);
    } catch (error) {
        console.warn('GSAP animation failed:', error);
    }
});

onUnmounted(() => {
    if (st && st.kill) st.kill();
});
</script>

<template>
    <section class="why-protegey-section snap-start h-screen flex items-center">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div class="max-w-6xl mx-auto w-full">

                <!-- Section Header -->
                <div class="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2
                        class="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                        Why <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-purple-500">Protegey</span>
                    </h2>
                </div>

                <!-- Three Cards Layout -->
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

                    <!-- Problem Card -->
                    <div class="problem-card group sm:col-span-2 lg:col-span-1">
                        <div
                            class="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-700/30 rounded-2xl p-6 sm:p-8 h-full hover:border-red-500/50 transition-all duration-500">
                            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div
                                    class="w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                    <HugeiconsIcon :icon="ChartDownIcon" class="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                                </div>
                                <h3 class="text-lg sm:text-xl font-semibold text-red-400">The Problem</h3>
                            </div>

                            <p class="text-gray-300 leading-relaxed text-base sm:text-lg">
                                Financial fraud in Africa costs billions each year — from mobile money scams to account
                                takeovers. Traditional systems can't keep pace with evolving threats in our unique
                                digital landscape.
                            </p>

                            <!-- Decorative elements -->
                            <div class="mt-6 sm:mt-8 grid grid-cols-4 gap-2 opacity-20">
                                <div class="h-2 bg-red-500 rounded"></div>
                                <div class="h-2 bg-red-400 rounded"></div>
                                <div class="h-2 bg-red-300 rounded"></div>
                                <div class="h-2 bg-red-200 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Solution Card -->
                    <div class="solution-card group">
                        <div
                            class="bg-gradient-to-br from-lime-900/20 to-lime-800/10 border border-lime-700/30 rounded-2xl p-6 sm:p-8 h-full hover:border-lime-400/50 transition-all duration-500">
                            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div
                                    class="w-10 h-10 sm:w-12 sm:h-12 bg-lime-500/20 rounded-xl flex items-center justify-center">
                                    <HugeiconsIcon :icon="Shield01Icon" class="w-5 h-5 sm:w-6 sm:h-6 text-lime-400" />
                                </div>
                                <h3 class="text-lg sm:text-xl font-semibold text-lime-400">Our Solution</h3>
                            </div>

                            <p class="text-gray-300 leading-relaxed text-base sm:text-lg">
                                Protegey brings together machine learning, compliance intelligence, and behavioral
                                analytics to detect fraud before it happens. Real-time protection that scales with your
                                growth.
                            </p>

                            <!-- Decorative elements -->
                            <div class="mt-6 sm:mt-8 flex items-center gap-2">
                                <div class="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
                                <div class="w-3 h-3 bg-lime-400 rounded-full animate-pulse"
                                    style="animation-delay: 0.5s;"></div>
                                <div class="w-3 h-3 bg-lime-400 rounded-full animate-pulse"
                                    style="animation-delay: 1s;"></div>
                                <div class="flex-1 h-px bg-gradient-to-r from-lime-400 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Differentiation Card -->
                    <div class="diff-card group">
                        <div
                            class="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700/30 rounded-2xl p-6 sm:p-8 h-full hover:border-purple-400/50 transition-all duration-500">
                            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div
                                    class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                    <HugeiconsIcon :icon="ZapIcon" class="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                                </div>
                                <h3 class="text-lg sm:text-xl font-semibold text-purple-400">What Makes Us Different
                                </h3>
                            </div>

                            <p class="text-gray-300 leading-relaxed text-base sm:text-lg">
                                Unlike legacy systems, Protegey is built Africa-first — adaptable across telcos, banks,
                                fintechs, and ecommerce platforms. Context-aware protection for our continent's unique
                                financial ecosystem.
                            </p>

                            <!-- Decorative elements -->
                            <div class="mt-6 sm:mt-8 relative">
                                <div
                                    class="w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent">
                                </div>
                                <div
                                    class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom stats/indicators -->
                <div class="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
                    <div class="group cursor-pointer">
                        <div
                            class="text-xl sm:text-2xl lg:text-3xl font-bold text-lime-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                            99.9%</div>
                        <div class="text-gray-400 text-xs sm:text-sm">Accuracy Rate</div>
                    </div>
                    <div class="group cursor-pointer">
                        <div
                            class="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                            &lt;100ms</div>
                        <div class="text-gray-400 text-xs sm:text-sm">Response Time</div>
                    </div>
                    <div class="group cursor-pointer">
                        <div
                            class="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                            24/7</div>
                        <div class="text-gray-400 text-xs sm:text-sm">Monitoring</div>
                    </div>
                    <div class="group cursor-pointer">
                        <div
                            class="text-xl sm:text-2xl lg:text-3xl font-bold text-lime-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                            10M+</div>
                        <div class="text-gray-400 text-xs sm:text-sm">Transactions</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>