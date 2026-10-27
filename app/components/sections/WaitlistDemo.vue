<script setup>
import { ref, onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Shield01Icon, ZapIcon, CheckmarkCircle01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountrySelect from '~/components/ui/CountrySelect.vue'

const { locale } = useI18n()
defineProps({ isDark: Boolean })
const { t } = useI18n()

const formData = ref({
    name: '',
    email: '',
    country: '',
    company: '',
    message: ''
})

const ctaSection = ref(null)

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref('')

const handleSubmit = async () => {
    submitMessage.value = ''
    submitError.value = ''

    if (!formData.value.name || !formData.value.email) {
        submitError.value = t('waitlist.errors.name_email')
        return
    }

    if (!formData.value.country) {
        submitError.value = t('waitlist.errors.country')
        return
    }

    const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'protons.me', 'mail.com', 'zoho.com', 'yandex.com', 'live.com']
    const emailDomain = formData.value.email.split('@')[1]?.toLowerCase()

    if (publicDomains.includes(emailDomain)) {
        submitError.value = t('waitlist.errors.company_email')
        return
    }

    isSubmitting.value = true

    try {
        const payload = { ...formData.value, lang: locale.value }
        const res = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            if (res.status === 429) {
                submitError.value = t('waitlist.errors.rate_limit')
                return
            }
            throw new Error(await res.text())
        }

        const data = await res.json()
        submitMessage.value = data.message || t('waitlist.success_message')

        if (!data.isDuplicate) {
            formData.value = { name: '', email: '', country: '', company: '', message: '' }
        }
    } catch (err) {
        console.error('Failed to submit form', err)
        submitError.value = t('waitlist.errors.submit_error')
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    const reveals = gsap.utils.toArray('[data-reveal]')
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: el.dataset.delay ? parseFloat(el.dataset.delay) / 1000 : 0
        })
    })
})
</script>

<template>
    <section id="waitlist" ref="ctaSection"
        class="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950 overflow-hidden border-t border-neutral-200 dark:border-neutral-900">
        <!-- Background Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div class="absolute top-0 left-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto relative z-10">
            <div class="text-center mb-16 px-4">
                <div data-reveal class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
                    {{ $t('waitlist.badge') }}
                </div>
                <h2 data-reveal class="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white leading-tight">
                    {{ $t('waitlist.title1') }}
                    <span class="text-primary-400 block sm:inline">{{ $t('waitlist.title2') }}</span>
                </h2>
                <p data-reveal class="text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto font-medium" style="--delay:100ms">
                    {{ $t('waitlist.subtitle') }}
                </p>
            </div>

            <div data-reveal class="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 rounded-[2rem] p-6 md:p-10 relative overflow-hidden" style="--delay:200ms">
                <!-- Premium Scanner Header -->
                <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 opacity-50" />

                <form @submit.prevent="handleSubmit" class="space-y-6 relative z-10">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="name"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.name') }}</label>
                            <input id="name" v-model="formData.name" type="text" required
                                :placeholder="$t('waitlist.form.name_placeholder')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                        </div>
                        <div>
                            <label for="email"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.email') }}</label>
                            <input id="email" v-model="formData.email" type="email" required
                                :placeholder="$t('waitlist.form.email_placeholder')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="company"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.company') }}</label>
                            <input id="company" v-model="formData.company" type="text"
                                :placeholder="$t('waitlist.form.company_placeholder')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                        </div>
                        <div>
                            <label for="country"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.country') }}</label>
                            <CountrySelect v-model="formData.country" input-id="country"
                                :placeholder="$t('waitlist.form.country_placeholder')" />
                        </div>
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
                            $t('waitlist.form.message') }}</label>
                        <textarea id="message" v-model="formData.message" rows="3"
                            :placeholder="$t('waitlist.form.message_placeholder')"
                            class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all resize-none bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right"></textarea>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-200 dark:border-white/5">
                        <button type="submit" :disabled="isSubmitting"
                            :class="['flex-1 px-8 py-3.5 rounded-2xl font-bold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl rtl:flex-row-reverse',
                                isSubmitting ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed' : 'bg-primary-400 hover:bg-primary-300 text-neutral-950']">
                            <svg v-if="isSubmitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <HugeiconsIcon v-else :icon="ArrowRight01Icon" :size="20" class="rtl:rotate-180" />
                            <span>{{ isSubmitting ? $t('waitlist.form.submitting') : $t('waitlist.form.submit') }}</span>
                        </button>
                    </div>

                    <!-- Trust Signals -->
                    <div class="flex flex-wrap items-center justify-center gap-8 mt-10 opacity-30 grayscale contrast-125">
                        <div class="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                            <HugeiconsIcon :icon="Shield01Icon" :size="14" />
                            {{ $t('waitlist.trust.gdpr') }}
                        </div>
                        <div class="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                            <HugeiconsIcon :icon="ZapIcon" :size="14" />
                            {{ $t('waitlist.trust.iso') }}
                        </div>
                        <div class="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                            <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="14" />
                            {{ $t('waitlist.trust.bank_grade') }}
                        </div>
                    </div>

                    <div v-if="submitMessage" role="status" aria-live="polite"
                        class="text-center text-primary-400 font-bold mt-8 bg-primary-500/10 py-5 px-6 rounded-2xl border border-primary-500/20">
                        {{ submitMessage }}
                    </div>

                    <div v-if="submitError" role="alert" aria-live="assertive"
                        class="text-center text-red-400 font-bold mt-8 bg-red-500/10 py-5 px-6 rounded-2xl border border-red-500/20">
                        {{ submitError }}
                    </div>

                    <p class="text-center text-xs text-neutral-500 dark:text-neutral-500 mt-8 font-medium">
                        {{ $t('waitlist.privacy') }}
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>

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

input, select, textarea {
    border-radius: 12px !important;
    @apply text-sm !important;
    @apply px-4 py-2.5 !important;
}

/* RTL handling for select arrow */
[dir="rtl"] select {
    background-position: left 1rem center;
}
</style>