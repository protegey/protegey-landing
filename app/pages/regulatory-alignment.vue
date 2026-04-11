<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    JusticeScale01Icon,
    FileValidationIcon,
    Audit01Icon,
    Shield01Icon,
    GlobalIcon,
    LockKeyIcon,
    DatabaseIcon
} from '@hugeicons/core-free-icons'

const { t, tm, rt } = useI18n()
const baseUrl = 'https://www.protegey.com'
const localePath = useLocalePath()

const capabilityIcons = [
    FileValidationIcon,
    Shield01Icon,
    Audit01Icon,
    GlobalIcon,
    LockKeyIcon,
    DatabaseIcon,
]

usePageMeta({
    title: t('seo.regulatory_alignment.title'),
    description: t('seo.regulatory_alignment.description'),
    schemaOrg: [
        {
            '@type': 'WebPage',
            name: t('seo.regulatory_alignment.title'),
            description: t('seo.regulatory_alignment.description'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('footer.links.regulatory_alignment'), item: `${baseUrl}/regulatory-alignment` }
            ]
        }
    ]
})

const capabilityKeys = [
    { title: 'cap_sar_title', desc: 'cap_sar_desc' },
    { title: 'cap_aml_title', desc: 'cap_aml_desc' },
    { title: 'cap_audit_title', desc: 'cap_audit_desc' },
    { title: 'cap_crossborder_title', desc: 'cap_crossborder_desc' },
    { title: 'cap_privacy_title', desc: 'cap_privacy_desc' },
    { title: 'cap_retention_title', desc: 'cap_retention_desc' },
]
</script>

<template>
    <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
        <!-- Background grid + blobs -->
        <div class="absolute inset-0 z-0 pointer-events-none">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px]" />
            <div class="absolute top-[5%] right-[-5%] w-[40%] h-[40%] bg-secondary-500/10 rounded-full blur-[140px] animate-pulse" />
            <div class="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] bg-primary-500/8 rounded-full blur-[120px]" />
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">

            <!-- ── Hero ─────────────────────────────────────────── -->
            <div class="max-w-3xl mx-auto text-center mb-16 md:mb-24">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-500/20 bg-secondary-500/5 text-secondary-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-10">
                    <HugeiconsIcon :icon="JusticeScale01Icon" :size="14" />
                    {{ $t('geo_pages.regulatory_alignment.badge') }}
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-neutral-900 dark:text-white mb-8">
                    {{ $t('geo_pages.regulatory_alignment.title') }}
                </h1>
                <p class="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                    {{ $t('geo_pages.regulatory_alignment.subtitle') }}
                </p>
            </div>

            <!-- ── The Challenge ────────────────────────────────── -->
            <div class="max-w-4xl mx-auto mb-20 md:mb-28">
                <div class="p-10 md:p-14 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 relative overflow-hidden">
                    <div class="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent-orange-500/40 to-transparent" />
                    <p class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.25em] uppercase mb-4">{{ $t('geo_pages.regulatory_alignment.challenge_badge') }}</p>
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-5 leading-tight">
                        {{ $t('geo_pages.regulatory_alignment.challenge_title') }}
                    </h2>
                    <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base max-w-2xl">
                        {{ $t('geo_pages.regulatory_alignment.challenge_desc') }}
                    </p>
                </div>
            </div>

            <!-- ── Regulatory Frameworks ────────────────────────── -->
            <div class="mb-20 md:mb-28">
                <div class="text-center mb-14">
                    <p class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.25em] uppercase mb-4">{{ $t('geo_pages.regulatory_alignment.frameworks_badge') }}</p>
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                        {{ $t('geo_pages.regulatory_alignment.frameworks_title') }}
                    </h2>
                    <p class="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        {{ $t('geo_pages.regulatory_alignment.frameworks_subtitle') }}
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div
                        v-for="(fw, i) in (tm('geo_pages.regulatory_alignment.frameworks') as any[])"
                        :key="i"
                        class="group p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-secondary-500/30 transition-all duration-300"
                    >
                        <div class="flex items-start justify-between gap-3 mb-4">
                            <span class="text-xl font-black text-neutral-900 dark:text-white tracking-tight">{{ rt(fw.name) }}</span>
                            <span class="text-[10px] font-semibold text-secondary-400 bg-secondary-500/10 px-2 py-1 rounded-full whitespace-nowrap rtl:text-right">{{ rt(fw.zone) }}</span>
                        </div>
                        <p class="text-xs text-neutral-500 dark:text-neutral-500 mb-3 font-medium">{{ rt(fw.full) }}</p>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ rt(fw.desc) }}</p>
                    </div>
                </div>
            </div>

            <!-- ── Capabilities ─────────────────────────────────── -->
            <div class="mb-16 md:mb-24">
                <div class="text-center mb-14">
                    <p class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.25em] uppercase mb-4">{{ $t('geo_pages.regulatory_alignment.capabilities_badge') }}</p>
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                        {{ $t('geo_pages.regulatory_alignment.capabilities_title') }}
                    </h2>
                    <p class="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        {{ $t('geo_pages.regulatory_alignment.capabilities_subtitle') }}
                    </p>
                </div>

                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div
                        v-for="(cap, i) in capabilityKeys"
                        :key="i"
                        class="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-primary-500/20 transition-all duration-300"
                    >
                        <div class="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-5">
                            <HugeiconsIcon :icon="capabilityIcons[i]" :size="20" class="text-primary-400" />
                        </div>
                        <h3 class="font-bold text-neutral-900 dark:text-white mb-2 leading-snug">
                            {{ $t(`geo_pages.regulatory_alignment.${cap.title}`) }}
                        </h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            {{ $t(`geo_pages.regulatory_alignment.${cap.desc}`) }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- ── CTA ──────────────────────────────────────────── -->
            <div class="max-w-2xl mx-auto text-center p-10 md:p-14 rounded-[2rem] border border-primary-500/20 bg-primary-500/5 relative overflow-hidden">
                <div class="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
                <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                    <HugeiconsIcon :icon="JusticeScale01Icon" :size="24" class="text-primary-400" />
                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tighter leading-none">
                    {{ $t('geo_pages.regulatory_alignment.cta_title') }}
                </h2>
                <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto leading-relaxed">
                    {{ $t('geo_pages.regulatory_alignment.cta_subtitle') }}
                </p>
                <NuxtLink :to="localePath('/contact')" class="px-6 py-3 rounded-xl bg-primary-400 hover:bg-primary-300 text-neutral-950 font-bold transition-all transform hover:scale-[1.03] inline-block shadow-xl shadow-primary-500/20">
                    {{ $t('geo_pages.regulatory_alignment.cta_button') }}
                </NuxtLink>
            </div>

        </div>
    </div>
</template>
