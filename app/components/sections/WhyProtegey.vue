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
    <section id="why-protegey" class="why-protegey-section relative py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-950">
        <!-- Background Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                <div class="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl"></div>
            </div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-6xl mx-auto w-full">
                <!-- Section Header -->
                <div ref="headerRef" class="why-header text-center mb-12 md:mb-16 lg:mb-20">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-mono tracking-wide mb-4">
                        <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        {{ $t('why_protegey.badge') }}
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 rtl:text-center">{{
                        $t('why_protegey.title') }}</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                    <!-- Cards -->
                    <div ref="cardRefs[0]"
                        class="group bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col shadow-lg hover:shadow-primary-500/10 hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        </div>
                        <div class="relative z-10">
                            <div
                                class="mb-6 inline-flex p-3 rounded-lg bg-neutral-800 text-primary-400 group-hover:text-primary-300 group-hover:scale-110 transition-all duration-300">
                                <HugeiconsIcon :icon="ZapIcon" :size="32" />
                            </div>
                            <div class="text-4xl font-bold text-white mb-3 font-mono rtl:text-right">{{
                                $t('why_protegey.card1.value') }} <span class="text-primary-400 text-lg font-normal">{{
                                    $t('why_protegey.card1.title')
                                    }}</span></div>
                            <div class="text-neutral-400 text-base md:text-lg leading-relaxed rtl:text-right">
                                {{ $t('why_protegey.card1.text') }}
                            </div>
                        </div>
                    </div>

                    <div ref="cardRefs[1]"
                        class="group bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col shadow-lg hover:shadow-secondary-500/10 hover:border-secondary-500/30 transition-all duration-300 relative overflow-hidden">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-secondary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        </div>
                        <div class="relative z-10">
                            <div
                                class="mb-6 inline-flex p-3 rounded-lg bg-neutral-800 text-secondary-400 group-hover:text-secondary-300 group-hover:scale-110 transition-all duration-300">
                                <HugeiconsIcon :icon="ChartDownIcon" :size="32" />
                            </div>
                            <div class="text-4xl font-bold text-white mb-3 font-mono rtl:text-right">{{
                                $t('why_protegey.card2.value') }} <span
                                    class="text-secondary-400 text-lg font-normal">{{ $t('why_protegey.card2.title')
                                    }}</span></div>
                            <div class="text-neutral-400 text-base md:text-lg leading-relaxed rtl:text-right">
                                {{ $t('why_protegey.card2.text') }}
                            </div>
                        </div>
                    </div>

                    <div ref="cardRefs[2]"
                        class="group bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        </div>
                        <div class="relative z-10">
                            <div
                                class="mb-6 inline-flex p-3 rounded-lg bg-neutral-800 text-emerald-400 group-hover:text-emerald-300 group-hover:scale-110 transition-all duration-300">
                                <HugeiconsIcon :icon="Shield01Icon" :size="32" />
                            </div>
                            <div class="text-4xl font-bold text-white mb-3 font-mono rtl:text-right">{{
                                $t('why_protegey.card3.value') }} <span class="text-emerald-400 text-lg font-normal">{{
                                    $t('why_protegey.card3.title')
                                    }}</span></div>
                            <div class="text-neutral-400 text-base md:text-lg leading-relaxed rtl:text-right">
                                {{ $t('why_protegey.card3.text') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.why-header,
.group {
    will-change: transform, opacity;
}
</style>