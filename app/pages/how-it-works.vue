<script setup lang="ts">
const { t } = useI18n()
const baseUrl = 'https://www.protegey.com'
const localePath = useLocalePath()

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
    <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            <div class="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse" />
            <div class="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] bg-secondary-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32 md:py-40">
            <div class="max-w-3xl mx-auto text-center mb-20">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-10">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                    {{ $t('geo_pages.how_it_works.badge') }}
                </div>
                <h1 class="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8 leading-[1.1]">
                    {{ $t('geo_pages.how_it_works.title') }}
                </h1>
                <p class="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                    {{ $t('geo_pages.how_it_works.subtitle') }}
                </p>
            </div>

            <div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
                <div class="p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 text-center">
                    <div class="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>
                    </div>
                    <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-3">{{ $t('geo_pages.how_it_works.collect_title') }}</h3>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ $t('geo_pages.how_it_works.collect_desc') }}</p>
                </div>
                <div class="p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 text-center">
                    <div class="w-14 h-14 rounded-2xl bg-secondary-500/10 flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
                    </div>
                    <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-3">{{ $t('geo_pages.how_it_works.analyze_title') }}</h3>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ $t('geo_pages.how_it_works.analyze_desc') }}</p>
                </div>
                <div class="p-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 text-center">
                    <div class="w-14 h-14 rounded-2xl bg-accent-cyan-500/10 flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-accent-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                    </div>
                    <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-3">{{ $t('geo_pages.how_it_works.alert_title') }}</h3>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ $t('geo_pages.how_it_works.alert_desc') }}</p>
                </div>
            </div>

            <div class="max-w-2xl mx-auto text-center p-8 md:p-10 rounded-[2rem] border border-primary-500/20 bg-primary-500/5 relative overflow-hidden">
                <div class="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
                <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tighter leading-none">{{ $t('geo_pages.how_it_works.cta_title') }}</h2>
                <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto font-medium">{{ $t('geo_pages.how_it_works.cta_subtitle') }}</p>
                <NuxtLink :to="localePath('/contact')" class="px-6 py-3 rounded-xl bg-primary-400 hover:bg-primary-300 text-neutral-950 font-bold transition-all transform hover:scale-[1.03] inline-block shadow-xl shadow-primary-500/20">
                    {{ $t('geo_pages.how_it_works.cta_button') }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
