<script setup>
import HeaderNav from '~/components/sections/HeaderNav.vue'
import Footer from '~/components/sections/Footer.vue'
// Theme is auto-initialized in the composable

const { t, locale } = useI18n()
const route = useRoute()

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

const baseUrl = 'https://www.protegey.com'

const getCanonicalUrl = computed(() => {
  const currentLocale = locale.value
  const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`
  const path = route.path === '/' ? '' : route.path.replace(/^\/(en|fr|ar)/, '')
  return `${baseUrl}${localePrefix}${path}`
})

const alternateLinks = computed(() => {
  const locales = ['en', 'fr', 'ar']
  const cleanPath = route.path === '/' ? '' : route.path.replace(/^\/(en|fr|ar)/, '')
  
  const links = locales.map(loc => ({
    rel: 'alternate',
    hreflang: loc,
    href: `${baseUrl}${loc === 'en' ? '' : `/${loc}`}${cleanPath}`
  }))
  
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}${cleanPath}`
  })
  
  return links
})

const organizationSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Protegey",
  "url": baseUrl,
  "logo": `${baseUrl}/og-image.png`,
  "sameAs": [
    "https://www.linkedin.com/company/protegeyhq/",
    "https://x.com/ProtegeyHQ"
  ]
}))

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Protegey",
  "url": baseUrl
}

useHead(() => ({
  titleTemplate: (titleChunk) => {
    if (!titleChunk) return t('seo.global.title')
    return titleChunk.includes('Protegey') ? titleChunk : `${titleChunk} | Protegey`
  },
  htmlAttrs: {
    lang: head.value.htmlAttrs.lang,
    dir: head.value.htmlAttrs.dir
  },
  meta: [
    { name: 'description', content: t('seo.global.description') },
    { name: 'keywords', content: t('seo.global.keywords') },
    { property: 'og:site_name', content: 'Protegey' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: t('seo.global.image') },
    { property: 'og:image:alt', content: t('seo.global.image_alt') },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@ProtegeyHQ' },
    { name: 'twitter:image', content: t('seo.global.image') },
    ...(head.value.meta || [])
  ],
  link: [
    { rel: 'canonical', href: getCanonicalUrl.value },
    ...alternateLinks.value,
    ...(head.value.link || [])
  ],
  script: [
    {
      key: 'ldjson-org',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema.value)
    },
    {
      key: 'ldjson-website',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(websiteSchema)
    }
  ]
}))
</script>

<template>
  <div class="min-h-screen relative z-10 text-gray-900 dark:text-white transition-colors duration-200">
    <HeaderNav />
    <slot />
    <Footer />
  </div>
</template>
