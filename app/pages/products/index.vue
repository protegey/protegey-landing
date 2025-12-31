<script setup>
import ProductHero from '~/components/products/ProductHero.vue'
import Products from '~/components/sections/Products.vue'
import ProductSuiteDetails from '~/components/products/ProductSuiteDetails.vue'
import ProductCTA from '~/components/products/ProductCTA.vue'

const { t } = useI18n()

defineOgImageComponent('NuxtSeo', {
    title: t('seo.products.title'),
    description: t('seo.products.description'),
    theme: '#0E1225',
    colorMode: 'dark',
})

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

useSchemaOrg([
    defineWebPage({
        name: t('seo.products.title'),
    }),
    defineBreadcrumb({
        items: [
            { name: t('nav.home'), item: '/' },
            { name: t('nav.products'), item: '/products' }
        ]
    })
])

useHead({
    link: [
        { rel: 'canonical', href: 'https://www.protegey.com/products' }
    ]
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-950 overflow-hidden">
        <ProductHero />
        <Products />
        <ProductSuiteDetails />
        <ProductCTA />
    </div>
</template>
