<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Shield01Icon, Activity01Icon, LockComputerIcon } from '@hugeicons/core-free-icons';

defineProps({ isDark: Boolean });

const { t, te, locale } = useI18n();
const localePath = useLocalePath();

const rawSignals = [
    { time: '14:32:07.441', type: 'VELOCITY_BREACH',    entity: 'CCA Bank·***4821',       action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:08.203', type: 'SIM_SWAP_PROXIMITY', entity: 'Orange Money·CAR·***7293',action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:09.847', type: 'LARGE_OUTLIER',      entity: 'BGFI Cameroun·***1149',   action: 'REVIEW', risk: 'MED'  },
    { time: '14:32:11.012', type: 'IMPOSSIBLE_TRAVEL',  entity: 'MTN MoMo·GH·***9872',    action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:12.589', type: 'RAPID_VELOCITY',     entity: 'MTN CI·***3341',          action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:13.771', type: 'NEW_DEVICE_ACCESS',  entity: 'Wafacash·***6621',        action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:15.123', type: 'SYNTHETIC_IDENTITY', entity: 'BCI Mali·***0184',        action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:16.004', type: 'MULE_NETWORK',       entity: 'NFC Bank·***7743',        action: 'REVIEW', risk: 'MED'  },
    { time: '14:32:17.888', type: 'VELOCITY_BREACH',    entity: 'Airtel Money·Congo·***2291',action: 'BLOCK', risk: 'HIGH' },
    { time: '14:32:19.033', type: 'GEO_ANOMALY',        entity: 'Afrika Bank·SN·***5519',  action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:20.441', type: 'PEP_MATCH',          entity: 'Orabank Gabon·***3302',   action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:21.820', type: 'SANCTIONS_HIT',      entity: 'BSIC Chad·***8870',       action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:22.440', type: 'RAPID_VELOCITY',     entity: 'Moov CI·***4410',         action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:23.115', type: 'NEW_DEVICE_ACCESS',  entity: 'SGBGE·***1105',           action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:24.089', type: 'MULE_NETWORK',       entity: 'Attijari Chad·***6678',   action: 'REVIEW', risk: 'MED'  },
    { time: '14:32:25.301', type: 'VELOCITY_BREACH',    entity: 'Moov Money·Gabon·***3390',action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:26.551', type: 'GEO_ANOMALY',        entity: 'Orange Money·SL·***9910', action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:27.774', type: 'IMPOSSIBLE_TRAVEL',  entity: 'CCEI Bank·***2244',       action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:28.903', type: 'LARGE_OUTLIER',      entity: 'Momo Cameroun·***7781',   action: 'REVIEW', risk: 'MED'  },
    { time: '14:32:30.012', type: 'PEP_MATCH',          entity: 'BNDA·***5523',            action: 'BLOCK',  risk: 'HIGH' },
];
const terminalSignals = [...rawSignals, ...rawSignals];

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
            <div class="max-w-7xl mx-auto grid lg:grid-cols-[5fr_6fr] gap-12 lg:gap-16 items-center">

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
                    <div class="dashboard-card relative z-10 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/10 rounded-xl overflow-hidden shadow-xl dark:shadow-none">
                        <!-- Title bar -->
                        <div class="flex items-center gap-2.5 px-3.5 py-2.5 bg-neutral-100 dark:bg-black/40 border-b border-neutral-200 dark:border-white/[0.07]">
                            <div class="flex gap-1.5 shrink-0">
                                <span class="w-2 h-2 rounded-full bg-accent-orange-500/80" />
                                <span class="w-2 h-2 rounded-full bg-yellow-400/80" />
                                <span class="w-2 h-2 rounded-full bg-primary-500/80" />
                            </div>
                            <span class="flex-1 font-mono text-[0.6rem] tracking-[0.1em] text-neutral-400 dark:text-white/30">PROTEGEY // SIGNAL FEED</span>
                            <span class="font-mono text-[0.6rem] tracking-[0.06em] text-primary-500 dark:text-primary-400 terminal-live">● LIVE</span>
                        </div>
                        <!-- Column legend -->
                        <div class="terminal-grid px-3.5 py-1.5 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-white/[0.05] font-mono text-[0.55rem] tracking-[0.12em] text-neutral-400 dark:text-white/25">
                            <span>TIME</span>
                            <span>DETECTOR</span>
                            <span>ENTITY</span>
                            <span>ACTION</span>
                        </div>
                        <!-- Scrolling feed -->
                        <div class="relative h-[340px] overflow-hidden">
                            <div class="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
                            <div class="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
                            <div class="terminal-track">
                                <div
                                    v-for="(s, i) in terminalSignals"
                                    :key="`${s.time}-${i}`"
                                    class="terminal-grid items-center px-3.5 py-[7px] border-b border-neutral-100 dark:border-white/[0.04] font-mono text-[0.65rem] hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors"
                                    :class="s.risk === 'HIGH' ? 'border-l-2 border-l-accent-orange-500' : 'border-l-2 border-l-primary-500/50'"
                                >
                                    <span class="text-neutral-400 dark:text-white/30 text-[0.6rem]">{{ s.time }}</span>
                                    <span class="text-neutral-700 dark:text-white/65 tracking-[0.02em] truncate">{{ s.type }}</span>
                                    <span class="text-neutral-500 dark:text-white/45 truncate">{{ s.entity }}</span>
                                    <span
                                        class="text-[0.55rem] font-semibold tracking-[0.08em] px-1.5 py-0.5 rounded-[2px] text-center"
                                        :class="{
                                            'bg-accent-orange-500/10 text-accent-orange-500 dark:bg-accent-orange-500/15 dark:text-accent-orange-400': s.action === 'BLOCK',
                                            'bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400':                        s.action === 'FLAG',
                                            'bg-neutral-100 text-neutral-500 dark:bg-white/[0.06] dark:text-white/45':                                s.action === 'REVIEW',
                                        }"
                                    >{{ s.action }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- Footer -->
                        <div class="flex items-center gap-2 px-3.5 py-2 bg-neutral-100 dark:bg-black/40 border-t border-neutral-200 dark:border-white/[0.06] font-mono text-[0.55rem] tracking-[0.08em] text-neutral-400 dark:text-white/20">
                            <span>ENGINE v2.1.0</span>
                            <span class="text-neutral-300 dark:text-white/15">·</span>
                            <span>E2E ENCRYPTED</span>
                            <span class="text-neutral-300 dark:text-white/15">·</span>
                            <span>PII MASKED</span>
                        </div>
                    </div>

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

.terminal-grid {
    display: grid;
    grid-template-columns: 100px 1fr 110px 52px;
    gap: 0 8px;
}

@keyframes scroll-feed {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-50%); }
}

.terminal-track {
    animation: scroll-feed 32s linear infinite;
}

.terminal-track:hover {
    animation-play-state: paused;
}

@keyframes blink-live {
    0%, 80%, 100% { opacity: 1; }
    40%           { opacity: 0.3; }
}

.terminal-live {
    animation: blink-live 2s ease-in-out infinite;
}
</style>
