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

useHead({
    title: t('seo.about.title'),
    meta: [
        { name: 'description', content: t('seo.about.description') },
        { property: 'og:title', content: t('seo.about.title') },
        { property: 'og:description', content: t('seo.about.description') },
        { name: 'twitter:image', content: t('seo.global.image') }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.protegey.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": t('footer.links.about'),
                        "item": "https://www.protegey.com/about"
                    }
                ]
            })
        }
    ]
})
</script>
