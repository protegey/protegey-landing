<template>
  <div class="relative min-h-screen bg-neutral-950">
    <!-- Content -->
    <div class="relative">
      <Hero />
      <WhyProtegey :isDark="isDark" />
      <!-- <Products />
      <SignalPipeline /> -->
      <!-- <TrustedBy /> -->
      <FAQ />
      <WaitlistDemo />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from '~/composables/useTheme'
import Hero from '~/components/sections/Hero.vue'
import WhyProtegey from '~/components/sections/WhyProtegey.vue'
import Products from '~/components/sections/Products.vue'
import SignalPipeline from '~/components/sections/SignalPipeline.vue'
import TrustedBy from '~/components/sections/TrustedBy.vue'
import FAQ from '~/components/sections/FAQ.vue'
import WaitlistDemo from '~/components/sections/WaitlistDemo.vue'

const { isDark } = useTheme()
const { t } = useI18n()

if (import.meta.server) {
  defineOgImageComponent('NuxtSeo', {
    title: t('seo.index.title'),
    description: t('seo.index.description'),
    theme: '#0B1741',
    colorMode: 'dark',
  })
}

useSeoMeta({
  title: t('seo.index.title'),
  ogTitle: t('seo.index.title'),
  description: t('seo.index.description'),
  ogDescription: t('seo.index.description'),
  ogImage: t('seo.global.image'),
  twitterCard: 'summary_large_image',
  twitterTitle: t('seo.index.title'),
  twitterDescription: t('seo.index.description'),
  twitterImage: t('seo.global.image'),
  twitterSite: '@ProtegeyHQ'
})

if (import.meta.server) {
  const baseUrl = 'https://www.protegey.com'
  useSchemaOrg([
    {
      '@type': 'Organization',
      name: 'Protegey',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      sameAs: [
        'https://twitter.com/ProtegeyHQ',
        'https://www.linkedin.com/company/protegey'
      ],
      areaServed: [
        'Senegal', 'Ivory Coast', 'Cameroon', 'Morocco', 'Algeria', 'Tunisia', 'Egypt', 'Democratic Republic of Congo'
      ],
      description: t('geo.canonical_definition')
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Protegey',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Platform Independent',
      softwareVersion: '1.0.0',
      description: t('geo.canonical_definition'),
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      }
    },
    {
      '@type': 'WebSite',
      name: 'Protegey',
      url: baseUrl
    }
  ])
}

useHead({
    meta: [
        { name: 'geo.region', content: 'SN;CI;CM;MA;DZ;TN;EG;GH;NG;KE;ZA;ET;RW;TZ;UG;DZ;LY;SD;SS;MA;GW;SN;BF;ML;NE;TD;CF;GA;CG;CD;AO;ZM;ZW;MW;MZ;BI;DJ;ER;KM;MU;NA;SC;SO;SD' },
        { name: 'geo.placename', content: 'Dakar;Abidjan;Douala;Casablanca;Algiers;Tunis;Cairo;Accra;Lagos;Nairobi;Johannesburg;Addis Ababa;Kigali;Dodoma;Kampala;Tripoli;Khartoum;Rabat;Bissau;Ouagadougou;Bamako;Niamey;N;Djamena;Libreville;Brazzaville;Kinshasa;Luanda;Lusaka;Harare;Lilongwe;Maputo;Bujumbura;Djibouti;Asmara;Moroni;Port Louis;Windhoek;Victoria;Mogadishu' },
        { name: 'ICBM', content: '14.6925, -17.4467' },
        { name: 'geo.position', content: '14.6925,-17.4467;-1.9403,29.8739;6.4969,3.3792;4.0518,9.7679;-1.2921,36.8219;-26.2041,28.0473' },
        { name: 'keywords', content: t('seo.global.keywords') }
    ]
})

onMounted(() => {
  // Fix for accessibility issue where data-aria-hidden is incorrectly applied
  const content = document.querySelector('.min-h-screen.bg-neutral-950')
  if (content) {
    content.removeAttribute('data-aria-hidden')
    content.removeAttribute('aria-hidden')
  }

  const header = document.querySelector('header')
  if (header) {
    header.removeAttribute('data-aria-hidden')
    header.removeAttribute('aria-hidden')
  }

  const footer = document.querySelector('footer')
  if (footer) {
    footer.removeAttribute('data-aria-hidden')
    footer.removeAttribute('aria-hidden')
  }
})
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.typewriter::after {
  content: '|';
  margin-left: 0.25rem;
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>
