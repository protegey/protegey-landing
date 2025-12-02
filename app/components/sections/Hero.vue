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
            gsap.set('.hero-cta-button', { opacity: 0, y: 30 });
            gsap.set('.hero-cta', { opacity: 0, y: 20 });
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
                .to('.hero-cta-button', {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out'
                }, '-=0.6')
                .to('.hero-cta', {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
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
    <section id="hero" class="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center overflow-hidden">
        <!-- Subtle grid pattern overlay -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px); background-size: 50px 50px;"></div>
        </div>

        <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-20 sm:py-48 relative z-10">
            <div class="max-w-7xl mx-auto">
                <!-- Main Content -->
                <div class="text-center mb-16 space-y-6">
                    <h1 class="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                        <span class="block">The unified Antifraud and Identity Verification engine for Francophone and Northern Africa, without the enterprise cost</span>
                    </h1>
                    <p class="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        We cover the full fraud spectrum, from duplicate account detection, lender & merchant risk monitoring, internal fraud and transaction surveillance, all the way to account takeovers, investment scams, SIM-swap fraud, cross-border ID verification and money-muling prevention.
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                        <button class="hero-cta-button group bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl">
                            Get Started
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="20" class="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button class="hero-cta-button border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                            <HugeiconsIcon :icon="Shield01Icon" :size="20" class="inline mr-2" />
                            Request a Demo
                        </button>
                    </div>

                    <!-- Trust Badges -->
                    <div class="hero-cta flex flex-wrap items-center justify-center gap-8 pt-12 text-white/80">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                            <span class="text-sm">Bank-grade Security</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                            <span class="text-sm">Real-time Protection</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                            <span class="text-sm">Africa-first</span>
                        </div>
                    </div>
                </div>

                <!-- Visual Card Section -->
                <div class="relative max-w-5xl mx-auto mt-20">
                    <div class="hero-card grid md:grid-cols-3 gap-6">
                        <!-- Card 1 - Main Security Card -->
                        <div class="md:col-span-2 bg-white rounded-2xl shadow-2xl p-8 transform hover:-translate-y-2 transition-all duration-300">
                            <div class="flex items-start justify-between mb-6">
                                <div>
                                    <div class="text-blue-600 font-bold text-xl mb-1">PROTEGEY</div>
                                    <div class="text-gray-500 text-sm">FRAUD SHIELD</div>
                                </div>
                                <div class="bg-gradient-to-br from-lime-400 to-lime-600 w-14 h-10 rounded-lg opacity-90"></div>
                            </div>
                            <div class="text-gray-900 text-2xl font-mono tracking-wider mb-4">
                                **** **** **** 2847
                            </div>
                            <div class="flex justify-between items-end">
                                <div>
                                    <div class="text-gray-500 text-xs uppercase mb-1">Valid Thru</div>
                                    <div class="text-gray-900 font-semibold">12/28</div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span class="text-green-600 text-sm font-semibold">PROTECTED</span>
                                </div>
                            </div>
                        </div>

                        <!-- Card 2 - Stats Card -->
                        <div class="bg-white rounded-2xl shadow-2xl p-6 transform hover:-translate-y-2 transition-all duration-300">
                            <div class="text-gray-500 text-sm mb-2">Threats Blocked</div>
                            <div class="text-4xl font-bold text-gray-900 mb-1">99.9%</div>
                            <div class="text-green-600 text-sm flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                </svg>
                                <span>+12% this month</span>
                            </div>
                            <div class="mt-6 pt-4 border-t border-gray-100">
                                <div class="flex items-center justify-between text-sm mb-2">
                                    <span class="text-gray-500">Success Rate</span>
                                    <span class="text-gray-900 font-semibold">Active</span>
                                </div>
                                <div class="w-full bg-gray-100 rounded-full h-2">
                                    <div class="bg-lime-400 h-2 rounded-full" style="width: 99.9%"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Floating decorative elements -->
                    <div class="absolute -top-8 -right-8 w-20 h-20 bg-lime-400/20 rounded-2xl rotate-12 blur-xl floating-element"></div>
                    <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-2xl -rotate-12 blur-xl floating-element"></div>
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