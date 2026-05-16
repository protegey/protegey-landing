<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Shield01Icon, Activity01Icon, LockComputerIcon } from '@hugeicons/core-free-icons';
import SignalTerminal from '~/components/sections/SignalTerminal.vue';

defineProps({ isDark: Boolean });

const { t, te, locale } = useI18n();
const localePath = useLocalePath();

let tl;
let typewriterTimeout = null;

const typewriterText = ref('');

const texts = computed(() => [
    t('hero.typewriter.detect'),
    t('hero.typewriter.analyze'),
    t('hero.typewriter.monitor'),
    t('hero.typewriter.prevent'),
]);

const useSplitHeroTitle = computed(() => te('hero.title_line_1.prefix'));

const typingSpeed = 55;
const deletingSpeed = 35;
const pauseDelay = 1200;


const startTypewriter = () => {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);

    typewriterText.value = '';
    let currentTextIndex = 0;
    let currentIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentText = texts.value[currentTextIndex] || '';

        if (!isDeleting) {
            if (currentIndex < currentText.length) {
                typewriterText.value += currentText[currentIndex];
                currentIndex++;
                typewriterTimeout = setTimeout(type, typingSpeed);
            } else {
                isDeleting = true;
                typewriterTimeout = setTimeout(type, pauseDelay);
            }
        } else if (typewriterText.value.length > 0) {
            typewriterText.value = typewriterText.value.slice(0, -1);
            typewriterTimeout = setTimeout(type, deletingSpeed);
        } else {
            isDeleting = false;
            currentIndex = 0;
            currentTextIndex = (currentTextIndex + 1) % texts.value.length;
            typewriterTimeout = setTimeout(type, typingSpeed);
        }
    };

    type();
};

watch(locale, () => {
    startTypewriter();
});

onMounted(() => {
    nextTick(() => {
        try {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroCtaButton = document.querySelector('.hero-cta-button');
            const heroBadge = document.querySelector('.hero-badge');
            const dashboardCard = document.querySelector('.dashboard-card');
            
            if (!heroTitle || !heroSubtitle || !heroCtaButton || !heroBadge || !dashboardCard) {
                console.warn('Hero animation elements not found, skipping GSAP animation');
                return;
            }
            
            gsap.set('.hero-title', { opacity: 0, y: 40 });
            gsap.set('.hero-subtitle', { opacity: 0, y: 20 });
            gsap.set('.hero-cta-button', { opacity: 0, y: 20 });
            gsap.set('.hero-badge', { opacity: 0, y: -20 });
            gsap.set('.dashboard-card', { opacity: 0, scale: 0.95, rotationX: 10 });

            tl = gsap.timeline();

            tl.to('.hero-badge', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            })
                .to('.hero-title', {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.4')
                .to('.hero-subtitle', {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.6')
                .to('.hero-cta-button', {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out'
                }, '-=0.6')
                .to('.dashboard-card', {
                    scale: 1,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=0.4');

            startTypewriter();

        } catch (error) {
            console.warn('GSAP animation failed:', error);
        }
    });
});

onUnmounted(() => {
    if (tl && tl.kill) tl.kill();
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
});
</script>

<template>
    <section id="hero"
        class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-32">
        <!-- Animated Background Grid -->
        <div class="absolute inset-0 z-0">
            <div
                class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-transparent to-neutral-50 dark:to-neutral-950"></div>

            <!-- Glowing Orbs -->
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow">
            </div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-glow"
                style="animation-delay: 1s;"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                <!-- Left Content -->
                <div class="text-left rtl:text-right space-y-8">
                    <!-- Badge -->
                    <div
                        class="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-mono tracking-wide">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        {{ $t('hero.badge') }}
                    </div>

                    <h1
                        class="hero-title text-4xl lg:text-5xl font-bold leading-[1.1] text-neutral-900 dark:text-white tracking-tight">
                        <template v-if="useSplitHeroTitle">
                            <span class="block">
                                {{ $t('hero.title_line_1.prefix') }}<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">{{ $t('hero.title_line_1.highlight') }}</span>{{ $t('hero.title_line_1.suffix') }}
                            </span>
                            <span class="block">
                                {{ $t('hero.title_line_2.prefix') }}<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">{{ $t('hero.title_line_2.highlight') }}</span>{{ $t('hero.title_line_2.suffix') }}
                            </span>
                        </template>
                        <template v-else>
                            <span class="block">{{ $t('hero.title_part_1') }}</span>
                            <span v-if="$t('hero.title_highlight')" class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                                {{ $t('hero.title_highlight') }}
                            </span>
                            <span class="block">{{ $t('hero.title_part_2') }}</span>
                        </template>
                    </h1>

                    <p class="hero-subtitle text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed"
                        aria-live="off"
                        v-html="$t('hero.subtitle', { action: typewriterText })">
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <NuxtLink :to="localePath('/#waitlist')"
                            class="hero-cta-button group bg-primary-500 hover:bg-primary-400 text-neutral-950 px-5 py-2.5 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(12,185,158,0.3)] hover:shadow-[0_0_30px_rgba(12,185,158,0.5)]">
                            <HugeiconsIcon :icon="Shield01Icon" :size="18"
                                class="transition-colors" />
                            {{ $t('hero.cta.request_demo') }}
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="18"
                                class="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                        </NuxtLink>
                        <NuxtLink :to="localePath('/expert')"
                            class="hero-cta-button group border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-5 py-2.5 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 bg-white/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 backdrop-blur-sm">
                            {{ $t('hero.cta.speak_expert') }}
                        </NuxtLink>
                    </div>

                    <!-- Trust Indicators -->
                    <div class="hero-cta flex flex-wrap gap-6 pt-12 border-t border-neutral-200/80 dark:border-neutral-800/50">
                        <div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                            <HugeiconsIcon :icon="LockComputerIcon" :size="16" class="text-primary-500" />
                            <span>{{ $t('hero.trust.security') }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                            <HugeiconsIcon :icon="Activity01Icon" :size="16" class="text-primary-500" />
                            <span>{{ $t('hero.trust.analysis') }}</span>
                        </div>
                    </div>
                </div>

                <!-- Right Visual (Signal Terminal) -->
                <div class="relative perspective-1000">
                    <ClientOnly>
                        <SignalTerminal />
                        <template #fallback>
                            <div class="dashboard-card bg-neutral-950 border border-white/10 rounded-xl h-[420px] animate-pulse" />
                        </template>
                    </ClientOnly>

                    <!-- Decorative glow blobs behind terminal -->
                    <div class="absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl -z-10" />
                    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}

.hero-badge,
.hero-title,
.hero-subtitle,
.hero-cta-button,
.dashboard-card {
    will-change: transform, opacity;
}
</style>
