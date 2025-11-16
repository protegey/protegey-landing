<script setup>
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import {
    Shield01Icon,
    ChartHistogramIcon,
    FileValidationIcon,
    Activity01Icon,
    Notification02Icon,
    Settings01Icon
} from '@hugeicons/core-free-icons';

defineProps({ isDark: Boolean });

if (typeof window !== 'undefined' && !gsap.plugins.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

let st;

const features = [
    {
        icon: Shield01Icon,
        title: 'Fraud Detection & Scoring',
        description: 'Advanced ML algorithms that analyze transaction patterns and provide real-time risk scores with 99.9% accuracy.',
        color: 'lime'
    },
    {
        icon: ChartHistogramIcon,
        title: 'Behavioral Analytics',
        description: 'Deep insights into user behavior patterns to identify anomalies and prevent sophisticated fraud attempts.',
        color: 'purple'
    },
    {
        icon: FileValidationIcon,
        title: 'Compliance & AML Tools',
        description: 'Comprehensive anti-money laundering features with automated reporting and regulatory compliance.',
        color: 'blue'
    },
    {
        icon: Activity01Icon,
        title: 'Transaction Monitoring',
        description: 'Real-time surveillance of all financial transactions with intelligent alerting and response systems.',
        color: 'lime'
    },
    {
        icon: Notification02Icon,
        title: 'Real-time Alerts & Case Management',
        description: 'Instant notifications and comprehensive case management tools for fraud investigation teams.',
        color: 'purple'
    },
    {
        icon: Settings01Icon,
        title: 'API Integration',
        description: 'Seamless integration with existing systems through robust APIs and webhook support.',
        color: 'blue'
    }
];

onMounted(() => {
    try {
        setTimeout(() => {
            st = ScrollTrigger.create({
                trigger: '.features-modern',
                start: 'top center+=100',
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();

                    tl.from('.features-title', {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out'
                    })
                        .from('.features-subtitle', {
                            y: 30,
                            opacity: 0,
                            duration: 0.8,
                            ease: 'power3.out'
                        }, '-=0.6')
                        .from('.feature-card', {
                            y: 40,
                            opacity: 0,
                            duration: 0.8,
                            stagger: 0.15,
                            ease: 'power3.out'
                        }, '-=0.4');
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
    <section class="features-modern min-h-screen relative">
        <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full py-12 sm:py-16 md:py-20 lg:py-24">
            <div class="max-w-6xl mx-auto w-full">

            <!-- Header -->
            <div class="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                    <h2 :class="['features-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6', isDark ? 'text-white' : 'text-gray-900']">
                        Features / <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-purple-500">Products</span>
                    </h2>
                    <p :class="['features-subtitle text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed', isDark ? 'text-gray-300' : 'text-gray-600']">
                        Comprehensive fraud prevention tools designed for Africa's diverse financial ecosystem.
                    </p>
                </div>

                <!-- Features Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    <div v-for="(feature, index) in features" :key="index" class="feature-card group">
                        <div class="relative h-full p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl border transition-all duration-500 hover:-translate-y-2"
                            :class="{
                                'bg-gradient-to-br from-lime-900/20 to-lime-800/10 border-lime-700/30 hover:border-lime-400/60': feature.color === 'lime',
                                'bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-700/30 hover:border-purple-400/60': feature.color === 'purple',
                                'bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-700/30 hover:border-blue-400/60': feature.color === 'blue'
                            }">

                            <!-- Icon -->
                            <div class="mb-3 sm:mb-4 md:mb-6">
                                <div class="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center" :class="{
                                    'bg-lime-500/20': feature.color === 'lime',
                                    'bg-purple-500/20': feature.color === 'purple',
                                    'bg-blue-500/20': feature.color === 'blue'
                                }">
                                    <HugeiconsIcon :icon="feature.icon" :size="24" class="sm:w-6 sm:h-6 md:w-7 md:h-7" :class="{
                                        'text-lime-400': feature.color === 'lime',
                                        'text-purple-400': feature.color === 'purple',
                                        'text-blue-400': feature.color === 'blue'
                                    }" />
                                </div>
                            </div>

                            <!-- Content -->
                            <h3 :class="['text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 group-hover:text-lime-400 transition-colors', isDark ? 'text-white' : 'text-gray-900']">
                                {{ feature.title }}
                            </h3>

                            <p :class="['leading-relaxed text-xs sm:text-sm md:text-base', isDark ? 'text-gray-300' : 'text-gray-600']">
                                {{ feature.description }}
                            </p>

                            <!-- Decorative Element -->
                            <div class="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <HugeiconsIcon :icon="feature.icon" :size="48" class="sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
                            </div>

                            <!-- Hover Effect Background -->
                            <div class="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                :class="{
                                    'bg-gradient-to-br from-lime-400/5 to-transparent': feature.color === 'lime',
                                    'bg-gradient-to-br from-purple-400/5 to-transparent': feature.color === 'purple',
                                    'bg-gradient-to-br from-blue-400/5 to-transparent': feature.color === 'blue'
                                }">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom CTA -->
                <div class="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 pb-4 sm:pb-6 md:pb-8">
                    <button
                        class="bg-gradient-to-r from-lime-400 to-purple-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg hover:shadow-lg hover:shadow-lime-400/25 transition-all duration-300">
                        Explore All Features
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>