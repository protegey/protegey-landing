<template>
    <div class="bg-neutral-950 min-h-screen pt-24 pb-12">
        <div class="container mx-auto py-24 px-4 max-w-3xl">
            <h1 class="text-4xl font-bold text-white mb-8">{{ $t('terms.title') }}</h1>
            <p class="text-neutral-500 mb-8">{{ $t('terms.last_updated') }}</p>

            <div class="prose prose-invert max-w-none">
                <p class="text-neutral-400">
                    {{ $t('terms.intro') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('terms.sections.definitions') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('terms.sections.definitions_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('terms.sections.roles') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('terms.sections.roles_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('terms.sections.processing') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('terms.sections.processing_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('terms.sections.obligations') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('terms.sections.obligations_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('terms.sections.security') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('terms.sections.security_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('terms.sections.retention') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('terms.sections.retention_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('terms.sections.contact') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('terms.sections.contact_text') }} <a href="mailto:legal@protegey.com"
                        class="text-primary-400 hover:underline">legal@protegey.com</a>.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t, locale } = useI18n()

useSeoMeta({
    title: t('seo.terms.title'),
    ogTitle: t('seo.terms.title'),
    description: t('seo.terms.description'),
    ogDescription: t('seo.terms.description'),
    ogImage: t('seo.global.image'),
    twitterCard: 'summary_large_image',
    twitterTitle: t('seo.terms.title'),
    twitterDescription: t('seo.terms.description'),
    twitterImage: t('seo.global.image'),
    twitterSite: '@ProtegeyHQ'
})

if (import.meta.server) {
    const baseUrl = 'https://www.protegey.com'
    const currentLocale = locale.value
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`

    defineOgImageComponent('NuxtSeo', {
        title: t('seo.terms.title'),
        description: t('seo.terms.description'),
        theme: '#0E1225',
        colorMode: 'dark',
    })

    useSchemaOrg([
        {
            '@type': 'WebPage',
            name: t('seo.terms.title'),
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
                    name: t('terms.title'),
                    item: `${baseUrl}${localePrefix}/terms`
                }
            ]
        }
    ])
}
</script>
