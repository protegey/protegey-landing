<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden relative pt-24 pb-20">
        <!-- Technical Background -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            <div class="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary-500/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
        </div>

        <div class="container mx-auto px-4 max-w-4xl relative z-10">
            <div data-reveal class="mb-16">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-500/20 bg-neutral-500/5 text-neutral-500 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
                    Legal Documentation
                </div>
                <h1 class="hero-title text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-6 leading-none">
                    {{ $t('privacy.title') }}
                </h1>
                <p class="text-neutral-500 dark:text-neutral-500 font-mono text-sm uppercase tracking-widest">{{ $t('privacy.last_updated') }}</p>
            </div>

            <div data-reveal class="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-3xl border border-neutral-200 dark:border-white/10 rounded-[2rem] p-6 md:p-12 shadow-2xl shadow-black/5 dark:shadow-black/40 prose prose-invert max-w-none">
                <p class="text-lg text-neutral-900 dark:text-white font-medium leading-relaxed mb-12 pb-12 border-b border-neutral-200 dark:border-white/10 italic">
                    {{ $t('privacy.intro') }}
                </p>

                <div class="space-y-12">
                    <section>
                        <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('privacy.sections.info_collect') }}</h3>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('privacy.sections.info_collect_text') }}
                        </p>
                    </section>

                    <section>
                        <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('privacy.sections.data_processor') }}</h3>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('privacy.sections.data_processor_text') }}
                        </p>
                    </section>

                    <section>
                        <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('privacy.sections.data_sharing') }}</h3>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('privacy.sections.data_sharing_text') }}
                        </p>
                    </section>

                    <section>
                        <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('privacy.sections.retention') }}</h3>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('privacy.sections.retention_text') }}
                        </p>
                    </section>

                    <section>
                        <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('privacy.sections.security') }}</h3>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('privacy.sections.security_text') }}
                        </p>
                    </section>

                    <section>
                        <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">{{ $t('privacy.sections.contact') }}</h3>
                        <p class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                            {{ $t('privacy.sections.contact_text') }} 
                            <a href="mailto:privacy@protegey.com" class="text-primary-400 hover:text-primary-300 font-bold underline underline-offset-8 transition-colors">privacy@protegey.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, locale } = useI18n()

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.from('[data-reveal]', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2
    })
})

useSeoMeta({
    title: t('seo.privacy.title'),
    ogTitle: t('seo.privacy.title'),
    description: t('seo.privacy.description')
})

if (import.meta.server) {
    const baseUrl = 'https://www.protegey.com'
    const currentLocale = locale.value
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`

    defineOgImageComponent('NuxtSeo', {
        title: t('seo.privacy.title'),
        description: t('seo.privacy.description'),
        theme: '#0B1741',
        colorMode: 'dark',
    })

    useSchemaOrg([
        {
            '@type': 'WebPage',
            name: t('seo.privacy.title'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: t('nav.home'),
                    item: baseUrl
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: t('footer.links.privacy'),
                    item: `${baseUrl}${localePrefix}/privacy`
                }
            ]
        }
    ])
}
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
</style>
