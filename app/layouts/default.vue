<script setup>
import ThemeToggle from '~/components/ui/ThemeToggle.vue'
// Theme is auto-initialized in the composable
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <div class="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>
    <slot />
  </div>
</template>

