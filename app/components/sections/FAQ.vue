<script setup lang="ts">
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
    <section class="py-24 bg-black relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">{{ t('faq.title') }}</h2>
                <p class="text-neutral-400">Clear answers to literal questions about Protegey's role and mission.</p>
            </div>

            <div class="space-y-4">
                <div v-for="(faq, index) in faqs" :key="index"
                    class="border border-neutral-900 rounded-2xl bg-neutral-950/50 overflow-hidden transition-all duration-300"
                    :class="{ 'ring-1 ring-primary-500/30 border-primary-500/30': openIndex === index }">
                    <button @click="toggle(index)"
                        class="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                        <span class="text-lg font-medium text-white">{{ faq.q }}</span>
                        <span class="ml-6 flex-shrink-0 transition-transform duration-300"
                            :class="{ 'rotate-180': openIndex === index }">
                            <svg class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </button>

                    <div v-show="openIndex === index" class="px-6 pb-6">
                        <p class="text-neutral-400 leading-relaxed">
                            {{ faq.a }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Decorative background element -->
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-[120px] -z-10">
        </div>
    </section>
</template>
