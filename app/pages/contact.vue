<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden">
        <!-- ── Hero ──────────────────────────────────────────── -->
        <section class="relative pt-20 pb-10 md:pt-28 md:pb-16 overflow-hidden">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            
            <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
            <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div class="container mx-auto px-4 max-w-7xl relative z-10">
                <div class="max-w-4xl">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                        Get in Touch
                    </div>
                    <h1 class="hero-headline text-4xl lg:text-5xl font-bold tracking-tighter mb-6 leading-[1.1]">
                        {{ $t('contact.title') }}
                    </h1>
                    <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl font-medium leading-relaxed mb-8">
                        {{ $t('contact.subtitle') }}
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <!-- Contact Cards -->
                    <div class="space-y-6">
                        <div data-reveal class="group p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-500">
                            <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-6">
                                <HugeiconsIcon :icon="Mail01Icon" :size="24" class="text-primary-400" />
                            </div>
                            <h3 class="text-neutral-900 dark:text-white font-bold text-lg mb-2">{{ $t('contact.email') }}</h3>
                            <a href="mailto:hello@protegey.com" class="text-neutral-500 dark:text-neutral-400 hover:text-primary-400 transition-colors text-base font-medium">
                                hello@protegey.com
                            </a>
                        </div>

                        <div data-reveal class="group p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-500" style="--delay:100ms">
                            <div class="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center mb-6">
                                <HugeiconsIcon :icon="Location01Icon" :size="24" class="text-secondary-400" />
                            </div>
                            <h3 class="text-neutral-900 dark:text-white font-bold text-lg mb-2">{{ $t('contact.location') }}</h3>
                            <p class="text-neutral-500 dark:text-neutral-400 text-base font-medium">
                                651 N Broad St, Middletown, 19709 Delaware, United States.
                            </p>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div data-reveal class="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-6 md:p-10 relative overflow-hidden" style="--delay:200ms">
                        <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 opacity-50" />
                        
                        <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-8">{{ $t('contact.form.title') }}</h3>
                        
                        <form @submit.prevent="handleSubmit" class="space-y-5">
                            <div class="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label for="contact-name" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('contact.form.name') }}</label>
                                    <input id="contact-name" v-model="formData.name" type="text" required
                                        class="w-full px-4 py-3 bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-1 focus:ring-primary-500/50 transition-all outline-none"
                                        :placeholder="$t('contact.form.name_placeholder')">
                                </div>
                                <div>
                                    <label for="contact-email" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('contact.form.email') }}</label>
                                    <input id="contact-email" v-model="formData.email" type="email" required
                                        class="w-full px-4 py-3 bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-1 focus:ring-primary-500/50 transition-all outline-none"
                                        :placeholder="$t('contact.form.email_placeholder')">
                                </div>
                            </div>
                            <div>
                                <label for="contact-phone" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('contact.form.phone') }}</label>
                                <input id="contact-phone" v-model="formData.phone" type="tel"
                                    class="w-full px-4 py-3 bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-1 focus:ring-primary-500/50 transition-all outline-none"
                                    :placeholder="$t('contact.form.phone_placeholder')">
                            </div>
                            <div>
                                <label for="contact-message" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('contact.form.message') }}</label>
                                <textarea id="contact-message" v-model="formData.message" rows="5" required
                                    class="w-full px-4 py-3 bg-white/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-1 focus:ring-primary-500/50 transition-all outline-none resize-none"
                                    :placeholder="$t('contact.form.message_placeholder')"></textarea>
                            </div>
                            
                            <button type="submit" :disabled="isSubmitting"
                                class="w-full py-4 bg-primary-400 hover:bg-primary-300 text-neutral-950 font-bold rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-primary-500/10 mt-4">
                                <span>{{ isSubmitting ? $t('contact.form.submitting') : $t('contact.form.submit') }}</span>
                                <HugeiconsIcon :icon="ArrowRight01Icon" :size="20" v-if="!isSubmitting" />
                            </button>

                            <div v-if="submitMessage" class="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-bold text-center mt-4">
                                {{ submitMessage }}
                            </div>
                            <div v-if="submitError" class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold text-center mt-4">
                                {{ submitError }}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Mail01Icon, Location01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, locale } = useI18n()

const formData = ref({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref('')

const handleSubmit = async () => {
    submitMessage.value = ''
    submitError.value = ''
    isSubmitting.value = true

    try {
        const res = await $fetch('/api/contact', {
            method: 'POST',
            body: { ...formData.value, lang: locale.value }
        })

        if (res.success) {
            submitMessage.value = t('contact.form.success')
            formData.value = { name: '', email: '', phone: '', country: '', message: '' }
        }
    } catch (err) {
        console.error('Failed to submit contact form:', err)
        submitError.value = (err && err.statusCode === 429) ? t('contact.form.error_rate_limit') : t('contact.form.error')
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from('.hero-headline', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
    })

    const reveals = gsap.utils.toArray('[data-reveal]')
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: el.dataset.delay ? parseFloat(el.dataset.delay) / 1000 : 0
        })
    })
})

useSeoMeta({
    title: t('seo.contact.title'),
    ogTitle: t('seo.contact.title'),
    description: t('seo.contact.description')
})
</script>

<style scoped>
.hero-headline {
    background: linear-gradient(135deg, #0B1741 0%, #0cb99e 40%, #1b59ae 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

[data-reveal] {
    will-change: transform, opacity;
}
</style>
