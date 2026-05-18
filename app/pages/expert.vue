<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Mail01Icon, Location01Icon, ArrowRight01Icon, Clock01Icon, LinkedinIcon } from '@hugeicons/core-free-icons'

const { t, locale } = useI18n()
const baseUrl = 'https://www.protey.com'

usePageMeta({
    title: t('seo.expert.title'),
    description: t('seo.expert.description'),
    schemaOrg: [
        {
            '@type': 'ContactPage',
            name: t('seo.expert.title'),
            description: t('seo.expert.description'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('seo.expert.title'), item: `${baseUrl}/expert` }
            ]
        }
    ]
})

const formData = ref({
    name: '',
    email: '',
    company: '',
    role: '',
    topic: '',
    message: ''
})

const topicOptions = computed(() => [
    { value: 'AML & Regulatory Compliance', label: t('expert.topics.aml'), description: t('expert.topics.aml_desc') },
    { value: 'Transaction Monitoring & Fraud Rules', label: t('expert.topics.transaction'), description: t('expert.topics.transaction_desc') },
    { value: 'KYC, KYB & Customer Risk Reviews', label: t('expert.topics.kyc'), description: t('expert.topics.kyc_desc') },
    { value: 'Fraud Investigation & Case Management', label: t('expert.topics.fraud'), description: t('expert.topics.fraud_desc') },
    { value: 'Risk Assessment & Compliance Program Design', label: t('expert.topics.risk'), description: t('expert.topics.risk_desc') }
])

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref('')
const topicDropdownOpen = ref(false)
const topicButtonRef = ref<HTMLElement | null>(null)
const topicDropdownRef = ref<HTMLElement | null>(null)
const dropdownPosition = ref({ top: 0, left: 0, width: 0 })

const selectedTopicLabel = computed(() =>
    topicOptions.value.find(o => o.value === formData.value.topic)?.label ?? ''
)

const updateDropdownPosition = () => {
    if (topicButtonRef.value) {
        const rect = topicButtonRef.value.getBoundingClientRect()
        dropdownPosition.value = {
            top: rect.bottom + 8,
            left: rect.left,
            width: rect.width
        }
    }
}

const handleClickOutside = (e: MouseEvent) => {
    if (!topicDropdownOpen.value) return
    const target = e.target as Node
    const insideButton = topicButtonRef.value?.contains(target)
    const insideDropdown = topicDropdownRef.value?.contains(target)
    if (!insideButton && !insideDropdown) {
        topicDropdownOpen.value = false
    }
}

const handleRepositionDropdown = () => {
    if (topicDropdownOpen.value) updateDropdownPosition()
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleRepositionDropdown, true)
    window.addEventListener('resize', handleRepositionDropdown)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('scroll', handleRepositionDropdown, true)
    window.removeEventListener('resize', handleRepositionDropdown)
})

const toggleTopicDropdown = () => {
    topicDropdownOpen.value = !topicDropdownOpen.value
    if (topicDropdownOpen.value) {
        nextTick(() => updateDropdownPosition())
    }
}

const handleSubmit = async () => {
    submitMessage.value = ''
    submitError.value = ''

    if (!formData.value.name || !formData.value.email) {
        submitError.value = t('expert.errors.name_email')
        return
    }

    if (!formData.value.topic) {
        submitError.value = t('expert.errors.topic')
        return
    }

    isSubmitting.value = true

    try {
        const payload = { ...formData.value, type: 'expert_request', lang: locale.value }
        const res = await fetch('/api/expert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            if (res.status === 429) {
                submitError.value = t('expert.errors.rate_limit')
                return
            }
            throw new Error(await res.text())
        }

        const data = await res.json()
        submitMessage.value = data.message || t('expert.success_message')
        formData.value = { name: '', email: '', company: '', role: '', topic: '', message: '' }
    } catch (err) {
        console.error('Failed to submit form', err)
        submitError.value = t('expert.errors.submit_error')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden">
        <section class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            
            <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
            <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div class="container mx-auto px-4 max-w-7xl relative z-10">
                <div class="max-w-4xl text-center mx-auto mb-16">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-10 uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                        {{ $t('expert.eyebrow') }}
                    </div>
                    <h1 class="hero-headline text-4xl lg:text-5xl font-bold tracking-tighter mb-8 leading-[1.1]">
                        {{ $t('expert.title') }}
                    </h1>
                    <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        {{ $t('expert.subtitle') }}
                    </p>
                </div>

                <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    <div class="lg:col-span-2 space-y-4">
                        <div class="group p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 hover:border-primary-500/30 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-500">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center shrink-0">
                                    <HugeiconsIcon :icon="Mail01Icon" :size="24" class="text-primary-400" />
                                </div>
                                <div>
                                    <p class="text-neutral-900 dark:text-white font-bold mb-1">{{ $t('expert.email') }}</p>
                                    <a href="mailto:experts@protegey.com" class="text-neutral-500 dark:text-neutral-400 hover:text-primary-400 transition-colors text-sm font-medium">
                                        hello@protegey.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center shrink-0">
                                    <HugeiconsIcon :icon="Location01Icon" :size="24" class="text-secondary-400" />
                                </div>
                                <div>
                                    <p class="text-neutral-900 dark:text-white font-bold mb-3">{{ $t('expert.location') }}</p>
                                    <div class="space-y-3">
                                        <div class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                                            <p class="text-xs font-bold text-primary-400 uppercase tracking-wider mb-1">{{ $t('expert.hq') }}</p>
                                            <p class="text-neutral-500 dark:text-neutral-400 text-sm font-medium leading-relaxed">
                                                131 Continental Dr, Suite 305<br>
                                                City of Newark, New Castle, Delaware 19713<br>
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-gradient-to-br from-primary-500/5 to-secondary-500/5">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center shrink-0">
                                    <HugeiconsIcon :icon="Clock01Icon" :size="24" class="text-primary-400" />
                                </div>
                                <div>
                                    <p class="text-neutral-900 dark:text-white font-bold mb-1">{{ $t('expert.availability') }}</p>
                                    <p class="text-neutral-500 dark:text-neutral-400 text-sm font-medium leading-relaxed">
                                        {{ $t('expert.availability_desc') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-3 bg-white dark:bg-neutral-900/60 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-6 md:p-10 relative">
                        <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 opacity-50" />
                        
                        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-8">{{ $t('expert.form.title') }}</h2>
                        
                        <form @submit.prevent="handleSubmit" class="space-y-5">
                            <div class="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label for="expert-name" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('expert.form.name') }}</label>
                                    <input id="expert-name" v-model="formData.name" type="text" required
                                        class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                        :placeholder="$t('expert.form.name_placeholder')">
                                </div>
                                <div>
                                    <label for="expert-email" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('expert.form.email') }}</label>
                                    <input id="expert-email" v-model="formData.email" type="email" required
                                        class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                        :placeholder="$t('expert.form.email_placeholder')">
                                </div>
                            </div>
                            <div class="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label for="expert-company" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('expert.form.company') }}</label>
                                    <input id="expert-company" v-model="formData.company" type="text"
                                        class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                        :placeholder="$t('expert.form.company_placeholder')">
                                </div>
                                <div>
                                    <label for="expert-role" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('expert.form.role') }}</label>
                                    <input id="expert-role" v-model="formData.role" type="text"
                                        class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                        :placeholder="$t('expert.form.role_placeholder')">
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('expert.form.topic') }}</label>
                                <div class="relative">
                                    <button type="button" ref="topicButtonRef" @click="toggleTopicDropdown"
                                        class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-left focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none flex items-center justify-between">
                                        <span :class="formData.topic ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'">
                                            {{ formData.topic ? selectedTopicLabel : $t('expert.form.topic_placeholder') }}
                                        </span>
                                        <svg class="w-5 h-5 text-neutral-400 transition-transform" :class="{ 'rotate-180': topicDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <Teleport to="body">
                                        <div v-if="topicDropdownOpen" ref="topicDropdownRef" class="fixed z-[9999] bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl overflow-y-auto max-h-80" :style="{ top: dropdownPosition.top + 'px', left: dropdownPosition.left + 'px', width: dropdownPosition.width + 'px' }">
                                            <button v-for="opt in topicOptions" :key="opt.value" type="button"
                                                @click="formData.topic = opt.value; topicDropdownOpen = false"
                                                class="w-full px-4 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 transition-colors">
                                                <div class="font-medium text-neutral-900 dark:text-white text-sm">{{ opt.label }}</div>
                                                <div class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">{{ opt.description }}</div>
                                            </button>
                                        </div>
                                    </Teleport>
                                </div>
                            </div>
                            <div>
                                <label for="expert-message" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('expert.form.message') }}</label>
                                <textarea id="expert-message" v-model="formData.message" rows="4"
                                    class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none resize-none"
                                    :placeholder="$t('expert.form.message_placeholder')"></textarea>
                            </div>
                            
                            <button type="submit" :disabled="isSubmitting"
                                class="w-full py-4 bg-primary-400 hover:bg-primary-300 text-neutral-950 font-bold rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-primary-500/10 mt-4">
                                <svg v-if="isSubmitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <HugeiconsIcon v-else :icon="ArrowRight01Icon" :size="20" />
                                <span>{{ isSubmitting ? $t('expert.form.submitting') : $t('expert.form.submit') }}</span>
                            </button>

                            <div v-if="submitMessage" role="status" aria-live="polite" class="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-bold text-center mt-4">
                                {{ submitMessage }}
                            </div>
                            <div v-if="submitError" role="alert" aria-live="assertive" class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold text-center mt-4">
                                {{ submitError }}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
