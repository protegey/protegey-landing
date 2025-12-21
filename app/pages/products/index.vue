<script setup>
import ProductHero from '~/components/products/ProductHero.vue'
import Products from '~/components/sections/Products.vue'
import ProductCTA from '~/components/products/ProductCTA.vue'

const { t } = useI18n()

useHead({
    title: t('seo.products.title'),
    meta: [
        { name: 'description', content: t('seo.products.description') },
        { property: 'og:title', content: t('seo.products.title') },
        { property: 'og:description', content: t('seo.products.description') },
        { property: 'og:image', content: t('seo.global.image') },
        { name: 'twitter:title', content: t('seo.products.title') },
        { name: 'twitter:description', content: t('seo.products.description') },
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
                        "name": t('nav.products'),
                        "item": "https://www.protegey.com/products"
                    }
                ]
            })
        }
    ]
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-950">
        <ProductHero />
        <Products />
        <ProductCTA />
    </div>
</template>
