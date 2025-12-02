<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { Shield01Icon, ChartDownIcon, ZapIcon } from '@hugeicons/core-free-icons';

defineProps({ isDark: Boolean });

gsap.registerPlugin(ScrollTrigger);

const headerRef = ref(null);
const cardRefs = [ref(null), ref(null), ref(null)];

onMounted(async () => {
    if (typeof window === 'undefined') return;
    await nextTick();
    // Header animation
    if (headerRef.value) {
        gsap.from(headerRef.value, {
            scrollTrigger: {
                trigger: headerRef.value,
                start: 'top 80%',
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        });
    }
    // Cards animation (staggered)
    cardRefs.forEach((cRef, idx) => {
        if (cRef.value) {
            gsap.from(cRef.value, {
                scrollTrigger: {
                    trigger: cRef.value,
                    start: 'top 85%',
                },
                y: 20,
                opacity: 0,
                duration: 0.8 + 0.1 * idx,
                ease: 'power3.out',
                delay: 0.1 * idx,
            });
        }
    });
});
</script>

<template>
    <section id="whyprotegey" class="why-protegey-section relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto w-full">
                <!-- Section Header -->
                <div ref="headerRef" class="why-header text-center mb-12 md:mb-16 lg:mb-20">
                    <div class="text-blue-600 font-bold mb-3 uppercase tracking-wider text-sm">Why Security & Risk teams choose US</div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-stretch">
                    <!-- Cards -->
                    <div ref="cardRefs[0]" class="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col shadow hover:shadow-xl transition-all duration-300">
                        <div class="text-4xl font-bold text-blue-600 mb-3">67% Faster Threat Response</div>
                        <div class="text-gray-700 text-base md:text-lg leading-relaxed">
                            Our clients detect and neutralize threats 67% faster than industry average in the region, significantly reducing potential damage from security incidents and minimizing business disruption.
                        </div>
                    </div>
                    <div ref="cardRefs[1]" class="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col shadow hover:shadow-xl transition-all duration-300">
                        <div class="text-4xl font-bold text-blue-600 mb-3">40% Cost Reduction</div>
                        <div class="text-gray-700 text-base md:text-lg leading-relaxed">
                            Companies switching to PROTEGEY save an average of 40% compared to building and maintaining an in-house security/risk team, without sacrificing protection quality or coverage.
                        </div>
                    </div>
                    <div ref="cardRefs[2]" class="bg-white border border-blue-100 rounded-2xl p-8 flex flex-col shadow hover:shadow-xl transition-all duration-300">
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