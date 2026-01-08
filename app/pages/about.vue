<template>
    <div class="bg-neutral-950 min-h-screen pt-24 pb-12">
        <div class="container mx-auto py-24 px-4 max-w-4xl">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-8">{{ $t('about.title') }}</h1>

            <div class="prose prose-invert max-w-none">
                <p class="text-xl text-neutral-400 mb-8">
                    {{ $t('about.subtitle') }}
                </p>

                <div class="grid md:grid-cols-2 gap-8 my-12">
                    <div class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('about.mission') }}</h3>
                        <p class="text-neutral-400">
                            {{ $t('about.mission_text') }}
                        </p>
                    </div>
                    <div class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                        <h3 class="text-2xl font-bold text-white mb-4">{{ $t('about.vision') }}</h3>
                        <p class="text-neutral-400">
                            {{ $t('about.vision_text') }}
                        </p>
                    </div>
                </div>

                <h2 class="text-3xl font-bold text-white mt-12 mb-6">{{ $t('about.why_exist') }}</h2>
                <p class="text-neutral-400 mb-6">
                    {{ $t('about.why_exist_text') }}
                </p>
                <p class="text-neutral-400">
                    {{ $t('about.why_exist_text2') }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()

useSeoMeta({
    title: t('seo.about.title'),
    ogTitle: t('seo.about.title'),
    description: t('seo.about.description'),
    ogDescription: t('seo.about.description'),
    ogImage: t('seo.global.image'),
    twitterCard: 'summary_large_image',
    twitterTitle: t('seo.about.title'),
    twitterDescription: t('seo.about.description'),
    twitterImage: t('seo.global.image'),
    twitterSite: '@ProtegeyHQ'
})

if (import.meta.server) {
    defineOgImageComponent('NuxtSeo', {
        title: t('seo.about.title'),
        description: t('seo.about.description'),
        theme: '#0E1225',
        colorMode: 'dark',
    })

    useSchemaOrg([
        defineAboutPage({
            name: t('seo.about.title'),
            description: t('geo.canonical_definition'),
        }),
        defineBreadcrumb({
            items: [
                { name: t('nav.home'), item: '/' },
                { name: t('footer.links.about'), item: '/about' }
            ]
        })
    ])
}

const route = useRoute()
useHead(() => ({
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com' + (route.path === '/' ? '' : route.path) }
    ]
}))
</script>
