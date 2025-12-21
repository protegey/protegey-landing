<template>
    <div class="bg-neutral-950 min-h-screen pt-24 pb-12">
        <div class="container mx-auto py-24 px-4 max-w-4xl">
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">{{ $t('careers.title') }}</h1>
                <p class="text-xl text-neutral-400 max-w-2xl mx-auto">
                    {{ $t('careers.subtitle') }}
                </p>
            </div>

            <div class="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center max-w-2xl mx-auto">
                <div class="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-4">{{ $t('careers.no_roles') }}</h3>
                <p class="text-neutral-400 mb-8">
                    {{ $t('careers.no_roles_desc') }}
                </p>
                <a href="mailto:careers@protegey.com"
                    class="inline-flex items-center gap-2 text-primary-400 font-bold hover:text-primary-300 transition-colors">
                    <span>{{ $t('careers.cta') }}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()

useHead({
    title: t('seo.careers.title'),
    meta: [
        { name: 'description', content: t('seo.careers.description') },
        { property: 'og:title', content: t('seo.careers.title') },
        { property: 'og:description', content: t('seo.careers.description') },
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
                        "name": t('footer.links.careers'),
                        "item": "https://www.protegey.com/careers"
                    }
                ]
            })
        }
    ]
})
</script>
