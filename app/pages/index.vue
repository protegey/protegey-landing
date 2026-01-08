<template>
  <div class="relative min-h-screen bg-neutral-950">
    <!-- Content -->
    <div class="relative">
      <Hero />
      <WhyProtegey :isDark="isDark" />
      <!-- <Products /> -->
      <TrustedBy />
      <!-- <GeographicCoverage /> -->
      <!-- <NetworkMap /> -->
      <!-- <Solution :isDark="isDark" />
      <Features :isDark="isDark" /> -->
      <!-- <Target :isDark="isDark" /> -->
      <WaitlistDemo />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from '~/composables/useTheme'
import Hero from '~/components/sections/Hero.vue'
import WhyProtegey from '~/components/sections/WhyProtegey.vue'
// import Products from '~/components/sections/Products.vue'
import TrustedBy from '~/components/sections/TrustedBy.vue'
// import GeographicCoverage from '~/components/sections/GeographicCoverage.vue'
// import NetworkMap from '~/components/sections/NetworkMap.vue'
// import Solution from '~/components/sections/Solution.vue'
// import Features from '~/components/sections/Features.vue'
// import Target from '~/components/sections/Target.vue'
import WaitlistDemo from '~/components/sections/WaitlistDemo.vue'

const { isDark } = useTheme()
const { t } = useI18n()

if (import.meta.server) {
  defineOgImageComponent('NuxtSeo', {
    title: t('seo.index.title'),
    description: t('seo.index.description'),
    theme: '#0E1225',
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
  useSchemaOrg([
    defineOrganization({
      name: 'Protegey',
      url: 'https://www.protegey.com',
      logo: 'https://www.protegey.com/logo.png',
      sameAs: [
        'https://twitter.com/ProtegeyHQ',
        'https://www.linkedin.com/company/protegey'
      ],
      areaServed: [
        'Senegal', 'Ivory Coast', 'Cameroon', 'Morocco', 'Algeria', 'Tunisia', 'Egypt', 'Democratic Republic of Congo'
      ],
      description: t('seo.global.description')
    }),
    defineWebSite({
      name: 'Protegey',
      url: 'https://www.protegey.com'
    }),
    defineWebPage()
  ])
}

const route = useRoute()
useHead(() => ({
  link: [
    { rel: 'canonical', href: 'https://www.protegey.com' + (route.path === '/' ? '' : route.path) }
  ],
  meta: [
    { name: 'geo.region', content: 'SN;CI;CM;MA;DZ;TN;EG;CD' },
    { name: 'geo.placename', content: 'Dakar;Abidjan;Douala;Casablanca;Algiers;Tunis;Cairo;Kinshasa' },
    { name: 'keywords', content: t('seo.global.keywords') }
  ]
}))

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
