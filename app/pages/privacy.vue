<template>
    <div class="bg-neutral-950 min-h-screen pt-24 pb-12">
        <div class="container mx-auto py-24 px-4 max-w-3xl">
            <h1 class="text-4xl font-bold text-white mb-8">{{ $t('privacy.title') }}</h1>
            <p class="text-neutral-500 mb-8">{{ $t('privacy.last_updated') }}</p>

            <div class="prose prose-invert max-w-none">
                <p class="text-neutral-400">
                    {{ $t('privacy.intro') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('privacy.sections.info_collect') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('privacy.sections.info_collect_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('privacy.sections.info_use') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('privacy.sections.info_use_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('privacy.sections.data_sharing') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('privacy.sections.data_sharing_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('privacy.sections.security') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('privacy.sections.security_text') }}
                </p>

                <h3 class="text-white text-xl font-bold mt-8 mb-4">{{ $t('privacy.sections.contact') }}</h3>
                <p class="text-neutral-400">
                    {{ $t('privacy.sections.contact_text') }} <a href="mailto:privacy@protegey.com"
                        class="text-primary-400 hover:underline">privacy@protegey.com</a>.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()

defineOgImageComponent('NuxtSeo', {
    title: t('seo.privacy.title'),
    description: t('seo.privacy.description'),
    theme: '#0E1225',
    colorMode: 'dark',
})

useSeoMeta({
    title: t('seo.privacy.title'),
    ogTitle: t('seo.privacy.title'),
    description: t('seo.privacy.description'),
    ogDescription: t('seo.privacy.description'),
    ogImage: t('seo.global.image'),
    twitterCard: 'summary_large_image',
    twitterTitle: t('seo.privacy.title'),
    twitterDescription: t('seo.privacy.description'),
    twitterImage: t('seo.global.image'),
    twitterSite: '@ProtegeyHQ'
})

useSchemaOrg([
    defineWebPage({
        name: t('seo.privacy.title'),
    }),
    defineBreadcrumb({
        items: [
            { name: t('nav.home'), item: '/' },
            { name: t('footer.links.privacy'), item: '/privacy' }
        ]
    })
])

useHead({
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com/privacy' }
    ]
})
</script>
