<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden relative pt-32 pb-20 md:pt-36">
        <!-- Technical Background -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            <div class="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-secondary-500/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
        </div>

        <div class="container mx-auto px-4 max-w-4xl relative z-10">
            <div data-reveal class="mb-20">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-500/20 bg-neutral-500/5 text-neutral-500 text-[10px] font-bold tracking-[0.2em] mb-10 uppercase">
                    Legal Documentation
                </div>
                <h1 class="hero-title text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8 leading-none">
                    {{ $t('terms.title') }}
                </h1>
                <p class="text-neutral-500 dark:text-neutral-500 font-mono text-sm uppercase tracking-widest">{{ $t('terms.last_updated') }}</p>
            </div>

            <div data-reveal class="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-3xl border border-neutral-200 dark:border-white/10 rounded-[2rem] p-6 md:p-12 shadow-2xl shadow-black/5 dark:shadow-black/40 prose prose-invert max-w-none">
                <p class="text-lg text-neutral-900 dark:text-white font-medium leading-relaxed mb-12 pb-12 border-b border-neutral-200 dark:border-white/10 italic">
                    {{ $t('terms.intro') }}
                </p>

                <div class="space-y-12">
                    <section>
                        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('terms.sections.definitions') }}</h2>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('terms.sections.definitions_text') }}
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('terms.sections.roles') }}</h2>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('terms.sections.roles_text') }}
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('terms.sections.processing') }}</h2>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('terms.sections.processing_text') }}
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('terms.sections.obligations') }}</h2>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('terms.sections.obligations_text') }}
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('terms.sections.security') }}</h2>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('terms.sections.security_text') }}
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('terms.sections.retention') }}</h2>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('terms.sections.retention_text') }}
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('terms.sections.contact') }}</h2>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('terms.sections.contact_text') }} 
                            <a href="mailto:legal@protegey.com" class="text-primary-400 hover:text-primary-300 font-bold underline underline-offset-8 transition-colors">legal@protegey.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t, locale } = useI18n()
const baseUrl = 'https://www.protegey.com'
const currentLocale = locale.value
const localePrefix = currentLocale === 'fr' ? '' : `/${currentLocale}`

usePageMeta({
    title: t('seo.terms.title'),
    description: t('seo.terms.description'),
    schemaOrg: [
        {
            '@type': 'WebPage',
            name: t('seo.terms.title'),
            description: t('seo.terms.description'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('footer.links.terms'), item: `${baseUrl}${localePrefix}/terms` }
            ]
        }
    ]
})
</script>

<style scoped>
.hero-title {
    background: linear-gradient(135deg, #0B1741 0%, #0cb99e 40%, #1b59ae 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

:global(.dark) .hero-title {
    background: linear-gradient(135deg, #ffffff 20%, #0cb99e 60%, #1b59ae 100%);
}

[data-reveal] {
    animation: fade-in-up 0.8s ease-out both;
}
[data-reveal]:nth-child(2) { animation-delay: 100ms; }
[data-reveal]:nth-child(3) { animation-delay: 200ms; }
[data-reveal]:nth-child(4) { animation-delay: 300ms; }
[data-reveal]:nth-child(5) { animation-delay: 400ms; }
[data-reveal]:nth-child(6) { animation-delay: 500ms; }
[data-reveal]:nth-child(7) { animation-delay: 600ms; }

@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
