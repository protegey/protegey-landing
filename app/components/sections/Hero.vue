<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Shield01Icon, Activity01Icon, Globe02Icon, LockComputerIcon } from '@hugeicons/core-free-icons';

defineProps({ isDark: Boolean });

let tl;
let typewriterTimeout = null;

const typewriterText = ref('');
const showCursor = ref(true);
const texts = [
    'DETECT',
    'ANALYZE',
    'MONITOR',
    'PREVENT'
];
const typingSpeed = 50;
const deletingSpeed = 30;
const pauseDelay = 2000;
const startDelay = 1500;

const startTypewriter = () => {
    typewriterText.value = '';
    showCursor.value = true;
    let currentTextIndex = 0;
    let currentIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentText = texts[currentTextIndex];

        if (!isDeleting) {
            if (currentIndex < currentText.length) {
                typewriterText.value += currentText[currentIndex];
                currentIndex++;
                typewriterTimeout = setTimeout(type, typingSpeed);
            } else {
                isDeleting = true;
                typewriterTimeout = setTimeout(type, pauseDelay);
            }
        } else {
            if (typewriterText.value.length > 0) {
                typewriterText.value = typewriterText.value.slice(0, -1);
                typewriterTimeout = setTimeout(type, deletingSpeed);
            } else {
                isDeleting = false;
                currentIndex = 0;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typewriterTimeout = setTimeout(type, typingSpeed);
            }
        }
    };

    setTimeout(() => {
        type();
    }, startDelay);
};

const scrollTo = (selector) => {
    const el = document.getElementById(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

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
        class="relative min-h-screen bg-neutral-950 flex items-center justify-center overflow-hidden pt-20">
        <!-- Animated Background Grid -->
        <div class="absolute inset-0 z-0">
            <div
                class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950"></div>

            <!-- Glowing Orbs -->
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow">
            </div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-glow"
                style="animation-delay: 1s;"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                <!-- Left Content -->
                <div class="text-left space-y-8">
                    <!-- Badge -->
                    <div
                        class="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-mono tracking-wide">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        FRAUD INTELLIGENCE NETWORK
                    </div>

                    <h1
                        class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-tight">
                        The Unified <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Anti-Fraud</span>
                        Engine for Francophone and Northern-Africa without the Enterprise Cost
                    </h1>

                    <p class="hero-subtitle text-lg sm:text-xl text-neutral-400 max-w-2xl leading-relaxed">
                        Aggregate signals from banks, telcos, and regulators to <span
                            class="text-primary-400 font-mono">{{ typewriterText }}<span
                                class="animate-pulse">_</span></span> fraud before it spreads. A shared early-warning
                        network turning scattered events into actionable intelligence.
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <button @click.prevent="scrollTo('waitlist')"
                            class="hero-cta-button group bg-primary-500 hover:bg-primary-400 text-neutral-950 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)]">
                            Get Started
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="20"
                                class="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button @click.prevent="scrollTo('waitlist')"
                            class="hero-cta-button group border border-neutral-700 hover:border-neutral-500 bg-neutral-900/50 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
                            <HugeiconsIcon :icon="Shield01Icon" :size="20"
                                class="text-neutral-400 group-hover:text-white transition-colors" />
                            Request Demo
                        </button>
                    </div>

                    <!-- Trust Indicators -->
                    <div class="hero-cta flex flex-wrap gap-6 pt-8 border-t border-neutral-800/50">
                        <div class="flex items-center gap-2 text-neutral-400 text-sm">
                            <HugeiconsIcon :icon="LockComputerIcon" :size="16" class="text-primary-500" />
                            <span>Bank-grade Security</span>
                        </div>
                        <div class="flex items-center gap-2 text-neutral-400 text-sm">
                            <HugeiconsIcon :icon="Activity01Icon" :size="16" class="text-primary-500" />
                            <span>Real-time Analysis</span>
                        </div>
                        <div class="flex items-center gap-2 text-neutral-400 text-sm">
                            <HugeiconsIcon :icon="Globe02Icon" :size="16" class="text-primary-500" />
                            <span>Pan-African Coverage</span>
                        </div>
                    </div>
                </div>

                <!-- Right Visual (Dashboard Mockup) -->
                <div class="relative perspective-1000">
                    <div
                        class="dashboard-card relative z-10 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
                        <!-- Header -->
                        <div
                            class="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div class="text-xs font-mono text-neutral-500">PROTEGEY_INTELLIGENCE_V2.0</div>
                        </div>

                        <!-- Dashboard Content -->
                        <div class="p-6 space-y-6 bg-neutral-900/50">
                            <!-- Stats Row -->
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50">
                                    <div class="text-xs text-neutral-400 uppercase tracking-wider mb-1">Threats Blocked
                                    </div>
                                    <div class="text-2xl font-mono font-bold text-white">84,291</div>
                                    <div class="text-xs text-primary-400 mt-1 flex items-center gap-1">
                                        <span
                                            class="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-primary-400"></span>
                                        +12.5% vs last week
                                    </div>
                                </div>
                                <div class="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50">
                                    <div class="text-xs text-neutral-400 uppercase tracking-wider mb-1">Active Nodes
                                    </div>
                                    <div class="text-2xl font-mono font-bold text-white">1,402</div>
                                    <div class="text-xs text-secondary-400 mt-1">99.9% Uptime</div>
                                </div>
                            </div>

                            <!-- Live Feed -->
                            <div class="bg-neutral-800/30 rounded-lg border border-neutral-700/30 overflow-hidden">
                                <div
                                    class="px-4 py-2 border-b border-neutral-700/30 bg-neutral-800/50 flex justify-between items-center">
                                    <span class="text-xs font-semibold text-neutral-300">LIVE THREAT FEED</span>
                                    <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                </div>
                                <div class="p-2 space-y-2">
                                    <div
                                        class="flex items-center gap-3 p-2 rounded hover:bg-neutral-700/30 transition-colors text-xs font-mono">
                                        <span class="text-red-400">[CRITICAL]</span>
                                        <span class="text-neutral-300">SIM Swap Detected</span>
                                        <span class="text-neutral-500 ml-auto">00:01:23</span>
                                    </div>
                                    <div
                                        class="flex items-center gap-3 p-2 rounded hover:bg-neutral-700/30 transition-colors text-xs font-mono">
                                        <span class="text-yellow-400">[WARNING]</span>
                                        <span class="text-neutral-300">Unusual Login Pattern</span>
                                        <span class="text-neutral-500 ml-auto">00:01:45</span>
                                    </div>
                                    <div
                                        class="flex items-center gap-3 p-2 rounded hover:bg-neutral-700/30 transition-colors text-xs font-mono">
                                        <span class="text-primary-400">[INFO]</span>
                                        <span class="text-neutral-300">New Node Connected</span>
                                        <span class="text-neutral-500 ml-auto">00:02:10</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Map Visualization Placeholder -->
                            <div
                                class="h-32 bg-neutral-800/30 rounded-lg border border-neutral-700/30 relative overflow-hidden flex items-center justify-center group">
                                <div
                                    class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                </div>
                                <div class="text-center">
                                    <HugeiconsIcon :icon="Globe02Icon" :size="32"
                                        class="text-neutral-600 mx-auto mb-2 group-hover:text-primary-400 transition-colors" />
                                    <span
                                        class="text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">Network
                                        Activity Map</span>
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
</style>