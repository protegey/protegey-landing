<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { gsap } from 'gsap';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Shield01Icon, Activity01Icon, Globe02Icon, LockComputerIcon } from '@hugeicons/core-free-icons';

defineProps({ isDark: Boolean });

const { t, te, locale } = useI18n();

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

const scrollTo = (selector) => {
    const el = document.getElementById(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

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
    try {
        setTimeout(() => {
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

        }, 200);
    } catch (error) {
        console.warn('GSAP animation failed:', error);
    }
});

onUnmounted(() => {
    if (tl && tl.kill) tl.kill();
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
});
</script>

<template>
    <section id="hero"
        class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center overflow-hidden pt-20">
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
                                {{ $t('hero.title_line_1.prefix') }}
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                                    {{ $t('hero.title_line_1.highlight') }}
                                </span>
                                {{ $t('hero.title_line_1.suffix') }}
                            </span>
                            <span class="block">
                                {{ $t('hero.title_line_2.prefix') }}
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                                    {{ $t('hero.title_line_2.highlight') }}
                                </span>
                                {{ $t('hero.title_line_2.suffix') }}
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
                        <button @click.prevent="scrollTo('waitlist')"
                            class="hero-cta-button group bg-primary-500 hover:bg-primary-400 text-neutral-950 px-5 py-2.5 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(12,185,158,0.3)] hover:shadow-[0_0_30px_rgba(12,185,158,0.5)]">
                            <HugeiconsIcon :icon="Shield01Icon" :size="18"
                                class="transition-colors" />
                            {{ $t('hero.cta.request_demo') }}
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="18"
                                class="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button @click.prevent="scrollTo('waitlist')"
                            class="hero-cta-button group border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-5 py-2.5 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 bg-white/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 backdrop-blur-sm">
                            {{ $t('hero.cta.speak_expert') }}
                        </button>
                    </div>

                    <!-- Trust Indicators -->
                    <div class="hero-cta flex flex-wrap gap-6 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/50">
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

                <!-- Right Visual (Dashboard Mockup) -->
                <div class="relative perspective-1000">
                    <div
                        class="dashboard-card relative z-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
                        <!-- Header -->
                        <div
                            class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/90 backdrop-blur">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div class="text-xs font-mono text-neutral-400 dark:text-neutral-500">PROTEGEY_INTELLIGENCE_V2.0</div>
                        </div>

                        <!-- Dashboard Content -->
                        <div class="p-5 space-y-5 bg-white/90 dark:bg-neutral-900/50">
                            <!-- Stats Row -->
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-neutral-100/80 dark:bg-neutral-800/50 p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-700/50">
                                    <div class="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{{
                                        $t('hero.dashboard.threats_blocked') }}
                                    </div>
                                    <div class="text-xl font-mono font-bold text-neutral-900 dark:text-white">84,291</div>
                                    <div class="text-xs text-primary-400 mt-1 flex items-center gap-1">
                                        <span
                                            class="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-primary-400"></span>
                                        {{ $t('hero.dashboard.vs_last_week') }}
                                    </div>
                                </div>
                                <div class="bg-neutral-100/80 dark:bg-neutral-800/50 p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-700/50">
                                    <div class="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{{
                                        $t('hero.dashboard.active_nodes') }}
                                    </div>
                                    <div class="text-xl font-mono font-bold text-neutral-900 dark:text-white">1,402</div>
                                    <div class="text-xs text-secondary-400 mt-1">{{ $t('hero.dashboard.uptime') }}</div>
                                </div>
                            </div>

                            <!-- Live Feed -->
                            <div class="bg-neutral-100/50 dark:bg-neutral-800/30 rounded-lg border border-neutral-200/50 dark:border-neutral-700/30 overflow-hidden">
                                <div
                                    class="px-4 py-2 border-b border-neutral-200/50 dark:border-neutral-700/30 bg-neutral-100/80 dark:bg-neutral-800/50 flex justify-between items-center">
                                    <span class="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{{
                                        $t('hero.dashboard.live_feed') }}</span>
                                    <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                </div>
                                <div class="p-2 space-y-2">
                                    <div
                                        class="flex items-center gap-3 p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700/30 transition-colors text-xs font-mono">
                                        <span class="text-red-400">[{{ $t('hero.dashboard.critical') }}]</span>
                                        <span class="text-neutral-600 dark:text-neutral-300">{{ $t('hero.dashboard.sim_swap') }}</span>
                                        <span class="text-neutral-500 dark:text-neutral-400 ms-auto">00:01:23</span>
                                    </div>
                                    <div
                                        class="flex items-center gap-3 p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700/30 transition-colors text-xs font-mono">
                                        <span class="text-yellow-400">[{{ $t('hero.dashboard.warning') }}]</span>
                                        <span class="text-neutral-600 dark:text-neutral-300">{{ $t('hero.dashboard.unusual_login') }}</span>
                                        <span class="text-neutral-500 dark:text-neutral-400 ms-auto">00:01:45</span>
                                    </div>
                                    <div
                                        class="flex items-center gap-3 p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700/30 transition-colors text-xs font-mono">
                                        <span class="text-primary-400">[{{ $t('hero.dashboard.info') }}]</span>
                                        <span class="text-neutral-600 dark:text-neutral-300">{{ $t('hero.dashboard.new_node') }}</span>
                                        <span class="text-neutral-500 dark:text-neutral-400 ms-auto">00:02:10</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Map Visualization Placeholder -->
                            <div
                                class="h-32 bg-neutral-100/50 dark:bg-neutral-800/30 rounded-lg border border-neutral-200/50 dark:border-neutral-700/30 relative overflow-hidden flex items-center justify-center group">
                                <div
                                    class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                </div>
                                <div class="text-center">
                                    <HugeiconsIcon :icon="Globe02Icon" :size="32"
                                        class="text-neutral-400 dark:text-neutral-600 mx-auto mb-2 group-hover:text-primary-400 transition-colors" />
                                    <span
                                        class="text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">{{
                                            $t('hero.dashboard.map_activity') }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Scan Line Animation -->
                        <div
                            class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary-500/5 to-transparent h-[20%] w-full animate-scan">
                        </div>
                    </div>

                    <!-- Decorative Elements behind card -->
                    <div class="absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl -z-10">
                    </div>
                    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl -z-10">
                    </div>
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
