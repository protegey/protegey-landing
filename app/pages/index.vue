<template>
  <div class="relative min-h-screen bg-neutral-950">
    <!-- Content -->
    <div class="relative">
      <Hero />
      <WhyProtegey :isDark="isDark" />
      <Products />
      <TrustedBy />
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
import Products from '~/components/sections/Products.vue'
import TrustedBy from '~/components/sections/TrustedBy.vue'
// import NetworkMap from '~/components/sections/NetworkMap.vue'
// import Solution from '~/components/sections/Solution.vue'
// import Features from '~/components/sections/Features.vue'
// import Target from '~/components/sections/Target.vue'
import WaitlistDemo from '~/components/sections/WaitlistDemo.vue'

const { isDark } = useTheme()
const { t } = useI18n()

useHead({
  title: t('seo.index.title'),
  meta: [
    { name: 'description', content: t('seo.index.description') },
    { name: 'keywords', content: t('seo.global.keywords') },
    // Open Graph
    { property: 'og:title', content: t('seo.index.title') },
    { property: 'og:description', content: t('seo.index.description') },
    { property: 'og:image', content: t('seo.global.image') },
    // Twitter
    { name: 'twitter:title', content: t('seo.index.title') },
    { name: 'twitter:description', content: t('seo.index.description') },
    { name: 'twitter:image', content: t('seo.global.image') }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.protegey.com' }
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
