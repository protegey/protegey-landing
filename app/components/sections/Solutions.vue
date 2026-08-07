<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import {
    Activity01Icon,
    SmartPhone01Icon,
    Shield01Icon,
    UserStar01Icon,
    Share08Icon,
    CheckmarkCircle01Icon,
    ArrowRight01Icon,
    FingerPrintIcon,
} from '@hugeicons/core-free-icons';

const { t } = useI18n();
const localePath = useLocalePath();

gsap.registerPlugin(ScrollTrigger);

const activeModule = ref(0);
const sectionRef = ref(null);

const modules = [
    {
        key: 'transaction-monitoring',
        icon: Activity01Icon,
        color: 'primary',
        colorClass: 'text-primary-400',
        bgClass: 'bg-primary-500/10',
        borderClass: 'border-primary-500/30',
        glowClass: 'shadow-primary-500/10',
        gradientClass: 'from-primary-500/5',
    },
    {
        key: 'account-protection',
        icon: SmartPhone01Icon,
        color: 'secondary',
        colorClass: 'text-secondary-400',
        bgClass: 'bg-secondary-500/10',
        borderClass: 'border-secondary-500/30',
        glowClass: 'shadow-secondary-500/10',
        gradientClass: 'from-secondary-500/5',
    },
    {
        key: 'aml-compliance',
        icon: Shield01Icon,
        color: 'accent-cyan',
        colorClass: 'text-accent-cyan-400',
        bgClass: 'bg-accent-cyan-500/10',
        borderClass: 'border-accent-cyan-500/30',
        glowClass: 'shadow-accent-cyan-500/10',
        gradientClass: 'from-accent-cyan-500/5',
    },
    {
        key: 'risk-profiling',
        icon: UserStar01Icon,
        color: 'accent-orange',
        colorClass: 'text-accent-orange-400',
        bgClass: 'bg-accent-orange-500/10',
        borderClass: 'border-accent-orange-500/30',
        glowClass: 'shadow-accent-orange-500/10',
        gradientClass: 'from-accent-orange-500/5',
    },
    {
        key: 'fraud-intelligence',
        icon: Share08Icon,
        color: 'primary',
        colorClass: 'text-primary-400',
        bgClass: 'bg-primary-500/10',
        borderClass: 'border-primary-500/30',
        glowClass: 'shadow-primary-500/10',
        gradientClass: 'from-primary-500/5',
    },
    {
        key: 'pan-id',
        icon: FingerPrintIcon,
        colorClass: 'text-accent-cyan-400',
        bgClass: 'bg-accent-cyan-500/10',
        borderClass: 'border-accent-cyan-500/30',
        gradientClass: 'from-accent-cyan-500'
    },
];

onMounted(async () => {
    if (typeof window === 'undefined') return;
    await nextTick();

    if (sectionRef.value) {
        gsap.fromTo(
            sectionRef.value.querySelectorAll('.module-tab'),
            { x: -20, opacity: 0 },
            {
                scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out',
            }
        );
        gsap.fromTo(
            sectionRef.value.querySelector('.module-detail'),
            { y: 20, opacity: 0 },
            {
                scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.4,
                ease: 'power3.out',
            }
        );
    }
});

const setActive = (idx) => {
    activeModule.value = idx;
};

const activeData = () => modules[activeModule.value];
const moduleKey = () => activeData().key;
</script>

<template>
    <section id="solutions" ref="sectionRef"
        class="relative py-12 md:py-24 overflow-hidden bg-neutral-50 dark:bg-neutral-950">
        <!-- Background -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div
                class="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2">
            </div>
        </div>

        <div class="container mx-auto px-4 md:px-6 relative z-10">
            <!-- Header -->
            <div class="max-w-3xl mx-auto text-center mb-16 md:mb-20">
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-bold tracking-widest uppercase mb-6">
                    <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                    {{ $t('solutions.badge') }}
                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight leading-tight">
                    {{ $t('solutions.title') }}
                </h2>
                <p class="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {{ $t('solutions.subtitle') }}
                </p>
            </div>

            <!-- Tab + Detail layout -->
            <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">

                <!-- Left: Module Tabs -->
                <div class="lg:col-span-2 flex flex-col gap-3 order-2 lg:order-1">
                    <button v-for="(mod, idx) in modules" :key="mod.key"
                        @click="setActive(idx)"
                        :id="`module-tab-${idx}`"
                        class="module-tab group relative text-left px-5 py-4 rounded-2xl border transition-all duration-300 overflow-hidden"
                        :class="[
                            activeModule === idx
                                ? `border ${mod.borderClass} bg-white dark:bg-neutral-900 shadow-lg ${mod.glowClass}`
                                : 'border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700'
                        ]">
                        <!-- Active glow bg -->
                        <div v-if="activeModule === idx"
                            class="absolute inset-0 bg-gradient-to-r opacity-30 pointer-events-none"
                            :class="[mod.gradientClass, 'to-transparent']">
                        </div>

                        <div class="relative z-10 flex items-center gap-4">
                            <div class="flex-shrink-0 p-2.5 rounded-xl transition-all duration-300"
                                :class="activeModule === idx ? mod.bgClass : 'bg-neutral-100 dark:bg-neutral-800'">
                                <HugeiconsIcon :icon="mod.icon" :size="20"
                                    :class="activeModule === idx ? mod.colorClass : 'text-neutral-400'" />
                            </div>
                            <div class="min-w-0">
                                <div class="font-bold text-neutral-900 dark:text-white text-sm leading-snug">
                                    {{ $t(`solutions.modules.${mod.key}.title`) }}
                                </div>
                                <div class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                                    {{ $t(`solutions.modules.${mod.key}.subtext`) }}
                                </div>
                            </div>
                            <div class="ml-auto flex-shrink-0">
                                <HugeiconsIcon :icon="ArrowRight01Icon" :size="16"
                                    class="transition-all duration-300"
                                    :class="activeModule === idx ? mod.colorClass : 'text-neutral-300 dark:text-neutral-600'" />
                            </div>
                        </div>
                    </button>
                </div>

                <!-- Right: Module Detail Panel -->
                <div class="lg:col-span-3 order-1 lg:order-2">
                    <transition name="fade-slide" mode="out-in">
                        <div :key="activeModule"
                            class="module-detail bg-white dark:bg-neutral-900 border rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl overflow-hidden relative"
                            :class="activeData().borderClass">
                            <!-- Glow top-right -->
                            <div
                                class="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
                                :class="activeData().bgClass">
                            </div>

                            <div class="relative z-10">
                                <!-- Module header -->
                                <div class="flex items-start gap-4 mb-8">
                                    <div class="flex-shrink-0 p-4 rounded-2xl shadow-lg"
                                        :class="activeData().bgClass">
                                        <HugeiconsIcon :icon="activeData().icon" :size="32"
                                            :class="activeData().colorClass" />
                                    </div>
                                    <div>
                                        <div class="text-xs font-bold tracking-widest uppercase mb-1"
                                            :class="activeData().colorClass">
                                            {{ $t('solutions.module_counter', { n: activeModule + 1, total: modules.length }) }}
                                        </div>
                                        <h3 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                                            {{ $t(`solutions.modules.${moduleKey()}.title`) }}
                                        </h3>
                                    </div>
                                </div>

                                <!-- Subtext -->
                                <p class="text-neutral-500 dark:text-neutral-400 text-base md:text-lg leading-relaxed mb-8 border-l-2 pl-4"
                                    :class="activeData().borderClass">
                                    {{ $t(`solutions.modules.${moduleKey()}.subtext`) }}
                                </p>

                                <!-- Features list -->
                                <ul class="space-y-4">
                                    <li v-for="(feature, fi) in $tm(`solutions.modules.${moduleKey()}.features`)"
                                        :key="fi"
                                        class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                                        <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="18"
                                            class="flex-shrink-0 mt-0.5"
                                            :class="activeData().colorClass" />
                                        <span class="text-sm leading-snug">{{ $rt(feature) }}</span>
                                    </li>
                                </ul>

                                <!-- Dots indicator -->
                                <div class="flex items-center justify-between gap-2 mt-10">
                                    <div class="flex items-center gap-2">
                                        <button v-for="(_, i) in modules" :key="i"
                                            @click="setActive(i)"
                                            class="h-1.5 rounded-full transition-all duration-300"
                                            :class="[
                                                activeModule === i
                                                    ? `w-6 ${activeData().bgClass.replace('/10', '/80')}`
                                                    : 'w-1.5 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                                            ]"
                                            :aria-label="$t('solutions.go_to_module', { n: i + 1 })">
                                        </button>
                                    </div>
                                    <NuxtLink :to="localePath(`/solutions/${moduleKey()}`)"
                                        class="flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                                        :class="activeData().colorClass">
                                        {{ $t('solutions.learn_more_about', { title: $t(`solutions.modules.${moduleKey()}.title`) }) }} &rarr;
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

.module-tab {
    will-change: transform, opacity;
}
</style>
