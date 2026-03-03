<script setup>
import ProductHero from '~/components/products/ProductHero.vue'
import Products from '~/components/sections/Products.vue'
import ProductSuiteDetails from '~/components/products/ProductSuiteDetails.vue'
import ProductCTA from '~/components/products/ProductCTA.vue'

const { t, locale } = useI18n()

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
    const baseUrl = 'https://www.protegey.com'
    const currentLocale = locale.value
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`

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
                    item: baseUrl
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: t('nav.products'),
                    item: `${baseUrl}${localePrefix}/products`
                }
            ]
        }
    ])
}
</script>

<template>
    <div class="relative min-h-screen bg-neutral-950 overflow-hidden">
        <ProductHero />
        <Products />
        <ProductSuiteDetails />
        <ProductCTA />
    </div>
</template>
