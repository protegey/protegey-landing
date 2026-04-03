<script setup lang="ts">
import HeaderNav from '~/components/sections/HeaderNav.vue'
import Footer from '~/components/sections/Footer.vue'

const { t, locale } = useI18n()
const route = useRoute()

const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: false
})

const baseUrl = 'https://www.protegey.com'

const getCanonicalUrl = computed(() => {
  const currentLocale = locale.value
  // fr is default locale (no prefix); en and ar have prefixes
  const localePrefix = currentLocale === 'fr' ? '' : `/${currentLocale}`
  const path = route.path === '/' ? '' : route.path.replace(/^\/(en|fr|ar)/, '')
  return `${baseUrl}${localePrefix}${path}`
})

const alternateLinks = computed(() => {
  const locales = ['en', 'fr', 'ar']
  const cleanPath = route.path === '/' ? '' : route.path.replace(/^\/(en|fr|ar)/, '')
  
  const isoMap: Record<string, string> = { en: 'en-US', fr: 'fr-FR', ar: 'ar-EG' }
  const links = locales.map(loc => ({
    rel: 'alternate',
    hreflang: isoMap[loc] ?? loc,
    // fr is default locale (no prefix); en and ar have prefixes
    href: `${baseUrl}${loc === 'fr' ? '' : `/${loc}`}${cleanPath}`
  }))
  
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}${cleanPath}`
  })
  
  return links
})

useHead(() => ({
  titleTemplate: (titleChunk) => {
    if (!titleChunk) return t('seo.global.title')
    return titleChunk.includes('Protegey') ? titleChunk : `${titleChunk} | Protegey`
  },
  htmlAttrs: {
    lang: head.value.htmlAttrs.lang,
    dir: head.value.htmlAttrs.dir as 'auto' | 'ltr' | 'rtl' | undefined,
  },
  meta: [
    { name: 'description', content: t('seo.global.description') },
    { name: 'keywords', content: t('seo.global.keywords') },
    { name: 'geo.region', content: 'SN;CI;CM;MA;DZ;TN;EG;GH;NG;KE;ZA;ET;RW;TZ;UG;LY;SD;SS;GW;BF;ML;NE;TD;CF;GA;CG;CD;AO;ZM;ZW;MW;MZ;BI;DJ;ER;KM;MU;NA;SC;SO' },
    { name: 'geo.placename', content: "Dakar;Abidjan;Douala;Casablanca;Algiers;Tunis;Cairo;Accra;Lagos;Nairobi;Johannesburg;Addis Ababa;Kigali;Dodoma;Kampala;Tripoli;Khartoum;Rabat;Bissau;Ouagadougou;Bamako;Niamey;N'Djamena;Libreville;Brazzaville;Kinshasa;Luanda;Lusaka;Harare;Lilongwe;Maputo;Bujumbura;Djibouti;Asmara;Moroni;Port Louis;Windhoek;Victoria;Mogadishu" },
    { name: 'ICBM', content: '14.6925, -17.4467' },
    { name: 'geo.position', content: '14.6925,-17.4467;-1.9403,29.8739;6.4969,3.3792;4.0518,9.7679;-1.2921,36.8219;-26.2041,28.0473' },
    ...(head.value.meta || [])
  ],
  link: [
    { rel: 'canonical', href: getCanonicalUrl.value },
    ...alternateLinks.value,
    ...(head.value.link || [])
  ]
}))

// Default OG meta — pages override title/description/image via usePageMeta()
const ogLocale = computed(() => ({ en: 'en_US', fr: 'fr_FR', ar: 'ar_EG' } as Record<string, string>)[locale.value] ?? locale.value)

useSeoMeta({
  ogSiteName: 'Protegey',
  ogType: 'website',
  ogUrl: getCanonicalUrl,
  ogTitle: t('seo.global.title'),
  ogDescription: t('seo.global.description'),
  ogLocale,
  twitterCard: 'summary_large_image',
  twitterSite: '@ProtegeyHQ',
  twitterTitle: t('seo.global.title'),
  twitterDescription: t('seo.global.description'),
})
</script>

<template>
  <div class="relative z-10 text-neutral-950 dark:text-white transition-colors duration-200">
    <a href="#main-content" class="skip-nav">{{ t('a11y.skip_to_content') }}</a>
    <HeaderNav />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>
