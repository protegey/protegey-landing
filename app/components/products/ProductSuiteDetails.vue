<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    WorkflowCircle01Icon,
    Target02Icon,
    GlobalIcon,
    ArrowRight01Icon,
    CheckListIcon
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';

const containerRef = ref(null);

const { tm, rt } = useI18n();

onMounted(() => {
    if (containerRef.value) {
        gsap.registerPlugin(ScrollTrigger);

        const sections = containerRef.value.querySelectorAll('.detail-section');
        sections.forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    }
});
</script>

<template>
    <div ref="containerRef" class="py-24 space-y-32">
        <!-- Integration Story -->
        <!-- <section class="detail-section container mx-auto px-4">
            <div
                class="max-w-5xl mx-auto rounded-[3rem] bg-neutral-900/50 border border-neutral-800 p-8 md:p-16 relative overflow-hidden"> -->
        <!-- Background Accent -->
        <!-- <div class="absolute top-0 right-0 w-1/2 h-full bg-primary-500/5 blur-[120px] pointer-events-none">
                </div>

                <div class="relative z-10">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="p-3 rounded-2xl bg-primary-500/10 text-primary-500">
                            <HugeiconsIcon :icon="WorkflowCircle01Icon" :size="32" />
                        </div>
                        <h2 class="text-3xl md:text-4xl font-bold text-white">{{ $t('products.integration_story.title')
                        }}</h2>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <p class="text-lg text-primary-400 font-semibold mb-6 flex items-center gap-2">
                                <span
                                    class="px-3 py-1 rounded-full bg-primary-500/10 text-xs border border-primary-500/20 uppercase tracking-widest">Scenario</span>
                                {{ $t('products.integration_story.scenario') }}
                            </p>

                            <div class="space-y-6">
                                <div v-for="(step, index) in tm('products.integration_story.steps')" :key="index"
                                    class="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-500/30 transition-colors group">
                                    <div
                                        class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
                                        {{ index + 1 }}
                                    </div>
                                    <p class="text-neutral-300 group-hover:text-white transition-colors">{{ rt(step) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-neutral-950/50 rounded-3xl p-8 border border-neutral-800/50">
                            <h3 class="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                <HugeiconsIcon :icon="CheckListIcon" :size="24" class="text-primary-500" />
                                Better Together
                            </h3>
                            <div class="space-y-4">
                                <div v-for="(point, index) in tm('products.integration_story.better_together')"
                                    :key="index"
                                    class="flex items-start gap-3 text-neutral-400 hover:text-neutral-200 transition-colors">
                                    <HugeiconsIcon :icon="ArrowRight01Icon" :size="20"
                                        class="mt-1 flex-shrink-0 text-primary-500/50" />
                                    <span>{{ rt(point) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Mission & Coverage Grid -->
        <div class="detail-section container mx-auto px-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <!-- Mission -->
                <div
                    class="p-8 md:p-12 rounded-[2.5rem] bg-white/70 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 group hover:border-primary-500/20 transition-all duration-500">
                    <div class="flex items-center gap-4 mb-8 rtl:flex-row-reverse">
                        <div
                            class="p-3 rounded-2xl bg-secondary-500/10 text-secondary-400 group-hover:scale-110 transition-transform duration-500">
                            <HugeiconsIcon :icon="Target02Icon" :size="32" />
                        </div>
                        <h2 class="text-3xl font-bold text-neutral-900 dark:text-white rtl:text-right">{{ $t('products.mission.title') }}</h2>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div v-for="(item, index) in tm('products.mission.items')" :key="index"
                            class="flex items-start gap-3 p-4 rounded-xl bg-neutral-100/50 dark:bg-white/5 text-sm text-neutral-500 dark:text-neutral-400 rtl:flex-row-reverse">
                            <div
                                class="mt-1 w-1.5 h-1.5 rounded-full bg-secondary-500 shadow-lg shadow-secondary-500/50 flex-shrink-0">
                            </div>
                            <span class="rtl:text-right">{{ rt(item) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Coverage -->
                <div
                    class="p-8 md:p-12 rounded-[2.5rem] bg-white/70 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 group hover:border-primary-500/20 transition-all duration-500">
                    <div class="flex items-center gap-4 mb-8 rtl:flex-row-reverse">
                        <div
                            class="p-3 rounded-2xl bg-accent-cyan-500/10 text-accent-cyan-400 group-hover:scale-110 transition-transform duration-500">
                            <HugeiconsIcon :icon="GlobalIcon" :size="32" />
                        </div>
                        <h2 class="text-3xl font-bold text-neutral-900 dark:text-white rtl:text-right">{{
                            $t('products.geographic_coverage.title') }}</h2>
                    </div>
                    <p class="text-lg text-neutral-500 dark:text-neutral-400 mb-8 rtl:text-right">{{
                        $t('products.geographic_coverage.description') }}</p>

                    <div class="space-y-4 mb-8">
                        <div v-for="(region, index) in tm('products.geographic_coverage.regions')" :key="index"
                            class="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/50 hover:border-accent-cyan-500/30 transition-colors rtl:flex-row-reverse">
                            <div class="w-2 h-10 bg-accent-cyan-500 rounded-full"></div>
                            <span class="text-neutral-900 dark:text-white font-medium rtl:text-right">{{ rt(region) }}</span>
                        </div>
                    </div>

                    <div
                        class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 italic text-sm text-neutral-400 dark:text-neutral-500 rtl:text-right">
                        {{ $t('products.geographic_coverage.note') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
