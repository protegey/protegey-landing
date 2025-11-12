<script setup>
import { Analytics } from '@vercel/analytics/vue'
const config = useRuntimeConfig()
const vercelAnalyticsEnabled = computed(() => Boolean(config.public?.vercelAnalyticsEnabled))

</script>

<template>  
  <NuxtLayout>
    <NuxtPage />
    <Analytics v-if="vercelAnalyticsEnabled" />
    <NuxtRouteAnnouncer />
  </NuxtLayout>
</template>
