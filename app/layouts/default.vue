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
    { name: 'geo.region', content: 'SN;CI;CM;MA;DZ;TN;EG;GH;NG;KE;ZA;ET;RW;TZ;UG;LY;SD;SS;GW;BF;ML;NE;TD;CF;GA;CG;CD;AO;ZM;ZW;MW;MZ;BI;DJ;ER;KM;MU;NA;SC;SO' },
    { name: 'geo.placename', content: "Dakar;Abidjan;Douala;Casablanca;Algiers;Tunis;Cairo;Accra;Lagos;Nairobi;Johannesburg;Addis Ababa;Kigali;Dodoma;Kampala;Tripoli;Khartoum;Rabat;Bissau;Ouagadougou;Bamako;Niamey;N'Djamena;Libreville;Brazzaville;Kinshasa;Luanda;Lusaka;Harare;Lilongwe;Maputo;Bujumbura;Djibouti;Asmara;Moroni;Port Louis;Windhoek;Victoria;Mogadishu" },
    { name: 'ICBM', content: '14.6925, -17.4467' },
    { name: 'geo.position', content: '14.6925,-17.4467;-1.9403,29.8739;6.4969,3.3792;4.0518,9.7679;-1.2921,36.8219;-26.2041,28.0473' },
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
  <div class="min-h-screen relative z-10 text-neutral-950 dark:text-white transition-colors duration-200">
    <HeaderNav />
    <slot />
    <Footer />
  </div>
</template>
