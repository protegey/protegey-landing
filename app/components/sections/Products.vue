<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import {
    Activity01Icon,
    ViewIcon,
    Settings01Icon,
    DashboardSquare01Icon,
    Shield01Icon,
    FingerPrintIcon,
    ArrowRight01Icon
} from '@hugeicons/core-free-icons';

const localePath = useLocalePath()

gsap.registerPlugin(ScrollTrigger);

const cardsContainerRef = ref(null);

onMounted(async () => {
    if (typeof window === 'undefined') return;

    // Slight delay to ensure DOM is fully calculated
    await nextTick();
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    // Cards animation
    if (cardsContainerRef.value) {
        const cards = cardsContainerRef.value.querySelectorAll('.product-card');
        gsap.fromTo(cards,
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: cardsContainerRef.value,
                    start: 'top 85%', // Slightly earlier to ensure they trigger
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            }
        );
    }
});
</script>

<template>
    <section id="products" class="relative py-24 md:py-32 overflow-hidden bg-neutral-950">
        <!-- Section Background Decor -->
        <div
            class="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2">
        </div>

        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-4xl mx-auto text-center mb-20">
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold tracking-widest uppercase mb-6">
                    <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                    {{ $t('products.badge') }}
                </div>
                <h2 class="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight capitalize leading-tight">
                    {{ $t('products.title') }}
                </h2>
                <div class="h-1.5 w-24 bg-gradient-to-r from-primary-500 to-violet-500 mx-auto rounded-full"></div>
            </div>

            <div ref="cardsContainerRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <!-- Signal -->
                <NuxtLink :to="localePath('/products/signal')"
                    class="product-card group relative p-8 md:p-10 rounded-[2.5rem] bg-neutral-900/40 border border-neutral-800 hover:border-primary-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>

                    <div class="relative z-10">
                        <div
                            class="mb-8 inline-flex p-4 rounded-2xl bg-neutral-800 text-primary-400 group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                            <HugeiconsIcon :icon="Activity01Icon" :size="32" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.signal.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed mb-8">
                            {{ $t('products.signal.description') }}
                        </p>
                    </div>

                    <div
                        class="mt-auto flex items-center text-primary-400 font-bold text-sm tracking-widest uppercase gap-0 group-hover:gap-2 transition-all duration-300">
                        Explore
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" />
                    </div>
                </NuxtLink>

                <!-- Radar -->
                <NuxtLink :to="localePath('/products/radar')"
                    class="product-card group relative p-8 md:p-10 rounded-[2.5rem] bg-neutral-900/40 border border-neutral-800 hover:border-violet-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>

                    <div class="relative z-10">
                        <div
                            class="mb-8 inline-flex p-4 rounded-2xl bg-neutral-800 text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                            <HugeiconsIcon :icon="ViewIcon" :size="32" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.radar.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed mb-8">
                            {{ $t('products.radar.description') }}
                        </p>
                    </div>

                    <div
                        class="mt-auto flex items-center text-violet-400 font-bold text-sm tracking-widest uppercase gap-0 group-hover:gap-2 transition-all duration-300">
                        Explore
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" />
                    </div>
                </NuxtLink>

                <!-- Gateway -->
                <NuxtLink :to="localePath('/products/api')"
                    class="product-card group relative p-8 md:p-10 rounded-[2.5rem] bg-neutral-900/40 border border-neutral-800 hover:border-emerald-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>

                    <div class="relative z-10">
                        <div
                            class="mb-8 inline-flex p-4 rounded-2xl bg-neutral-800 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                            <HugeiconsIcon :icon="Settings01Icon" :size="32" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.api.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed mb-8">
                            {{ $t('products.api.description') }}
                        </p>
                    </div>

                    <div
                        class="mt-auto flex items-center text-emerald-400 font-bold text-sm tracking-widest uppercase gap-0 group-hover:gap-2 transition-all duration-300">
                        Explore
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" />
                    </div>
                </NuxtLink>

                <!-- Console -->
                <NuxtLink :to="localePath('/products/console')"
                    class="product-card group relative p-8 md:p-10 rounded-[2.5rem] bg-neutral-900/40 border border-neutral-800 hover:border-amber-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>

                    <div class="relative z-10">
                        <div
                            class="mb-8 inline-flex p-4 rounded-2xl bg-neutral-800 text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                            <HugeiconsIcon :icon="DashboardSquare01Icon" :size="32" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.console.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed mb-8">
                            {{ $t('products.console.description') }}
                        </p>
                    </div>

                    <div
                        class="mt-auto flex items-center text-amber-400 font-bold text-sm tracking-widest uppercase gap-0 group-hover:gap-2 transition-all duration-300">
                        Explore
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" />
                    </div>
                </NuxtLink>

                <!-- Risk & Compliance -->
                <NuxtLink :to="localePath('/products/compliance')"
                    class="product-card group relative p-8 md:p-10 rounded-[2.5rem] bg-neutral-900/40 border border-neutral-800 hover:border-violet-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>

                    <div class="relative z-10">
                        <div
                            class="mb-8 inline-flex p-4 rounded-2xl bg-neutral-800 text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                            <HugeiconsIcon :icon="Shield01Icon" :size="32" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.compliance.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed mb-8">
                            {{ $t('products.compliance.description') }}
                        </p>
                    </div>

                    <div
                        class="mt-auto flex items-center text-violet-400 font-bold text-sm tracking-widest uppercase gap-0 group-hover:gap-2 transition-all duration-300">
                        Explore
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" />
                    </div>
                </NuxtLink>

                <!-- Pan-ID -->
                <NuxtLink :to="localePath('/products/panid')"
                    class="product-card group relative p-8 md:p-10 rounded-[2.5rem] bg-neutral-900/40 border border-neutral-800 hover:border-cyan-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>

                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-8">
                            <div
                                class="inline-flex p-4 rounded-2xl bg-neutral-800 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                                <HugeiconsIcon :icon="FingerPrintIcon" :size="32" />
                            </div>
                            <span
                                class="text-[10px] font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 tracking-tighter uppercase whitespace-nowrap">
                                Expected Q2 2025
                            </span>
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.panid.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed mb-8">
                            {{ $t('products.panid.description') }}
                        </p>
                    </div>

                    <div
                        class="mt-auto flex items-center text-cyan-400 font-bold text-sm tracking-widest uppercase gap-0 group-hover:gap-2 transition-all duration-300">
                        Coming Soon
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" />
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
.product-card {
    will-change: transform, opacity;
}
</style>
