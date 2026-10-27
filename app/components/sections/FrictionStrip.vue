<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { EyeIcon, Clock01Icon, JusticeScale01Icon } from '@hugeicons/core-free-icons';

gsap.registerPlugin(ScrollTrigger);

const items = [
    { key: 'fragmented_visibility', icon: EyeIcon },
    { key: 'operational_friction', icon: Clock01Icon },
    { key: 'inconsistent_decisions', icon: JusticeScale01Icon },
];

onMounted(() => {
    gsap.from('.friction-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.friction-strip', start: 'top 85%' },
    });
});
</script>

<template>
    <div class="relative z-20 -mt-16 md:-mt-20 px-4 sm:px-6 lg:px-8">
        <div class="friction-strip max-w-6xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800">
            <div v-for="item in items" :key="item.key" class="friction-card p-6 md:p-7">
                <HugeiconsIcon :icon="item.icon" :size="20" class="text-primary-500 mb-3" />
                <h3 class="font-bold text-neutral-900 dark:text-white text-base mb-1.5">
                    {{ $t(`friction_strip.${item.key}.title`) }}
                </h3>
                <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {{ $t(`friction_strip.${item.key}.body`) }}
                </p>
            </div>
        </div>
    </div>
</template>
