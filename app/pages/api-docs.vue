<template>
    <div class="bg-neutral-950 min-h-screen pt-24 pb-12">
        <div class="container mx-auto py-24 px-4 max-w-4xl">
            <div class="flex items-center gap-4 mb-8">
                <div
                    class="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-mono">
                    v1.0.0</div>
                <h1 class="text-4xl font-bold text-white">{{ $t('api_docs.title') }}</h1>
            </div>

            <div class="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center max-w-2xl mx-auto mt-12">
                <div class="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>
                <h2 class="text-3xl font-bold text-white mb-4">{{ $t('api_docs.coming_soon') }}</h2>
                <p class="text-neutral-400 mb-8 text-lg">
                    {{ $t('api_docs.intro') }}
                </p>

                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 font-mono text-sm">
                    <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                    {{ $t('api_docs.status') }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()

useHead({
    title: t('seo.api_docs.title'),
    meta: [
        { name: 'description', content: t('seo.api_docs.description') },
        { property: 'og:title', content: t('seo.api_docs.title') },
        { property: 'og:description', content: t('seo.api_docs.description') },
        { name: 'twitter:image', content: t('seo.global.image') }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://protegey.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": t('footer.links.api_docs'),
                        "item": "https://protegey.com/api-docs"
                    }
                ]
            })
        }
    ]
})
</script>
