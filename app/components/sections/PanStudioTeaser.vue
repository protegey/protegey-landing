<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { Settings01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

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
    <section id="panstudio-teaser" ref="sectionRef"
        class="relative py-20 md:py-28 overflow-hidden bg-neutral-950">

        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]">
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/8 rounded-full blur-[120px]">
            </div>
            <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500/8 rounded-full blur-[100px]">
            </div>
        </div>

        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-5xl mx-auto">
                <div class="rounded-3xl border border-secondary-500/20 bg-neutral-900/60 backdrop-blur-md overflow-hidden">

                    <div class="grid md:grid-cols-2 gap-0">
                        <div class="p-8 md:p-10 flex flex-col justify-center">
                            <div
                                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary-500/30 bg-secondary-500/10 text-secondary-400 text-xs font-bold tracking-widest uppercase mb-6 w-fit">
                                <span class="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse"></span>
                                {{ $t('solutions.panstudio_teaser.eyebrow') }}
                            </div>

                            <h2
                                class="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight leading-none">
                                {{ $t('solutions.panstudio_teaser.title') }}
                            </h2>
                            <p class="text-secondary-400 font-semibold text-base md:text-lg mb-6">
                                {{ $t('solutions.panstudio_teaser.subtitle') }}
                            </p>
                            <p class="text-neutral-400 text-sm md:text-base leading-relaxed mb-10">
                                {{ $t('solutions.panstudio_teaser.description') }}
                            </p>

                            <NuxtLink :to="localePath('/solutions/pan-studio')"
                                class="group w-fit flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-neutral-950 bg-secondary-400 hover:bg-secondary-300 transition-all duration-300 shadow-lg shadow-secondary-500/20 hover:shadow-secondary-500/40">
                                {{ $t('solutions.panstudio_teaser.cta') }}
                                <HugeiconsIcon :icon="ArrowRight01Icon" :size="18"
                                    class="group-hover:translate-x-1 transition-transform" />
                            </NuxtLink>
                        </div>

                        <!-- Visual: configurable "sliders" motif, distinct from Pan-ID's scan ring and
                             Pan-Risk's shield — reads as "you turn these dials yourself" at a glance -->
                        <div
                            class="relative p-8 md:p-10 flex items-center justify-center border-t md:border-t-0 md:border-l border-secondary-500/10 bg-gradient-to-br from-secondary-500/5 to-transparent">

                            <div class="relative w-56">
                                <div class="rounded-2xl border border-secondary-500/25 bg-neutral-900/80 p-6 shadow-xl">
                                    <div class="flex items-center gap-2 mb-5">
                                        <HugeiconsIcon :icon="Settings01Icon" :size="18" class="text-secondary-400" />
                                        <span class="text-xs font-bold tracking-widest uppercase text-secondary-400">{{ $t('solutions.panstudio_teaser.tag_rules') }}</span>
                                    </div>
                                    <div class="space-y-4">
                                        <div v-for="(w, i) in ['72%', '45%', '88%']" :key="i" class="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                                            <div class="h-full rounded-full bg-secondary-400/70 animate-slider" :style="{ '--target-w': w, animationDelay: `${i * 0.3}s` }"></div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="absolute -top-4 -right-6 px-3 py-1.5 rounded-full bg-neutral-800 border border-primary-500/30 text-xs font-bold text-primary-400 whitespace-nowrap shadow-xl">
                                    {{ $t('solutions.panstudio_teaser.tag_ai') }}
                                </div>
                                <div
                                    class="absolute -bottom-4 -left-6 px-3 py-1.5 rounded-full bg-neutral-800 border border-accent-orange-500/30 text-xs font-bold text-accent-orange-400 whitespace-nowrap shadow-xl">
                                    {{ $t('solutions.panstudio_teaser.tag_sandbox') }}
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
@keyframes slider {
    0% { width: 0%; }
    100% { width: var(--target-w); }
}
.animate-slider {
    width: 0%;
    animation: slider 1.2s ease-out forwards;
}
</style>
