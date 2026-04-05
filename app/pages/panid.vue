<script setup lang="ts">
import { ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { FingerPrintIcon, ArrowRight01Icon, UserIcon, Building02Icon, DocumentCodeIcon, CheckmarkCircle01Icon, Shield01Icon, Globe02Icon, TimeIcon } from '@hugeicons/core-free-icons'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const baseUrl = 'https://www.protegey.com'

usePageMeta({
    title: t('seo.panid.title'),
    description: t('seo.panid.description'),
    schemaOrg: [
        {
            '@type': 'Product',
            name: 'PAN-ID',
            description: t('seo.panid.description'),
            brand: { '@type': 'Brand', name: 'Protegey' }
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('seo.panid.title'), item: `${baseUrl}/panid` }
            ]
        }
    ]
})

const formData = ref({
    name: '',
    email: '',
    company: '',
    phone: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref('')

const handleSubmit = async () => {
    submitMessage.value = ''
    submitError.value = ''

    if (!formData.value.name || !formData.value.email) {
        submitError.value = t('panid.errors.name_email')
        return
    }

    isSubmitting.value = true

    try {
        const payload = { 
            ...formData.value, 
            interestType: 'panid_early_access',
            type: 'waitlist',
            lang: locale.value
        }
        const res = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            if (res.status === 429) {
                submitError.value = t('panid.errors.rate_limit')
                return
            }
            throw new Error(await res.text())
        }

        const data = await res.json()
        submitMessage.value = data.message || t('panid.success_message')
        formData.value = { name: '', email: '', company: '', phone: '' }
    } catch (err) {
        console.error('Failed to submit form', err)
        submitError.value = t('panid.errors.submit_error')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden">
        <section class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            
            <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div class="container mx-auto px-4 max-w-7xl relative z-10">
                <div class="max-w-4xl text-center mx-auto mb-16">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-cyan-500/20 bg-accent-cyan-500/5 text-accent-cyan-400 text-[10px] font-bold tracking-[0.2em] mb-10 uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-accent-cyan-400 animate-pulse" />
                        {{ $t('panid.eyebrow') }}
                    </div>
                    <h1 class="text-4xl lg:text-5xl font-bold tracking-tighter mb-8 leading-[1.1] text-neutral-900 dark:text-white">
                        {{ $t('panid.title') }}
                    </h1>
                    <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        {{ $t('panid.subtitle') }}
                    </p>
                </div>

                <div class="grid lg:grid-cols-3 gap-8 mb-20">
                    <div class="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10">
                        <div class="w-12 h-12 rounded-2xl bg-accent-cyan-500/10 flex items-center justify-center mb-4">
                            <HugeiconsIcon :icon="UserIcon" :size="24" class="text-accent-cyan-400" />
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2">{{ $t('panid.feature_ekyc.title') }}</h3>
                        <p class="text-neutral-500 dark:text-neutral-400 text-sm">{{ $t('panid.feature_ekyc.desc') }}</p>
                    </div>
                    <div class="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10">
                        <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-4">
                            <HugeiconsIcon :icon="Building02Icon" :size="24" class="text-primary-400" />
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2">{{ $t('panid.feature_kyb.title') }}</h3>
                        <p class="text-neutral-500 dark:text-neutral-400 text-sm">{{ $t('panid.feature_kyb.desc') }}</p>
                    </div>
                    <div class="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10">
                        <div class="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center mb-4">
                            <HugeiconsIcon :icon="DocumentCodeIcon" :size="24" class="text-secondary-400" />
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2">{{ $t('panid.feature_documents.title') }}</h3>
                        <p class="text-neutral-500 dark:text-neutral-400 text-sm">{{ $t('panid.feature_documents.desc') }}</p>
                    </div>
                </div>

                <div class="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-[2rem] p-8 md:p-12 mb-20">
                    <div class="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">{{ $t('panid.why.title') }}</h2>
                            <p class="text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
                                {{ $t('panid.why.desc') }}
                            </p>
                            <div class="space-y-4">
                                <div class="flex items-start gap-3">
                                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" class="text-primary-400 mt-0.5 shrink-0" />
                                    <span class="text-neutral-600 dark:text-neutral-300 text-sm">{{ $t('panid.why.point1') }}</span>
                                </div>
                                <div class="flex items-start gap-3">
                                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" class="text-primary-400 mt-0.5 shrink-0" />
                                    <span class="text-neutral-600 dark:text-neutral-300 text-sm">{{ $t('panid.why.point2') }}</span>
                                </div>
                                <div class="flex items-start gap-3">
                                    <HugeiconsIcon :icon="CheckmarkCircle01Icon" :size="20" class="text-primary-400 mt-0.5 shrink-0" />
                                    <span class="text-neutral-600 dark:text-neutral-300 text-sm">{{ $t('panid.why.point3') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="relative">
                            <div class="aspect-square max-w-xs mx-auto relative">
                                <div class="absolute inset-0 rounded-full border-2 border-accent-cyan-500/30 flex items-center justify-center">
                                    <div class="absolute inset-4 rounded-full border border-accent-cyan-500/20">
                                        <div class="absolute inset-8 rounded-full border border-accent-cyan-500/10">
                                        </div>
                                    </div>
                                    <HugeiconsIcon :icon="FingerPrintIcon" :size="80" class="text-accent-cyan-400 opacity-80" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="max-w-2xl mx-auto">
                    <div class="bg-neutral-900 rounded-[2rem] p-8 md:p-12 border border-accent-cyan-500/20">
                        <div class="text-center mb-8">
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-cyan-500/30 bg-accent-cyan-500/10 text-accent-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
                                <HugeiconsIcon :icon="TimeIcon" :size="14" />
                                {{ $t('panid.early_access.badge') }}
                            </div>
                            <h2 class="text-2xl font-bold text-white mb-2">{{ $t('panid.early_access.title') }}</h2>
                            <p class="text-neutral-400 text-sm">{{ $t('panid.early_access.subtitle') }}</p>
                        </div>
                        
                        <form @submit.prevent="handleSubmit" class="space-y-5">
                            <div class="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label for="panid-name" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('panid.form.name') }}</label>
                                    <input id="panid-name" v-model="formData.name" type="text" required
                                        class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-accent-cyan-500/20 focus:border-accent-cyan-500 transition-all outline-none"
                                        :placeholder="$t('panid.form.name_placeholder')">
                                </div>
                                <div>
                                    <label for="panid-email" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('panid.form.email') }}</label>
                                    <input id="panid-email" v-model="formData.email" type="email" required
                                        class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-accent-cyan-500/20 focus:border-accent-cyan-500 transition-all outline-none"
                                        :placeholder="$t('panid.form.email_placeholder')">
                                </div>
                            </div>
                            <div class="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label for="panid-company" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('panid.form.company') }}</label>
                                    <input id="panid-company" v-model="formData.company" type="text"
                                        class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-accent-cyan-500/20 focus:border-accent-cyan-500 transition-all outline-none"
                                        :placeholder="$t('panid.form.company_placeholder')">
                                </div>
                                <div>
                                    <label for="panid-phone" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('panid.form.phone') }}</label>
                                    <input id="panid-phone" v-model="formData.phone" type="tel"
                                        class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-accent-cyan-500/20 focus:border-accent-cyan-500 transition-all outline-none"
                                        :placeholder="$t('panid.form.phone_placeholder')">
                                </div>
                            </div>
                            
                            <button type="submit" :disabled="isSubmitting"
                                class="w-full py-4 bg-accent-cyan-400 hover:bg-accent-cyan-300 text-neutral-950 font-bold rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-accent-cyan-500/10 mt-4">
                                <svg v-if="isSubmitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <HugeiconsIcon v-else :icon="ArrowRight01Icon" :size="20" />
                                <span>{{ isSubmitting ? $t('panid.form.submitting') : $t('panid.form.submit') }}</span>
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
