<template>
    <section id="who" ref="whoSection" class="who-protegey-section relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
        <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto text-center mb-12 sm:mb-16 fade-up">
                <div :class="[isDark ? 'text-lime-400' : 'text-lime-600', 'font-bold mb-3 sm:mb-4 uppercase tracking-wider text-xs sm:text-sm']">
                    Who We Serve</div>
                <h2
                    :class="[isDark ? 'text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-slate-900']">
                    Built For Africa's Financial Leaders</h2>
                <p
                    :class="[isDark ? 'text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto' : 'text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto']">
                    Trusted by banks, fintechs, and digital platforms protecting millions of transactions
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                <div
                    :class="[isDark ? 'bg-gradient-to-br from-lime-900/20 to-lime-800/10 border-lime-700/30' : 'bg-gradient-to-br from-lime-50 to-emerald-50 border-lime-200', 'p-6 sm:p-8 rounded-xl sm:rounded-2xl border hover:border-lime-400 transition-all text-center group fade-up h-full flex flex-col justify-between']">
                    <div
                        :class="[isDark ? 'bg-lime-400/20' : 'bg-lime-100', 'w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform']">
                        <svg :class="[isDark ? 'text-lime-400' : 'text-lime-600', 'w-8 h-8 sm:w-10 sm:h-10']" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                    </div>
                    <h3 :class="[isDark ? 'text-lg sm:text-xl font-bold mb-2 text-white' : 'text-lg sm:text-xl font-bold mb-2 text-slate-900']">Banks
                    </h3>
                    <p :class="[isDark ? 'text-slate-300 text-xs sm:text-sm' : 'text-slate-700 text-xs sm:text-sm']">Enterprise-grade
                        protection for traditional banking</p>
                </div>

                <div
                    :class="[isDark ? 'bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-700/30' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200', 'p-6 sm:p-8 rounded-xl sm:rounded-2xl border hover:border-purple-400 transition-all text-center group fade-up delay-100 h-full flex flex-col justify-between']">
                    <div
                        :class="[isDark ? 'bg-purple-400/20' : 'bg-purple-100', 'w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform']">
                        <svg :class="[isDark ? 'text-purple-400' : 'text-purple-600', 'w-8 h-8 sm:w-10 sm:h-10']" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 :class="[isDark ? 'text-lg sm:text-xl font-bold mb-2 text-white' : 'text-lg sm:text-xl font-bold mb-2 text-slate-900']">Fintech
                        Startups</h3>
                    <p :class="[isDark ? 'text-slate-300 text-xs sm:text-sm' : 'text-slate-700 text-xs sm:text-sm']">Scale safely with robust
                        fraud prevention</p>
                </div>

                <div
                    :class="[isDark ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-700/30' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200', 'p-6 sm:p-8 rounded-xl sm:rounded-2xl border hover:border-blue-400 transition-all text-center group fade-up delay-200 h-full flex flex-col justify-between']">
                    <div
                        :class="[isDark ? 'bg-blue-400/20' : 'bg-blue-100', 'w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform']">
                        <svg :class="[isDark ? 'text-blue-400' : 'text-blue-600', 'w-8 h-8 sm:w-10 sm:h-10']" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                    <h3 :class="[isDark ? 'text-lg sm:text-xl font-bold mb-2 text-white' : 'text-lg sm:text-xl font-bold mb-2 text-slate-900']">Payment
                        Platforms</h3>
                    <p :class="[isDark ? 'text-slate-300 text-xs sm:text-sm' : 'text-slate-700 text-xs sm:text-sm']">Secure every payment
                        transaction</p>
                </div>

                <div
                    :class="[isDark ? 'bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-700/30' : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200', 'p-6 sm:p-8 rounded-xl sm:rounded-2xl border hover:border-emerald-400 transition-all text-center group fade-up delay-300 h-full flex flex-col justify-between']">
                    <div
                        :class="[isDark ? 'bg-emerald-400/20' : 'bg-emerald-100', 'w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform']">
                        <svg :class="[isDark ? 'text-emerald-400' : 'text-emerald-600', 'w-8 h-8 sm:w-10 sm:h-10']" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h3 :class="[isDark ? 'text-lg sm:text-xl font-bold mb-2 text-white' : 'text-lg sm:text-xl font-bold mb-2 text-slate-900']">
                        E-commerce</h3>
                    <p :class="[isDark ? 'text-slate-300 text-xs sm:text-sm' : 'text-slate-700 text-xs sm:text-sm']">Protect online
                        transactions and customers</p>
                </div>

                <div
                    :class="[isDark ? 'bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-700/30' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200', 'p-6 sm:p-8 rounded-xl sm:rounded-2xl border hover:border-orange-400 transition-all text-center group fade-up delay-400 h-full flex flex-col justify-between']">
                    <div
                        :class="[isDark ? 'bg-orange-400/20' : 'bg-orange-100', 'w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform']">
                        <svg :class="[isDark ? 'text-orange-400' : 'text-orange-600', 'w-8 h-8 sm:w-10 sm:h-10']" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 :class="[isDark ? 'text-lg sm:text-xl font-bold mb-2 text-white' : 'text-lg sm:text-xl font-bold mb-2 text-slate-900']">Telecom
                        Operators</h3>
                    <p :class="[isDark ? 'text-slate-300 text-xs sm:text-sm' : 'text-slate-700 text-xs sm:text-sm']">Secure mobile money
                        services</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({ isDark: Boolean })

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