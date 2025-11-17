<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Shield01Icon } from '@hugeicons/core-free-icons';

defineProps({ isDark: Boolean });

let tl;
let typewriterTimeout = null;

const typewriterText = ref('');
const showCursor = ref(true);
const texts = [
    'Detect',
    'Analyze',
    'Monitor',
    'Prevent'
];
const typingSpeed = 50; // milliseconds per character
const deletingSpeed = 30; // milliseconds per character when deleting
const pauseDelay = 2000; // pause before deleting
const startDelay = 1500; // delay before starting typewriter effect

const startTypewriter = () => {
    typewriterText.value = '';
    showCursor.value = true;
    let currentTextIndex = 0;
    let currentIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentText = texts[currentTextIndex];

        if (!isDeleting) {
            // Typing
            if (currentIndex < currentText.length) {
                typewriterText.value += currentText[currentIndex];
                currentIndex++;
                typewriterTimeout = setTimeout(type, typingSpeed);
            } else {
                // Finished typing, wait then start deleting
                isDeleting = true;
                typewriterTimeout = setTimeout(type, pauseDelay);
            }
        } else {
            // Deleting
            if (typewriterText.value.length > 0) {
                typewriterText.value = typewriterText.value.slice(0, -1);
                typewriterTimeout = setTimeout(type, deletingSpeed);
            } else {
                // Finished deleting, move to next text
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

onMounted(() => {
    try {
        setTimeout(() => {
            // Set initial states
            gsap.set('.hero-title', { opacity: 0, y: 60 });
            gsap.set('.hero-subtitle', { opacity: 0, y: 40 });
            gsap.set('.hero-cta-button', { opacity: 0, y: 30 });
            gsap.set('.hero-card', { opacity: 0, scale: 0.8, y: 50 });
            gsap.set('.floating-element', { opacity: 0, scale: 0 });

            // Hero entrance animation
            tl = gsap.timeline();

            tl.to('.hero-title', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out'
            })
                .to('.hero-subtitle', {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.8')
                .to('.hero-cta-button', {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out'
                }, '-=0.6')
                .to('.hero-card', {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=1')
                .to('.floating-element', {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.7)'
                }, '-=0.8');

            // Continuous floating animation for card
            gsap.to('.hero-card', {
                y: -20,
                duration: 3,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: -1
            });

            // Floating elements continuous animation
            gsap.to('.floating-element', {
                y: '-10px',
                x: '5px',
                rotation: 5,
                duration: 4,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: -1,
                stagger: 0.5
            });

            // Start typewriter effect
            startTypewriter();

        }, 200);
    } catch (error) {
        console.warn('GSAP animation failed:', error);
    }
});

onUnmounted(() => {
    if (tl && tl.kill) tl.kill();
    gsap.killTweensOf('.hero-card');
    gsap.killTweensOf('.floating-element');
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
});
</script>

<template>
    <section class="min-h-screen h-screen flex items-center justify-center relative">
        <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-full flex items-center py-16 sm:py-20">
            <div class="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto w-full">

            <!-- Left Content -->
            <div class="text-left space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1">
                    <div class="space-y-3 sm:space-y-4 md:space-y-6">
                        <h1
                            class="hero-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight">
                            <span class="text-gray-900 dark:text-white block">The Pan-African Intelligence Engine helping</span>
                            <span
                                class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500 block mt-1 sm:mt-2">
                                Telcos, Governments and Financial Institutions
                            </span>
                            <span class="text-gray-900 dark:text-white block typewriter-text mt-1 sm:mt-2">
                                {{ typewriterText }}<span v-if="showCursor" class="typewriter-cursor">_</span> Fraud in Real-Time
                            </span>
                        </h1>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
                        <button
                            class="hero-cta-button group bg-primary-400 text-neutral-900 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg hover:bg-primary-300 transition-all duration-300 flex items-center justify-center gap-2">
                            Join Waitlist
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="20"
                                class="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            class="hero-cta-button border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg hover:border-primary-400 hover:text-primary-400 transition-all duration-300">
                            Request a Demo
                        </button>
                    </div>

                    <!-- Trust indicators -->
                    <div class="hero-cta flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-3 sm:pt-4 md:pt-8">
                        <div class="flex items-center gap-1.5 sm:gap-2 text-neutral-400 dark:text-neutral-500">
                            <HugeiconsIcon :icon="Shield01Icon" :size="16" class="sm:w-5 sm:h-5" color="var(--color-primary-500)" />
                            <span class="text-xs sm:text-sm">Bank-grade Security</span>
                        </div>
                        <div class="flex items-center gap-1.5 sm:gap-2 text-neutral-400 dark:text-neutral-500">
                            <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-400 rounded-full animate-pulse"></div>
                            <span class="text-xs sm:text-sm">Real-time Protection</span>
                        </div>
                        <div class="flex items-center gap-1.5 sm:gap-2 text-neutral-400 dark:text-neutral-500">
                            <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-secondary-400 rounded-full animate-pulse"></div>
                            <span class="text-xs sm:text-sm">Africa-first</span>
                        </div>
                    </div>
                </div>

                <!-- Right Visual -->
                <div class="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-4 lg:mb-0">
                    <!-- Main Card -->
                    <div class="hero-card relative scale-75 xs:scale-85 sm:scale-90 md:scale-95 lg:scale-100">
                        <!-- Card Background -->
                        <div
                            :class="['relative w-64 xs:w-72 sm:w-80 md:w-80 h-40 xs:h-48 sm:h-52 rounded-2xl shadow-2xl overflow-hidden', 'bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700']">
                            <!-- Card Header -->
                            <div class="p-4 sm:p-6">
                                <div class="flex items-center justify-between mb-3 sm:mb-4">
                                    <div class="text-primary-400 font-bold text-base sm:text-lg">PROTEGEY</div>
                                    <div class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">FRAUD SHIELD</div>
                                </div>

                                <!-- Card Numbers -->
                                <div class="text-gray-900 dark:text-white text-lg sm:text-xl font-mono tracking-wider mb-1.5 sm:mb-2">
                                    **** **** **** 2847
                                </div>

                                <!-- Card Info -->
                                <div class="flex justify-between items-end">
                                    <div>
                                        <div class="text-gray-500 dark:text-gray-400 text-xs uppercase">Valid Thru</div>
                                        <div class="text-gray-900 dark:text-white text-sm">12/28</div>
                                    </div>
                                    <div class="text-primary-400 text-xs sm:text-sm font-semibold">PROTECTED</div>
                                </div>
                            </div>

                            <!-- Chip -->
                            <div
                                class="absolute top-4 sm:top-6 left-4 sm:left-6 w-10 sm:w-12 h-7 sm:h-8 bg-gradient-to-br from-accent-yellow-400 to-accent-yellow-600 rounded opacity-90">
                            </div>

                            <!-- Security Pattern -->
                            <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-400/5 to-secondary-500/10 pointer-events-none" aria-hidden="true">
                            </div>
                        </div>

                        <!-- Flowing Particles -->
                        <div class="absolute -inset-2 sm:-inset-4">
                            <!-- Floating squares -->
                            <div
                                class="floating-element absolute top-4 sm:top-8 -right-4 sm:-right-8 w-3 h-3 sm:w-4 sm:h-4 bg-primary-400 rotate-45 opacity-80">
                            </div>
                            <div
                                class="floating-element absolute top-8 sm:top-16 -right-8 sm:-right-16 w-2 h-2 sm:w-3 sm:h-3 bg-secondary-500 rotate-12 opacity-60">
                            </div>
                            <div
                                class="floating-element absolute -top-2 sm:-top-4 right-6 sm:right-12 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-blue-400 rotate-45 opacity-70">
                            </div>

                            <div
                                class="floating-element absolute bottom-4 sm:bottom-8 -left-4 sm:-left-8 w-4 h-4 sm:w-5 sm:h-5 bg-secondary-400 rotate-45 opacity-70">
                            </div>
                            <div
                                class="floating-element absolute bottom-8 sm:bottom-16 -left-8 sm:-left-16 w-2 h-2 sm:w-3 sm:h-3 bg-primary-300 rotate-12 opacity-50">
                            </div>
                            <div
                                class="floating-element absolute -bottom-2 sm:-bottom-4 left-6 sm:left-12 w-3 h-3 sm:w-4 sm:h-4 bg-accent-blue-300 rotate-45 opacity-60">
                            </div>

                            <!-- Middle particles -->
                            <div
                                class="floating-element absolute top-1/2 -right-6 sm:-right-12 w-2 h-2 sm:w-3 sm:h-3 bg-primary-500 rotate-45 opacity-80">
                            </div>
                            <div
                                class="floating-element absolute top-1/3 -left-5 sm:-left-10 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-secondary-400 rotate-12 opacity-60">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-10px) rotate(5deg);
    }
}

@keyframes float-reverse {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(10px) rotate(-5deg);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-reverse {
    animation: float-reverse 8s ease-in-out infinite;
}

.hero-cta-button {
    opacity: 1;
}

.typewriter-text {
    min-height: 1.2em;
}

.typewriter-cursor {
    display: inline-block;
    margin-left: 2px;
    animation: blink 1s steps(2, start) infinite;
    color: currentColor;
}

@keyframes blink {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}
</style>