<script setup lang="ts">
import { ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { PlusSignIcon, MinusSignIcon, HelpCircleIcon } from '@hugeicons/core-free-icons'

const { t } = useI18n()

const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') }
]

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a
                }
            }))
        }
    ])
}

const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
    <section class="py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                <div class="absolute top-1/3 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
                <div class="absolute bottom-0 left-1/4 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl"></div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-12 md:mb-16">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-mono tracking-wide mb-4">
                    <HugeiconsIcon :icon="HelpCircleIcon" :size="16" />
                    <span>FAQ</span>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4 rtl:text-center">{{ t('faq.title') }}</h2>
                <p class="text-neutral-500 dark:text-neutral-400 text-lg rtl:text-center">{{ t('faq.subtitle') }}</p>
            </div>

            <div class="space-y-4">
                <div v-for="(faq, index) in faqs" :key="index"
                    class="group border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 overflow-hidden transition-all duration-300 hover:border-primary-500/30"
                    :class="{ 'ring-1 ring-primary-500/30 border-primary-500/30 bg-white/90 dark:bg-neutral-900/80': openIndex === index }">
                    <button @click="toggle(index)"
                        class="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset rtl:text-right rtl:flex-row-reverse"
                        :aria-expanded="openIndex === index"
                        :aria-controls="`faq-answer-${index}`">
                        <span
                            class="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-primary-400 transition-colors duration-200">{{
                            faq.q }}</span>
                        <span
                            class="ms-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400 transition-transform duration-300 rtl:ms-0 rtl:me-6"
                            :class="{ 'text-primary-500 rotate-180': openIndex === index }">
                            <HugeiconsIcon :icon="openIndex === index ? MinusSignIcon : PlusSignIcon" :size="24" />
                        </span>
                    </button>

                    <div :id="`faq-answer-${index}`" v-show="openIndex === index" class="px-6 pb-6 rtl:text-right">
                        <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed text-base md:text-lg">
                            {{ faq.a }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
