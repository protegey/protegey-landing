<template>
  <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <SplashOverlay />
    <!-- Content -->
    <div class="relative">
      <Hero />
      <FrictionStrip />
      <Challenge />
      <ConnectedPlatform />
      <KycKybSpotlight />
      <HowItWorks2 />
      <IntelligenceLayer />
      <Workflows2 />
      <Industries2 />
      <Testimonials />
      <SdkStrip />
      <Integration2 />
      <Regulated2 />
      <Insights2 />
      <FinalCta2 />
      <FAQ />
      <WaitlistDemo />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SplashOverlay from '~/components/sections/SplashOverlay.vue'
import Hero from '~/components/sections/Hero.vue'
import FrictionStrip from '~/components/sections/FrictionStrip.vue'
import Challenge from '~/components/sections/Challenge.vue'
import ConnectedPlatform from '~/components/sections/ConnectedPlatform.vue'
import KycKybSpotlight from '~/components/sections/KycKybSpotlight.vue'
import HowItWorks2 from '~/components/sections/HowItWorks2.vue'
import IntelligenceLayer from '~/components/sections/IntelligenceLayer.vue'
import Workflows2 from '~/components/sections/Workflows2.vue'
import Industries2 from '~/components/sections/Industries2.vue'
import Testimonials from '~/components/sections/Testimonials.vue'
import SdkStrip from '~/components/sections/SdkStrip.vue'
import Integration2 from '~/components/sections/Integration2.vue'
import Regulated2 from '~/components/sections/Regulated2.vue'
import Insights2 from '~/components/sections/Insights2.vue'
import FinalCta2 from '~/components/sections/FinalCta2.vue'
import FAQ from '~/components/sections/FAQ.vue'
import WaitlistDemo from '~/components/sections/WaitlistDemo.vue'

const { t } = useI18n()

usePageMeta({
  title: t('seo.index.title'),
  description: t('seo.index.description'),
  schemaOrg: [
    {
      '@type': 'Organization',
      '@id': 'https://www.protegey.com/#organization',
      name: 'Protegey',
      url: 'https://www.protegey.com',
      logo: 'https://www.protegey.com/images/logo.svg',
      sameAs: [
        'https://x.com/ProtegeyHQ',
        'https://www.linkedin.com/company/protegeyhq/'
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
        price: 0,
        priceCurrency: 'USD',
      }
    },
    {
      '@type': 'WebSite',
      name: 'Protegey',
      url: 'https://www.protegey.com'
    }
  ]
})

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
  // GSAP ScrollTrigger incorrectly sets aria-hidden on semantic elements
  // when pinning sections. This restores accessibility for screen readers.
  // Root cause: ScrollTrigger.create({ pin: true }) adds data-aria-hidden
  // to elements outside its target scope.
  ;['.min-h-screen.bg-neutral-50', 'header', 'footer'].forEach(sel => {
    const el = document.querySelector(sel)
    if (el) {
      el.removeAttribute('data-aria-hidden')
      el.removeAttribute('aria-hidden')
    }
  })
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
