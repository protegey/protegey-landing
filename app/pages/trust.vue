<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Shield01Icon, CircleLock01Icon, Target01Icon, EyeIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons'

const { t } = useI18n()
const baseUrl = 'https://www.protegey.com'
const localePath = useLocalePath()

usePageMeta({
    title: t('geo_pages.trust.title'),
    description: t('geo_pages.trust.subtitle'),
    schemaOrg: [
        {
            '@type': 'WebPage',
            name: t('geo_pages.trust.title'),
            description: t('geo_pages.trust.subtitle'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('geo_pages.trust.title'), item: `${baseUrl}/trust` }
            ]
        }
    ]
})
</script>

<template>
    <InfoPage :title="t('geo_pages.trust.title')" :subtitle="t('geo_pages.trust.subtitle')">
        <div class="space-y-20">
            <!-- Compliance Commitment -->
            <section>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
                    {{ t('geo_pages.trust.compliance_badge') }}
                </div>
                <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">{{ t('geo_pages.trust.certification_header') }}</h2>

                <!-- Honest intro statement -->
                <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                    {{ t('geo_pages.trust.compliance_intro') }}
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- SOC 2 -->
                    <div class="group p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-500 shadow-xl shadow-black/5 dark:shadow-black/20">
                        <div class="flex items-start justify-between mb-8">
                            <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <HugeiconsIcon :icon="Shield01Icon" :size="24" class="text-primary-400" />
                            </div>
                            <span class="text-[10px] font-bold tracking-wide px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 uppercase">
                                {{ t('geo_pages.trust.soc2_badge') }}
                            </span>
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ t('geo_pages.trust.soc2_title') }}</h3>
                        <p class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-medium">{{ t('geo_pages.trust.soc2_text') }}</p>
                    </div>

                    <!-- Data Privacy -->
                    <div class="group p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-500 shadow-xl shadow-black/5 dark:shadow-black/20">
                        <div class="flex items-start justify-between mb-8">
                            <div class="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <HugeiconsIcon :icon="CircleLock01Icon" :size="24" class="text-secondary-400" />
                            </div>
                            <span class="text-[10px] font-bold tracking-wide px-2 py-1 rounded-full bg-secondary-500/10 text-secondary-400 uppercase">
                                {{ t('geo_pages.trust.gdpr_badge') }}
                            </span>
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ t('geo_pages.trust.gdpr_title') }}</h3>
                        <p class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-medium">{{ t('geo_pages.trust.gdpr_text') }}</p>
                    </div>

                    <!-- ISO 27001 -->
                    <div class="group p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-500 shadow-xl shadow-black/5 dark:shadow-black/20">
                        <div class="flex items-start justify-between mb-8">
                            <div class="w-12 h-12 rounded-2xl bg-accent-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <HugeiconsIcon :icon="Target01Icon" :size="24" class="text-accent-cyan-400" />
                            </div>
                            <span class="text-[10px] font-bold tracking-wide px-2 py-1 rounded-full bg-accent-cyan-500/10 text-accent-cyan-400 uppercase">
                                {{ t('geo_pages.trust.iso_badge') }}
                            </span>
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ t('geo_pages.trust.iso_title') }}</h3>
                        <p class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-medium">{{ t('geo_pages.trust.iso_text') }}</p>
                    </div>
                </div>
            </section>

            <!-- AI Transparency Statement -->
            <section>
                <div
                    class="p-6 md:p-10 rounded-[2rem] border border-primary-500/20 bg-primary-500/5 backdrop-blur-2xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <HugeiconsIcon :icon="EyeIcon" :size="256" />
                    </div>

                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
                        {{ t('geo_pages.trust.transparency_badge') }}
                    </div>

                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tighter">{{ t('geo_pages.trust.transparency_header') }}</h3>
                    <p class="text-base md:text-lg text-neutral-900 dark:text-white relative z-10 font-light leading-relaxed mb-10 italic">
                        "{{ t('geo_pages.trust.transparency_text') }}"
                    </p>

                    <NuxtLink :to="localePath('/contact')" class="inline-flex items-center gap-3 text-primary-400 font-bold group">
                        {{ t('geo_pages.trust.transparency_cta') }}
                        <HugeiconsIcon :icon="ArrowRight01Icon" :size="20" class="group-hover:translate-x-2 transition-transform rtl:rotate-180" />
                    </NuxtLink>
                </div>
            </section>
        </div>
    </InfoPage>
</template>
