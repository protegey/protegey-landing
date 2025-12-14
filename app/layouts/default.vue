<script setup>
import HeaderNav from '~/components/sections/HeaderNav.vue'
import Footer from '~/components/sections/Footer.vue'
// Theme is auto-initialized in the composable
</script>

<template>
  <div class="min-h-screen relative z-10 text-gray-900 dark:text-white transition-colors duration-200">
    <HeaderNav />
    <slot />
    <Footer />
  </div>
</template>
