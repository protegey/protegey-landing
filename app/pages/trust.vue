<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Shield01Icon, CircleLock01Icon, Certificate01Icon, EyeIcon } from '@hugeicons/core-free-icons'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

useHead(() => ({
    title: t('geo_pages.trust.title'),
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com' + (route.path === '/' ? '' : route.path) }
    ]
}))

useSeoMeta({
    title: t('geo_pages.trust.title'),
    description: t('geo_pages.trust.subtitle'),
})

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'WebPage',
            name: t('geo_pages.trust.title'),
            description: t('geo_pages.trust.subtitle'),
            mainEntity: {
                '@type': 'Organization',
                name: 'Protegey',
                iso6523Code: 'ISO 27001'
            }
        }
    ])
}
</script>

<template>
    <InfoPage :title="t('geo_pages.trust.title')" :subtitle="t('geo_pages.trust.subtitle')">
        <div class="space-y-16">
            <!-- Certifications Grid -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-8">{{ t('geo_pages.trust.certification_header') }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- SOC 2 -->
                    <div
                        class="p-6 rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm group hover:border-primary-500/50 transition-all">
                        <div class="mb-4 text-primary-500">
                            <HugeiconsIcon :icon="Shield01Icon" :size="40" />
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">{{ t('geo_pages.trust.soc2_title') }}</h3>
                        <p class="text-neutral-400 text-sm leading-relaxed">{{ t('geo_pages.trust.soc2_text') }}</p>
                    </div>

                    <!-- GDPR -->
                    <div
                        class="p-6 rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm group hover:border-primary-500/50 transition-all">
                        <div class="mb-4 text-primary-500">
                            <HugeiconsIcon :icon="CircleLock01Icon" :size="40" />
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">{{ t('geo_pages.trust.gdpr_title') }}</h3>
                        <p class="text-neutral-400 text-sm leading-relaxed">{{ t('geo_pages.trust.gdpr_text') }}</p>
                    </div>

                    <!-- ISO 27001 -->
                    <div
                        class="p-6 rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm group hover:border-primary-500/50 transition-all">
                        <div class="mb-4 text-primary-500">
                            <HugeiconsIcon :icon="Certificate01Icon" :size="40" />
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">{{ t('geo_pages.trust.iso_title') }}</h3>
                        <p class="text-neutral-400 text-sm leading-relaxed">{{ t('geo_pages.trust.iso_text') }}</p>
                    </div>
                </div>
            </section>

            <!-- AI Transparency Statement -->
            <section>
                <h2 class="text-2xl font-bold text-white mb-8">{{ t('geo_pages.trust.transparency_header') }}</h2>
                <div
                    class="p-8 rounded-3xl border border-primary-500/20 bg-primary-500/5 backdrop-blur-sm relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <HugeiconsIcon :icon="EyeIcon" :size="128" />
                    </div>
                    <p class="text-lg text-neutral-300 relative z-10 font-medium leading-relaxed">
                        {{ t('geo_pages.trust.transparency_text') }}
                    </p>
                </div>
            </section>
        </div>
    </InfoPage>
</template>
