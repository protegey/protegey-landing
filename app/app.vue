<script setup>
import { Analytics } from '@vercel/analytics/vue'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
const config = useRuntimeConfig()
const vercelAnalyticsEnabled = computed(() => Boolean(config.public?.vercelAnalyticsEnabled))

</script>

<template>  
  <NuxtLayout>
    <NuxtPage />
    <Analytics v-if="vercelAnalyticsEnabled" />
    <SpeedInsights />
    <NuxtRouteAnnouncer />
  </NuxtLayout>
</template>
