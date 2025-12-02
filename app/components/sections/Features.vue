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
    <!-- Gradient band background like the attachment -->
    <section id="features" class="features-modern relative py-20 md:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <!-- Inner rounded panel -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-7xl">
                <div class="relative rounded-3xl bg-white/95 shadow-xl border border-white/60 backdrop-blur-sm px-6 sm:px-10 md:px-14 py-12 md:py-16">
                    <!-- subtle grid overlay inside the panel -->
                    <div class="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.08]" aria-hidden="true"
                         style="background-image:
                            linear-gradient(rgba(0,0,0,.12) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,.12) 1px, transparent 1px);
                            background-size: 36px 36px;">
                    </div>

                    <!-- Header -->
                    <div class="relative text-center max-w-3xl mx-auto mb-10 md:mb-14">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 ring-1 ring-gray-200">Features</span>
                        <h2 class="features-title mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                            Unleash the Power: Features That
                            <span class="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600">Transcend the Ordinary!</span>
                        </h2>
                        <p class="features-subtitle mt-4 text-sm sm:text-base text-gray-600">
                            Unveiling the finest arsenal: power‑packed capabilities that elevate your financial protection to new heights.
                        </p>
                    </div>

                    <!-- Features Grid -->
                    <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        <div v-for="(feature, index) in features" :key="index" class="feature-card">
                            <div class="h-full rounded-2xl border border-gray-200 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow p-6 md:p-7">
                                <div class="flex items-start gap-4">
                                    <!-- Icon in subtle square -->
                                    <div class="shrink-0 w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-700">
                                        <HugeiconsIcon :icon="feature.icon" :size="18" />
                                    </div>
                                    <div>
                                        <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-1">{{ feature.title }}</h3>
                                        <p class="text-sm text-gray-600 leading-relaxed">{{ feature.description }}</p>
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