<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden">
        <!-- ── Hero ──────────────────────────────────────────── -->
        <section class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            
            <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
            <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div class="container mx-auto px-4 max-w-7xl relative z-10">
                <div class="max-w-4xl text-center mx-auto mb-16">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-10 uppercase">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                        {{ $t('contact.eyebrow') }}
                    </div>
                    <h1 class="hero-headline text-4xl lg:text-5xl font-bold tracking-tighter mb-8 leading-[1.1]">
                        {{ $t('contact.title') }}
                    </h1>
                    <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        {{ $t('contact.subtitle') }}
                    </p>
                </div>

                <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    <!-- Contact Cards -->
                    <div class="lg:col-span-2 space-y-4">
                        <div data-reveal class="group p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 hover:border-primary-500/30 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-500">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center shrink-0">
                                    <HugeiconsIcon :icon="Mail01Icon" :size="24" class="text-primary-400" />
                                </div>
                                <div>
                                    <p class="text-neutral-900 dark:text-white font-bold mb-1">{{ $t('contact.email') }}</p>
                                    <a href="mailto:hello@protegey.com" class="text-neutral-500 dark:text-neutral-400 hover:text-primary-400 transition-colors text-sm font-medium">
                                        hello@protegey.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div data-reveal class="group p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 hover:border-secondary-500/30 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-500" style="--delay:100ms">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center shrink-0">
                                    <HugeiconsIcon :icon="Location01Icon" :size="24" class="text-secondary-400" />
                                </div>
                                <div>
                                    <p class="text-neutral-900 dark:text-white font-bold mb-3">{{ $t('contact.location') }}</p>
                                    <div class="space-y-3">
                                        <div class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                                            <p class="text-xs font-bold text-primary-400 uppercase tracking-wider mb-1">{{ $t('contact.hq') }}</p>
                                            <p class="text-neutral-500 dark:text-neutral-400 text-sm font-medium leading-relaxed">
                                                16 Rue des Asphodèles<br>
                                                Bd Ghandi, Casablanca 20250<br>
                                                Morocco
                                            </p>
                                        </div>
                                        <div class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                                            <p class="text-xs font-bold text-secondary-400 uppercase tracking-wider mb-1">{{ $t('contact.us_office') }}</p>
                                            <p class="text-neutral-500 dark:text-neutral-400 text-sm font-medium leading-relaxed">
                                                651 N Broad St<br>
                                                Middletown, DE 19709<br>
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div data-reveal class="p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-gradient-to-br from-primary-500/5 to-secondary-500/5" style="--delay:200ms">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center shrink-0">
                                    <HugeiconsIcon :icon="Clock01Icon" :size="24" class="text-primary-400" />
                                </div>
                                <div>
                                    <p class="text-neutral-900 dark:text-white font-bold mb-1">{{ $t('contact.hours') }}</p>
                                    <p class="text-neutral-500 dark:text-neutral-400 text-sm font-medium leading-relaxed">
                                        {{ $t('contact.hours_desc') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div data-reveal class="lg:col-span-3 bg-white dark:bg-neutral-900/60 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-6 md:p-10 relative overflow-hidden" style="--delay:200ms">
                        <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 opacity-50" />
                        
                        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-8">{{ $t('contact.form.title') }}</h2>
                        
                        <form @submit.prevent="handleSubmit" class="space-y-5">
                            <div class="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label for="contact-name" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('contact.form.name') }}</label>
                                    <input id="contact-name" v-model="formData.name" type="text" required
                                        class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                        :placeholder="$t('contact.form.name_placeholder')">
                                </div>
                                <div>
                                    <label for="contact-email" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('contact.form.email') }}</label>
                                    <input id="contact-email" v-model="formData.email" type="email" required
                                        class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                        :placeholder="$t('contact.form.email_placeholder')">
                                </div>
                            </div>
                            <div>
                                <label for="contact-phone" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('contact.form.phone') }}</label>
                                <input id="contact-phone" v-model="formData.phone" type="tel"
                                    class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                    :placeholder="$t('contact.form.phone_placeholder')">
                            </div>
                            <div>
                                <label for="contact-message" class="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">{{ $t('contact.form.message') }}</label>
                                <textarea id="contact-message" v-model="formData.message" rows="5" required
                                    class="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none resize-none"
                                    :placeholder="$t('contact.form.message_placeholder')"></textarea>
                            </div>
                            
                            <button type="submit" :disabled="isSubmitting"
                                class="w-full py-4 bg-primary-400 hover:bg-primary-300 text-neutral-950 font-bold rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-primary-500/10 mt-4">
                                <span>{{ isSubmitting ? $t('contact.form.submitting') : $t('contact.form.submit') }}</span>
                                <HugeiconsIcon :icon="ArrowRight01Icon" :size="20" v-if="!isSubmitting" />
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

<script setup>
import { ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Mail01Icon, Location01Icon, ArrowRight01Icon, Clock01Icon } from '@hugeicons/core-free-icons'

const { t, locale } = useI18n()
const baseUrl = 'https://www.protegey.com'

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

usePageMeta({
    title: t('seo.contact.title'),
    description: t('seo.contact.description'),
    schemaOrg: [
        {
            '@type': 'ContactPage',
            name: t('seo.contact.title'),
            description: t('seo.contact.description'),
        }
    ]
})

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('footer.links.contact'), item: `${baseUrl}/contact` }
            ]
        }
    ])
}
</script>

<style scoped>
.hero-headline {
    background: linear-gradient(135deg, #0B1741 0%, #0cb99e 40%, #1b59ae 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

[data-reveal] {
    animation: fade-in-up 0.8s ease-out both;
}
[data-reveal][data-delay="100"] { animation-delay: 100ms; }
[data-reveal][data-delay="200"] { animation-delay: 200ms; }

.hero-headline {
    animation: fade-in-up 1s ease-out both;
    animation-delay: 200ms;
}

@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
