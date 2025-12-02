<script setup>
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { Shield01Icon, ChartDownIcon, ZapIcon } from '@hugeicons/core-free-icons';

defineProps({ isDark: Boolean });

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
    <section id="whyprotegey" class="why-protegey-section relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto w-full">
                <!-- Section Header -->
                <div class="text-center mb-12 md:mb-16 lg:mb-20">
                    <div class="text-blue-600 font-bold mb-3 uppercase tracking-wider text-sm">Why Security & Risk teams choose US</div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-stretch">
                    <!-- 67% Faster Threat Response -->
                    <div class="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col shadow hover:shadow-xl transition-all duration-300">
                        <div class="text-4xl font-bold text-blue-600 mb-3">67% Faster Threat Response</div>
                        <div class="text-gray-700 text-base md:text-lg leading-relaxed">
                            Our clients detect and neutralize threats 67% faster than industry average in the region, significantly reducing potential damage from security incidents and minimizing business disruption.
                        </div>
                    </div>
                    <!-- 40% Cost Reduction -->
                    <div class="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col shadow hover:shadow-xl transition-all duration-300">
                        <div class="text-4xl font-bold text-blue-600 mb-3">40% Cost Reduction</div>
                        <div class="text-gray-700 text-base md:text-lg leading-relaxed">
                            Companies switching to PROTEGEY save an average of 40% compared to building and maintaining an in-house security/risk team, without sacrificing protection quality or coverage.
                        </div>
                    </div>
                    <!-- 99.7% Uptime Guaranteed -->
                    <div class="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col shadow hover:shadow-xl transition-all duration-300">
                        <div class="text-4xl font-bold text-blue-600 mb-3">99.7% Uptime Guaranteed</div>
                        <div class="text-gray-700 text-base md:text-lg leading-relaxed">
                            Our platform maintains 99.7% uptime with redundant systems across multiple data centers, ensuring your security coverage never sleeps, even when you do.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>