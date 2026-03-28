<script setup>
import { ref, onMounted, computed } from 'vue'
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
    { value: 'Mrs.', label: t('waitlist.titles.mrs') },
    // { value: 'Ms.', label: t('waitlist.titles.ms') },
    // { value: 'Dr.', label: t('waitlist.titles.dr') }
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

defineEmits(['scrollToJoin'])

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref('')

const handleSubmit = async () => {
    // Reset messages
    submitMessage.value = ''
    submitError.value = ''

    // Basic validation: ensure name + email present and interest selected for waitlist
    if (!formData.value.name || !formData.value.email) {
        submitError.value = t('waitlist.errors.name_email')
        return
    }

    if (!formData.value.interestType) {
        submitError.value = t('waitlist.errors.interest')
        return
    }

    // Company email validation
    const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com', 'live.com']
    const emailDomain = formData.value.email.split('@')[1]?.toLowerCase()

    if (publicDomains.includes(emailDomain)) {
        submitError.value = t('waitlist.errors.company_email')
        return
    }

    isSubmitting.value = true

    try {
        // Minimal API post to /api/waitlist — server should accept interest/message fields
        const payload = { ...formData.value, lang: locale.value }
        const res = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) throw new Error(await res.text())

        const data = await res.json()

        if (data.message) {
            submitMessage.value = data.message
        } else {
            submitMessage.value = t('waitlist.success_message')
        }

        if (!data.isDuplicate) {
            formData.value = {
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
            }
        }
    } catch (err) {
        console.error('Failed to submit form', err)
        submitError.value = t('waitlist.errors.submit_error')
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in')
            }
        })
    }, observerOptions)

    if (ctaSection.value) {
        const fadeElements = ctaSection.value.querySelectorAll('.fade-up')
        fadeElements.forEach(el => observer.observe(el))

        // Fallback: force animation after a short delay to ensure visibility
        setTimeout(() => {
            fadeElements.forEach(el => {
                if (!el.classList.contains('animate-in')) {
                    el.classList.add('animate-in')
                }
            })
        }, 300)
    }
})
</script>

<template>
    <section id="waitlist" ref="ctaSection"
        class="relative py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950 overflow-hidden border-t border-neutral-200 dark:border-neutral-900">
        <!-- Background Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div class="absolute top-0 left-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto relative z-10">
            <div class="text-center mb-12 fade-up">
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">
                    {{ $t('waitlist.title1') }}
                </h2>
                <h3 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span class="text-primary-400">{{ $t('waitlist.title2') }}</span>
                    <span class="text-neutral-900 dark:text-white"> {{ $t('waitlist.title3') }}</span>
                </h3>
                <p class="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                    {{ $t('waitlist.subtitle') }}
                </p>
            </div>

            <div
                class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-8 md:p-12 fade-up delay-200 relative overflow-hidden">
                <!-- Glow effect -->
                <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500">
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-6 relative z-10">
                    <div class="grid md:grid-cols-3 gap-6">
                        <div>
                            <label for="title"
                                class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
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
                                class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
                                    $t('waitlist.form.name') }}</label>
                            <input id="name" v-model="formData.name" type="text" required
                                :placeholder="$t('waitlist.form.name_placeholder')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                        </div>
                    </div>
                    <div>
                        <label for="email"
                            class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
                                $t('waitlist.form.email') }}</label>
                        <input id="email" v-model="formData.email" type="email" required
                            :placeholder="$t('waitlist.form.email_placeholder')"
                            class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="phone"
                                class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
                                    $t('waitlist.form.phone') }}</label>
                            <input id="phone" v-model="formData.phone" type="tel"
                                :placeholder="$t('waitlist.form.phone_placeholder')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                        </div>
                        <div>
                            <label for="country"
                                class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
                                    $t('waitlist.form.country') }}</label>
                            <input id="country" v-model="formData.country" type="text" required
                                :placeholder="$t('waitlist.form.country_placeholder')"
                                class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                        </div>
                    </div>

                    <div>
                        <label for="company"
                            class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
                                $t('waitlist.form.company') }}</label>
                        <input id="company" v-model="formData.company" type="text" required
                            :placeholder="$t('waitlist.form.company_placeholder')"
                            class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 rtl:text-right" />
                    </div>

                    <div>
                        <label for="role" class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
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
                                class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
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
                                class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
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
                                class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
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
                                class="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-600 dark:text-neutral-300 rtl:text-right">{{
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
                                class="flex items-center gap-3 p-3 bg-neutral-100/80 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/50 rounded-xl cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors rtl:flex-row-reverse">
                                <input type="checkbox" :value="option.value" v-model="formData.painPoints"
                                    class="w-5 h-5 rounded border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-primary-500 focus:ring-primary-500 focus:ring-offset-0">
                                <span class="text-sm text-neutral-600 dark:text-neutral-300 font-medium rtl:text-right">{{ option.label
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

                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <button type="submit" :disabled="isSubmitting"
                            :class="['flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 rtl:flex-row-reverse',
                                isSubmitting ? 'opacity-60 cursor-not-allowed bg-neutral-700 text-neutral-400' : 'bg-primary-500 hover:bg-primary-400 text-neutral-950']">
                            <span>{{ isSubmitting ? $t('waitlist.form.submitting') : $t('waitlist.form.submit')
                            }}</span>
                            <svg class="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                    <div v-if="submitMessage"
                        class="text-center text-primary-400 font-medium mt-4 bg-primary-500/10 py-3 px-4 rounded-lg border border-primary-500/20">
                        {{ submitMessage }}
                    </div>

                    <div v-if="submitError"
                        class="text-center text-red-400 font-medium mt-4 bg-red-500/10 py-3 px-4 rounded-lg border border-red-500/20">
                        {{ submitError }}
                    </div>

                    <p class="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
                        {{ $t('waitlist.privacy') }}
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>

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

.fade-up.delay-200 {
    transition-delay: 0.2s;
}
</style>