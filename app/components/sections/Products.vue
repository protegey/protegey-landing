<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import {
    Activity01Icon,
    ViewIcon,
    Settings01Icon,
    DashboardSquare01Icon
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
    <section id="products" class="relative pt-12 pb-20 md:pt-16 md:pb-32 bg-neutral-950 overflow-hidden">
        <!-- Decoration -->
        <div
            class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none">
        </div>
        <div
            class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none">
        </div>

        <div class="container mx-auto px-4 relative z-10">
            <!-- Products Grid -->
            <div ref="cardsContainerRef" class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
                <!-- Signal -->
                <NuxtLink :to="localePath('/products/signal')"
                    class="product-card group relative p-8 md:p-10 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-all duration-500 overflow-hidden block z-10">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative z-10">
                        <div
                            class="mb-8 inline-flex p-4 rounded-2xl bg-neutral-800 text-primary-400 group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                            <HugeiconsIcon :icon="Activity01Icon" :size="32" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.signal.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed">
                            {{ $t('products.signal.description') }}
                        </p>
                    </div>
                </NuxtLink>

                <!-- Radar -->
                <NuxtLink :to="localePath('/products/radar')"
                    class="product-card group relative p-8 md:p-10 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-secondary-500/50 transition-all duration-500 overflow-hidden block z-10">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-secondary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative z-10">
                        <div
                            class="mb-8 inline-flex p-4 rounded-2xl bg-neutral-800 text-secondary-400 group-hover:scale-110 group-hover:bg-secondary-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                            <HugeiconsIcon :icon="ViewIcon" :size="32" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.radar.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed">
                            {{ $t('products.radar.description') }}
                        </p>
                    </div>
                </NuxtLink>

                <!-- Gateway -->
                <NuxtLink :to="localePath('/products/api')"
                    class="product-card group relative p-8 md:p-10 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden block z-10">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative z-10">
                        <div
                            class="mb-8 inline-flex p-4 rounded-2xl bg-neutral-800 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                            <HugeiconsIcon :icon="Settings01Icon" :size="32" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.api.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed">
                            {{ $t('products.api.description') }}
                        </p>
                    </div>
                </NuxtLink>

                <!-- Console -->
                <NuxtLink :to="localePath('/products/console')"
                    class="product-card group relative p-8 md:p-10 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 overflow-hidden block z-10">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative z-10">
                        <div
                            class="mb-8 inline-flex p-4 rounded-2xl bg-neutral-800 text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500 shadow-xl shadow-black/20">
                            <HugeiconsIcon :icon="DashboardSquare01Icon" :size="32" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('products.console.title') }}</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed">
                            {{ $t('products.console.description') }}
                        </p>
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
