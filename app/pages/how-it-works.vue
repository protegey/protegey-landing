<script setup lang="ts">
import { computed } from 'vue'
import InfoPage from '~/components/sections/InfoPage.vue'
const { t } = useI18n()
const baseUrl = 'https://www.protegey.com'
const localePath = useLocalePath()

const pipelineSteps = computed(() => [
  { num: '01', color: 'primary',   title: t('signal_pipeline.step1.title'),  desc: t('signal_pipeline.step1.desc') },
  { num: '02', color: 'primary',   title: t('signal_pipeline.step2.title'),  desc: t('signal_pipeline.step2.desc') },
  { num: '03', color: 'secondary', title: t('signal_pipeline.step3.title'),  desc: t('signal_pipeline.step3.desc') },
  { num: '04', color: 'secondary', title: t('signal_pipeline.step4.title'),  desc: t('signal_pipeline.step4.desc') },
  { num: '05', color: 'amber',     title: t('signal_pipeline.step5.title'),  desc: t('signal_pipeline.step5.desc') },
  { num: '06', color: 'amber',     title: t('signal_pipeline.step6.title'),  desc: t('signal_pipeline.step6.desc') },
  { num: '07', color: 'emerald',   title: t('signal_pipeline.step7.title'),  desc: t('signal_pipeline.step7.desc') },
  { num: '08', color: 'emerald',   title: t('signal_pipeline.step8.title'),  desc: t('signal_pipeline.step8.desc') },
  { num: '09', color: 'primary',   title: t('signal_pipeline.step9.title'),  desc: t('signal_pipeline.step9.desc') },
  { num: '10', color: 'primary',   title: t('signal_pipeline.step10.title'), desc: t('signal_pipeline.step10.desc') },
])

usePageMeta({
    title: t('geo_pages.how_it_works.title'),
    description: t('geo_pages.how_it_works.subtitle'),
    schemaOrg: [
        {
            '@type': 'WebPage',
            name: t('geo_pages.how_it_works.title'),
            description: t('geo_pages.how_it_works.subtitle'),
        },
        {
            '@type': 'TechArticle',
            name: t('geo_pages.how_it_works.title'),
            description: t('geo_pages.how_it_works.subtitle'),
            author: { '@type': 'Organization', name: 'Protegey' },
            articleSection: 'Fraud Detection Pipeline',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('geo_pages.how_it_works.title'), item: `${baseUrl}/how-it-works` }
            ]
        }
    ]
})
</script>

<template>
    <InfoPage :title="t('geo_pages.how_it_works.title')" :subtitle="t('geo_pages.how_it_works.subtitle')">
        <!-- API entry label -->
        <div class="flex justify-center mb-10">
            <div class="flex items-center gap-3 px-5 py-2 rounded-full border border-primary-500/40 bg-primary-500/10 font-mono text-sm text-primary-300">
                <span class="w-2 h-2 rounded-full bg-primary-400 animate-ping" />
                POST /api/v1/signals
            </div>
        </div>

        <!-- Pipeline steps (vertical timeline) -->
        <div class="max-w-3xl mx-auto space-y-0">
            <div
                v-for="(step, idx) in pipelineSteps"
                :key="step.num"
                class="relative flex gap-6 items-stretch"
            >
                <!-- Left: number + line -->
                <div class="flex flex-col items-center">
                    <div :class="[
                        'w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold shrink-0 border-2 z-10',
                        step.color === 'primary'   ? 'border-primary-500   bg-primary-500/20   text-primary-300'   : '',
                        step.color === 'secondary' ? 'border-secondary-500 bg-secondary-500/20 text-secondary-300' : '',
                        step.color === 'amber'     ? 'border-accent-orange-500     bg-accent-orange-500/20     text-accent-orange-300'     : '',
                        step.color === 'emerald'   ? 'border-accent-cyan-500   bg-accent-cyan-500/20   text-accent-cyan-300'   : '',
                    ]">{{ step.num }}</div>
                    <div v-if="idx < pipelineSteps.length - 1" class="w-px flex-1 bg-neutral-200 dark:bg-neutral-800 my-1" />
                </div>

                <!-- Right: card -->
                <div class="pb-10 flex-1">
                    <div :class="[
                        'p-5 md:p-6 rounded-2xl border bg-white/50 dark:bg-neutral-900/40 backdrop-blur-md hover:bg-white dark:hover:bg-neutral-900 transition-all duration-500 shadow-xl shadow-black/5 dark:shadow-black/20',
                        step.color === 'primary'   ? 'border-primary-500/20 hover:border-primary-500/40'     : '',
                        step.color === 'secondary' ? 'border-secondary-500/20 hover:border-secondary-500/40' : '',
                        step.color === 'amber'     ? 'border-accent-orange-500/20 hover:border-accent-orange-500/40'         : '',
                        step.color === 'emerald'   ? 'border-accent-cyan-500/20 hover:border-accent-cyan-500/40'     : '',
                    ]">
                        <h2 :class="[
                            'font-bold text-lg mb-2 tracking-tight',
                            step.color === 'primary'   ? 'text-primary-400'   : '',
                            step.color === 'secondary' ? 'text-secondary-400' : '',
                            step.color === 'amber'     ? 'text-accent-orange-400'     : '',
                            step.color === 'emerald'   ? 'text-accent-cyan-400'   : '',
                        ]">{{ step.title }}</h2>
                        <p class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-semibold">{{ step.desc }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Output label -->
        <div class="flex justify-center mt-12">
            <div class="flex items-center gap-3 px-5 py-2 rounded-full border border-primary-500/40 bg-primary-500/10 font-mono text-sm text-primary-300">
                <span class="w-2 h-2 rounded-full bg-primary-400" />
                {{ t('signal_pipeline.output_label') }}
            </div>
        </div>

        <!-- Mini CTA -->
        <div class="mt-16 text-center p-6 md:p-8 rounded-[2rem] border border-primary-500/20 bg-primary-500/5 relative overflow-hidden">
            <div class="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
            <h2 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tighter leading-none">Ready to secure your institution?</h2>
            <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto font-medium">Connect with our team to start your integration pilot.</p>
            <NuxtLink :to="localePath('/contact')" class="px-6 py-3 rounded-xl bg-primary-400 hover:bg-primary-300 text-neutral-950 font-bold transition-all transform hover:scale-[1.03] inline-block shadow-xl shadow-primary-500/20">
                Request Integration Access
            </NuxtLink>
        </div>

        <!-- Footer note -->
        <p class="text-center text-neutral-500 text-sm mt-12 max-w-xl mx-auto font-medium">
            {{ t('geo_pages.how_it_works.footer_note') }}
        </p>
    </InfoPage>
</template>
