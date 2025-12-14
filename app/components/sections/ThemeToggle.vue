<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-medium bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white shadow-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
    type="button"
    aria-label="Toggle color theme"
    @click="toggleTheme()"
  >
    <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM4.5 13a1 1 0 1 1 0-2H6a1 1 0 1 1 0 2H4.5ZM18 13a1 1 0 1 1 0-2h1.5a1 1 0 1 1 0 2H18ZM6.4 6.4a1 1 0 0 1 1.4 0L8.9 7.5A1 1 0 0 1 7.5 8.9L6.4 7.8a1 1 0 0 1 0-1.4Zm9.7 9.7a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 1 1-1.4 1.4l-1.1-1.1a1 1 0 0 1 0-1.4Zm0-9.7 1.1-1.1a1 1 0 0 1 1.4 1.4L17.5 7.5A1 1 0 1 1 16.1 6.1ZM7.5 15.1a1 1 0 0 1 1.4 1.4l-1.1 1.1a1 1 0 1 1-1.4-1.4l1.1-1.1ZM12 19a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V20a1 1 0 0 1 1-1Z"/>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
    </svg>
    <span>{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>
