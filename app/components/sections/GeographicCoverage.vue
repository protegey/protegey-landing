<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlobalIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';

const containerRef = ref(null);
const { tm, rt } = useI18n();

onMounted(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.value) {
        gsap.from(containerRef.value.querySelector('.geo-content'), {
            scrollTrigger: {
                trigger: containerRef.value,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        const cards = containerRef.value.querySelectorAll('.region-card');
        gsap.from(cards, {
            scrollTrigger: {
                trigger: containerRef.value,
                start: 'top 70%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }
});
</script>

<template>
    <section ref="containerRef" id="coverage"
        class="relative py-24 bg-neutral-950 overflow-hidden border-t border-neutral-900">
        <!-- Background Decor -->
        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2">
            </div>
            <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]">
            </div>
        </div>

        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-7xl mx-auto">
                <div class="geo-content text-center mb-20">
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold tracking-widest uppercase mb-6">
                        <HugeiconsIcon :icon="GlobalIcon" :size="16" />
                        {{ $t('products.geographic_coverage.title') }}
                    </div>
                    <h2 class="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight capitalize leading-tight">
                        Securing the <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary-400">African
                            Digital Economy</span>
                    </h2>
                    <p class="text-neutral-400 text-xl max-w-3xl mx-auto leading-relaxed">
                        {{ $t('products.geographic_coverage.description') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="(region, index) in tm('products.geographic_coverage.regions')" :key="index"
                        class="region-card p-10 rounded-[2.5rem] bg-neutral-900/40 border border-neutral-800 hover:border-cyan-500/30 transition-all duration-500 group">
                        <div class="flex items-center gap-4 mb-6">
                            <div
                                class="w-1.5 h-12 bg-cyan-500 rounded-full group-hover:scale-y-110 transition-transform">
                            </div>
                            <h3 class="text-2xl font-bold text-white transition-colors group-hover:text-cyan-400">
                                {{ rt(region) }}
                            </h3>
                        </div>
                        <p class="text-neutral-400 leading-relaxed font-light">
                            Comprehensive fraud intelligence and regulatory compliance tailored for institutions in this
                            zone.
                        </p>
                    </div>
                </div>

                <div
                    class="mt-16 p-8 rounded-[2rem] bg-neutral-900/20 border border-neutral-800/50 backdrop-blur-sm text-center">
                    <p class="text-neutral-500 italic text-lg">
                        {{ $t('products.geographic_coverage.note') }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
