<script setup>
import { ref, onMounted, computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Shield01Icon, ZapIcon, CheckmarkCircle01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { locale } = useI18n()
defineProps({ isDark: Boolean })
const { t } = useI18n()

const formData = ref({
    title: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    role: '',
    businessModel: '',
    stage: '',
    sector: '',
    painPoints: [],
    otherPainPoint: '',
    interestType: '',
    message: ''
})

const titleOptions = computed(() => [
    { value: 'Mr.', label: t('waitlist.titles.mr') },
    { value: 'Mrs.', label: t('waitlist.titles.mrs') }
])

const ctaSection = ref(null)

const roleOptions = computed(() => [
    { value: 'CEO / Founder', label: t('waitlist.roles.ceo') },
    { value: 'CTO / Tech Lead', label: t('waitlist.roles.cto') },
    { value: 'Product Manager', label: t('waitlist.roles.product') },
    { value: 'Risk / Compliance', label: t('waitlist.roles.risk') },
    { value: 'Other', label: t('waitlist.roles.other') }
])

const businessModelOptions = computed(() => [
    { value: 'B2B', label: t('waitlist.business_models.b2b') },
    { value: 'B2C', label: t('waitlist.business_models.b2c') },
    { value: 'B2B2C', label: t('waitlist.business_models.b2b2c') },
    { value: 'Other', label: t('waitlist.business_models.other') }
])

const stageOptions = computed(() => [
    { value: '1-1000', label: t('waitlist.stages.range_1') },
    { value: '1001 to 5000', label: t('waitlist.stages.range_2') },
    { value: '5001 to 10,000', label: t('waitlist.stages.range_3') },
    { value: '+10,000', label: t('waitlist.stages.range_4') }
])

const sectorOptions = computed(() => [
    { value: 'Fintech', label: t('waitlist.sectors.fintech') },
    { value: 'Bank', label: t('waitlist.sectors.bank') },
    { value: 'MFi', label: t('waitlist.sectors.mfi') },
    { value: 'Digital Lender', label: t('waitlist.sectors.digital_lender') },
    { value: 'E-commerce', label: t('waitlist.sectors.ecommerce') },
    { value: 'Govt Agency', label: t('waitlist.sectors.govt') },
    { value: 'Other', label: t('waitlist.sectors.other') }
])

const painPointOptions = computed(() => [
    { value: 'Risk and Compliance', label: t('waitlist.pain_points.risk') },
    { value: 'Fraud Detection', label: t('waitlist.pain_points.fraud') },
    { value: 'ID Verification', label: t('waitlist.pain_points.id') },
    { value: 'AML/Transaction Monitoring', label: t('waitlist.pain_points.aml') },
    { value: 'Other', label: t('waitlist.pain_points.other') }
])

const interestOptions = computed(() => [
    { value: 'Early Access', label: t('waitlist.interests.early_access') },
    { value: 'Integration', label: t('waitlist.interests.integration') },
    { value: 'Partnership', label: t('waitlist.interests.partnership') },
    { value: 'Security Review', label: t('waitlist.interests.security') },
    { value: 'Other', label: t('waitlist.interests.other') }
])

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

    if (!formData.value.interestType) {
        submitError.value = t('waitlist.errors.interest')
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
            formData.value = { title: '', name: '', email: '', phone: '', country: '', company: '', role: '', businessModel: '', stage: '', sector: '', painPoints: [], otherPainPoint: '', interestType: '', message: '' }
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
                    <div class="grid md:grid-cols-3 gap-6">
                        <div>
                            <label for="title"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.title') }}</label>
                            <select id="title" v-model="formData.title"
                                :aria-label="$t('waitlist.form.title')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white rtl:text-right">
                                <option value="" disabled class="bg-white dark:bg-neutral-900">{{
                                    $t('waitlist.form.title_placeholder') }}</option>
                                <option v-for="option in titleOptions" :key="option.value" :value="option.value"
                                    class="bg-white dark:bg-neutral-900">{{ option.label }}</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label for="name"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.name') }}</label>
                            <input id="name" v-model="formData.name" type="text" required
                                :placeholder="$t('waitlist.form.name_placeholder')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                        </div>
                    </div>
                    <div>
                        <label for="email"
                            class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                $t('waitlist.form.email') }}</label>
                        <input id="email" v-model="formData.email" type="email" required
                            :placeholder="$t('waitlist.form.email_placeholder')"
                            class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="phone"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.phone') }}</label>
                            <input id="phone" v-model="formData.phone" type="tel"
                                :placeholder="$t('waitlist.form.phone_placeholder')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                        </div>
                        <div>
                            <label for="country"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.country') }}</label>
                            <input id="country" v-model="formData.country" type="text" required
                                :placeholder="$t('waitlist.form.country_placeholder')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                        </div>
                    </div>

                    <div>
                        <label for="company"
                            class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                $t('waitlist.form.company') }}</label>
                        <input id="company" v-model="formData.company" type="text" required
                            :placeholder="$t('waitlist.form.company_placeholder')"
                            class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                    </div>

                    <div>
                        <label for="role" class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                            $t('waitlist.form.role') }}</label>
                        <select id="role" v-model="formData.role" required :aria-label="$t('waitlist.form.role')"
                            class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white rtl:text-right">
                            <option value="" disabled class="bg-white dark:bg-neutral-900">{{
                                $t('waitlist.form.role_placeholder') }}</option>
                            <option v-for="option in roleOptions" :key="option.value" :value="option.value"
                                class="bg-white dark:bg-neutral-900">{{ option.label }}</option>
                        </select>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="businessModel"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.business_model') }}</label>
                            <select id="businessModel" v-model="formData.businessModel" required
                                :aria-label="$t('waitlist.form.business_model')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white rtl:text-right">
                                <option value="" disabled class="bg-white dark:bg-neutral-900">{{
                                    $t('waitlist.form.business_model_placeholder')
                                }}</option>
                                <option v-for="option in businessModelOptions" :key="option.value" :value="option.value"
                                    class="bg-white dark:bg-neutral-900">{{ option.label }}</option>
                            </select>
                        </div>
                        <div>
                            <label for="stage"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.stage') }}</label>
                            <select id="stage" v-model="formData.stage" required :aria-label="$t('waitlist.form.stage')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white rtl:text-right">
                                <option value="" disabled class="bg-white dark:bg-neutral-900">{{
                                    $t('waitlist.form.stage_placeholder')
                                    }}</option>
                                <option v-for="option in stageOptions" :key="option.value" :value="option.value"
                                    class="bg-white dark:bg-neutral-900">{{ option.label }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="sector"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.sector') }}</label>
                            <select id="sector" v-model="formData.sector" required
                                :aria-label="$t('waitlist.form.sector')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white rtl:text-right">
                                <option value="" disabled class="bg-white dark:bg-neutral-900">{{
                                    $t('waitlist.form.sector_placeholder')
                                    }}</option>
                                <option v-for="option in sectorOptions" :key="option.value" :value="option.value"
                                    class="bg-white dark:bg-neutral-900">{{ option.label }}</option>
                            </select>
                        </div>
                        <div>
                            <label for="interestType"
                                class="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400 rtl:text-right">{{
                                    $t('waitlist.form.interest') }}</label>
                            <select id="interestType" v-model="formData.interestType" required
                                :aria-label="$t('waitlist.form.interest')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white rtl:text-right">
                                <option value="" disabled class="bg-white dark:bg-neutral-900">{{
                                    $t('waitlist.form.interest_placeholder')
                                }}</option>
                                <option v-for="option in interestOptions" :key="option.value" :value="option.value"
                                    class="bg-white dark:bg-neutral-900">{{ option.label }}</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-3 text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
                            $t('waitlist.form.pain_points') }}</label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <label v-for="option in painPointOptions" :key="option.value"
                                class="flex items-center gap-3 p-2.5 bg-neutral-100/80 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/50 rounded-xl cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors rtl:flex-row-reverse">
                                <input type="checkbox" :value="option.value" v-model="formData.painPoints"
                                    class="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-primary-500 focus:ring-primary-500 focus:ring-offset-0">
                                <span class="text-xs text-neutral-600 dark:text-neutral-300 font-medium rtl:text-right">{{ option.label
                                    }}</span>
                            </label>
                        </div>
                    </div>

                    <div v-if="formData.painPoints.includes('Other')">
                        <label for="otherPainPoint"
                            class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
                                $t('waitlist.form.other_pain_point') }}</label>
                        <textarea id="otherPainPoint" v-model="formData.otherPainPoint" rows="3"
                            :placeholder="$t('waitlist.form.other_pain_point_placeholder')"
                            class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right"></textarea>
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
                            $t('waitlist.form.message') }}</label>
                        <textarea id="message" v-model="formData.message" rows="4"
                            :placeholder="$t('waitlist.form.message_placeholder')"
                            class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right"></textarea>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 pt-10 border-t border-neutral-200 dark:border-white/5">
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
    @apply focus:ring-0 !important;
    border-radius: 12px !important;
    @apply text-sm !important;
    @apply px-4 py-2.5 !important;
}

/* RTL handling for select arrow */
[dir="rtl"] select {
    background-position: left 1rem center;
}
</style>