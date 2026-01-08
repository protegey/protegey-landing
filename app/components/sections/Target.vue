<template>
    <section id="who" ref="whoSection" class="who-protegey-section relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12 md:mb-16 fade-up">
                    <div class="text-blue-600 font-bold mb-3 uppercase tracking-wider text-sm rtl:text-center">{{
                        $t('target.badge') }}</div>
                    <h2
                        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 rtl:text-center">
                        {{ $t('target.title_main') }}
                        <span class="text-blue-600"> {{ $t('target.title_highlight') }} </span>
                        {{ $t('target.title_suffix') }}
                    </h2>
                    <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto rtl:text-center">
                        {{ $t('target.subtitle') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <div v-for="(item, key) in tm('target.items')" :key="key"
                        class="bg-white border border-gray-200 rounded-2xl p-8 text-center group hover:shadow-xl hover:border-blue-200 transition-all duration-300 fade-up">
                        <div
                            class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                            <!-- Switch icon based on key -->
                            <svg v-if="key === 'banks'" class="w-10 h-10 text-blue-600" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            <svg v-else-if="key === 'fintechs'" class="w-10 h-10 text-purple-600" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <svg v-else-if="key === 'payments'" class="w-10 h-10 text-blue-600" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <svg v-else-if="key === 'ecommerce'" class="w-10 h-10 text-green-600" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <svg v-else-if="key === 'telecoms'" class="w-10 h-10 text-orange-600" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-900 rtl:text-center">{{ rt(item.title) }}</h3>
                        <p class="text-gray-600 text-sm rtl:text-center">{{ rt(item.description) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({ isDark: Boolean })
const { t, tm, rt } = useI18n()

const whoSection = ref(null)

onMounted(() => {
    const observerOptions = {
        // small threshold and small negative margin so elements are
        // observed a bit earlier and the animation triggers reliably
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class when element intersects
                entry.target.classList.add('animate-in')
            }
        })
    }, observerOptions)

    if (whoSection.value) {
        const fadeElements = whoSection.value.querySelectorAll('.fade-up')
        // Observe the found elements
        fadeElements.forEach(el => observer.observe(el))

        // Fallback: if the observer does not trigger after a short delay,
        // force the animation so elements are visible. This avoids scenarios
        // where the IntersectionObserver fails to register due to layout or
        // rendering quirks in certain browsers/dev environments.
        const fallbackTimer = setTimeout(() => {
            fadeElements.forEach((el) => {
                if (!el.classList.contains('animate-in')) {
                    // Fallback animate-in applied
                    el.classList.add('animate-in')
                }
            })
        }, 200)

        onUnmounted(() => {
            clearTimeout(fallbackTimer)
        })
    }

    onUnmounted(() => {
        observer.disconnect()
    })
})
</script>

<style scoped>
.fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-up.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.fade-up.delay-100 {
    transition-delay: 0.1s;
}

.fade-up.delay-200 {
    transition-delay: 0.2s;
}

.fade-up.delay-300 {
    transition-delay: 0.3s;
}

.fade-up.delay-400 {
    transition-delay: 0.4s;
}
</style>