<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { Shield01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

gsap.registerPlugin(ScrollTrigger);

const localePath = useLocalePath();
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
</script>

<template>
    <section id="panrisk-teaser" ref="sectionRef"
        class="relative py-20 md:py-28 overflow-hidden bg-neutral-950">

        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]">
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-orange-500/8 rounded-full blur-[120px]">
            </div>
            <div class="absolute top-0 right-0 w-96 h-96 bg-secondary-500/8 rounded-full blur-[100px]">
            </div>
        </div>

        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-5xl mx-auto">
                <div class="rounded-3xl border border-accent-orange-500/20 bg-neutral-900/60 backdrop-blur-md overflow-hidden">

                    <div class="grid md:grid-cols-2 gap-0">
                        <!-- Visual: shield + radiating rings (risk/compliance network motif), mirrors
                             PANIDTeaser's left/right split but swapped so the two teasers don't read
                             as identical twins when stacked on the page -->
                        <div
                            class="relative p-8 md:p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-accent-orange-500/10 bg-gradient-to-br from-accent-orange-500/5 to-transparent order-2 md:order-1">

                            <div class="relative">
                                <div
                                    class="w-48 h-48 rounded-full border-2 border-accent-orange-500/30 flex items-center justify-center relative">
                                    <div
                                        class="absolute inset-3 rounded-full border border-accent-orange-500/20 animate-ping-slow">
                                    </div>
                                    <div class="absolute inset-6 rounded-full border border-accent-orange-500/15">
                                    </div>
                                    <HugeiconsIcon :icon="Shield01Icon" :size="68"
                                        class="text-accent-orange-400 opacity-80" />
                                </div>

                                <div
                                    class="absolute -top-4 -left-6 px-3 py-1.5 rounded-full bg-neutral-800 border border-accent-orange-500/30 text-xs font-bold text-accent-orange-400 whitespace-nowrap shadow-xl">
                                    {{ $t('solutions.panrisk_teaser.tag_sanctions') }}
                                </div>
                                <div
                                    class="absolute -bottom-4 -right-6 px-3 py-1.5 rounded-full bg-neutral-800 border border-secondary-500/30 text-xs font-bold text-secondary-400 whitespace-nowrap shadow-xl">
                                    {{ $t('solutions.panrisk_teaser.tag_sar') }}
                                </div>
                                <div
                                    class="absolute top-1/2 -left-20 -translate-y-1/2 px-3 py-1.5 rounded-full bg-neutral-800 border border-primary-500/30 text-xs font-bold text-primary-400 whitespace-nowrap shadow-xl">
                                    {{ $t('solutions.panrisk_teaser.tag_network') }}
                                </div>
                            </div>
                        </div>

                        <div class="p-8 md:p-10 flex flex-col justify-center order-1 md:order-2">
                            <div
                                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-orange-500/30 bg-accent-orange-500/10 text-accent-orange-400 text-xs font-bold tracking-widest uppercase mb-6 w-fit">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-orange-400 animate-pulse"></span>
                                {{ $t('solutions.panrisk_teaser.eyebrow') }}
                            </div>

                            <h2
                                class="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight leading-none">
                                {{ $t('solutions.panrisk_teaser.title') }}
                            </h2>
                            <p class="text-accent-orange-400 font-semibold text-base md:text-lg mb-6">
                                {{ $t('solutions.panrisk_teaser.subtitle') }}
                            </p>
                            <p class="text-neutral-400 text-sm md:text-base leading-relaxed mb-10">
                                {{ $t('solutions.panrisk_teaser.description') }}
                            </p>

                            <NuxtLink :to="localePath('/solutions/pan-risk')"
                                class="group w-fit flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-neutral-950 bg-accent-orange-400 hover:bg-accent-orange-300 transition-all duration-300 shadow-lg shadow-accent-orange-500/20 hover:shadow-accent-orange-500/40">
                                {{ $t('solutions.panrisk_teaser.cta') }}
                                <HugeiconsIcon :icon="ArrowRight01Icon" :size="18"
                                    class="group-hover:translate-x-1 transition-transform" />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes ping-slow {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(1.05); }
}
.animate-ping-slow {
    animation: ping-slow 3s ease-in-out infinite;
}
</style>
