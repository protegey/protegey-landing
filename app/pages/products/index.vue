<script setup>
import ProductHero from '~/components/products/ProductHero.vue'
import Products from '~/components/sections/Products.vue'
import ProductSuiteDetails from '~/components/products/ProductSuiteDetails.vue'
import ProductCTA from '~/components/products/ProductCTA.vue'

const { t } = useI18n()

useSeoMeta({
    title: t('seo.products.title'),
    ogTitle: t('seo.products.title'),
    description: t('seo.products.description'),
    ogDescription: t('seo.products.description'),
    ogImage: t('seo.global.image'),
    twitterCard: 'summary_large_image',
    twitterTitle: t('seo.products.title'),
    twitterDescription: t('seo.products.description'),
    twitterImage: t('seo.global.image'),
    twitterSite: '@ProtegeyHQ'
})

if (import.meta.server) {
    defineOgImageComponent('NuxtSeo', {
        title: t('seo.products.title'),
        description: t('seo.products.description'),
        theme: '#0E1225',
        colorMode: 'dark',
    })

    useSchemaOrg([
        {
            '@type': 'CollectionPage',
            name: t('seo.products.title'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: t('nav.home'),
                    item: 'https://www.protegey.com/'
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: t('nav.products'),
                    item: 'https://www.protegey.com/products'
                }
            ]
        }
    ])
}

const route = useRoute()
useHead(() => ({
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com' + (route.path === '/' ? '' : route.path) }
    ]
}))
</script>

<template>
    <div class="relative min-h-screen bg-neutral-950 overflow-hidden">
        <ProductHero />
        <Products />
        <ProductSuiteDetails />
        <ProductCTA />
    </div>
</template>
