<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { FingerPrintIcon, ArrowRight01Icon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);

onMounted(() => {
    if (typeof window === 'undefined' || !sectionRef.value) return;
    gsap.fromTo(sectionRef.value,
        { y: 30, opacity: 0 },
        {
            scrollTrigger: { trigger: sectionRef.value, start: 'top 85%' },
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        }
    );
});

const scrollTo = (selector) => {
    const el = document.getElementById(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<template>
    <section id="panid-teaser" ref="sectionRef"
        class="relative py-16 md:py-20 overflow-hidden bg-neutral-950">

        <!-- Animated grid bg -->
        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]">
            </div>
            <!-- Glows -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan-500/8 rounded-full blur-[120px]">
            </div>
            <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/8 rounded-full blur-[100px]">
            </div>
        </div>

        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-5xl mx-auto">
                <div class="rounded-3xl border border-accent-cyan-500/20 bg-neutral-900/60 backdrop-blur-md overflow-hidden">

                    <div class="grid md:grid-cols-2 gap-0">
                        <!-- Left: Content -->
                        <div class="p-8 md:p-10 flex flex-col justify-center">
                            <!-- Eyebrow -->
                            <div
                                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-cyan-500/30 bg-accent-cyan-500/10 text-accent-cyan-400 text-xs font-bold tracking-widest uppercase mb-6 w-fit">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-cyan-400 animate-pulse"></span>
                                {{ $t('solutions.panid_teaser.eyebrow') }}
                            </div>

                            <!-- Title -->
                            <h2
                                class="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight leading-none">
                                {{ $t('solutions.panid_teaser.title') }}
                            </h2>
                            <p class="text-accent-cyan-400 font-semibold text-base md:text-lg mb-6">
                                {{ $t('solutions.panid_teaser.subtitle') }}
                            </p>
                            <p class="text-neutral-400 text-sm md:text-base leading-relaxed mb-10">
                                {{ $t('solutions.panid_teaser.description') }}
                            </p>

                            <!-- CTA -->
                            <button @click.prevent="scrollTo('waitlist')"
                                class="group w-fit flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-neutral-950 bg-accent-cyan-400 hover:bg-accent-cyan-300 transition-all duration-300 shadow-lg shadow-accent-cyan-500/20 hover:shadow-accent-cyan-500/40">
                                {{ $t('solutions.panid_teaser.cta') }}
                                <HugeiconsIcon :icon="ArrowRight01Icon" :size="18"
                                    class="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <!-- Right: Visual -->
                        <div
                            class="relative p-8 md:p-10 flex items-center justify-center border-t md:border-t-0 md:border-l border-accent-cyan-500/10 bg-gradient-to-br from-accent-cyan-500/5 to-transparent">

                            <!-- Fingerprint visual -->
                            <div class="relative">
                                <div
                                    class="w-48 h-48 rounded-full border-2 border-accent-cyan-500/30 flex items-center justify-center relative">
                                    <div
                                        class="absolute inset-3 rounded-full border border-accent-cyan-500/20 animate-pulse">
                                    </div>
                                    <div class="absolute inset-6 rounded-full border border-accent-cyan-500/15">
                                    </div>
                                    <HugeiconsIcon :icon="FingerPrintIcon" :size="72"
                                        class="text-accent-cyan-400 opacity-80" />
                                    <!-- Scan line -->
                                    <div
                                        class="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                                        <div
                                            class="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-cyan-400/60 to-transparent animate-scan">
                                        </div>
                                    </div>
                                </div>

                                <!-- Floating tags -->
                                <div
                                    class="absolute -top-4 -right-6 px-3 py-1.5 rounded-full bg-neutral-800 border border-accent-cyan-500/30 text-xs font-bold text-accent-cyan-400 whitespace-nowrap shadow-xl">
                                    {{ $t('solutions.panid_teaser.tag_ekyc') }}
                                </div>
                                <div
                                    class="absolute -bottom-4 -left-6 px-3 py-1.5 rounded-full bg-neutral-800 border border-primary-500/30 text-xs font-bold text-primary-400 whitespace-nowrap shadow-xl">
                                    {{ $t('solutions.panid_teaser.tag_kyb') }}
                                </div>
                                <div
                                    class="absolute top-1/2 -right-16 -translate-y-1/2 px-3 py-1.5 rounded-full bg-neutral-800 border border-secondary-500/30 text-xs font-bold text-secondary-400 whitespace-nowrap shadow-xl">
                                    {{ $t('solutions.panid_teaser.tag_pan_african') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes scan {
    0% { top: 10%; }
    50% { top: 90%; }
    100% { top: 10%; }
}
.animate-scan {
    animation: scan 3s ease-in-out infinite;
}
</style>
