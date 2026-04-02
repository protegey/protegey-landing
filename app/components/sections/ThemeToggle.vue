<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const { t } = useI18n()
</script>

<template>
  <button
    class="p-2.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
    type="button"
    :aria-label="isDark ? t('a11y.theme_light') : t('a11y.theme_dark')"
    @click="toggleTheme()"
  >
    <!-- Sun: shown in dark mode (click to go light) -->
    <svg v-show="isDark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM4.5 13a1 1 0 1 1 0-2H6a1 1 0 1 1 0 2H4.5ZM18 13a1 1 0 1 1 0-2h1.5a1 1 0 1 1 0 2H18ZM6.4 6.4a1 1 0 0 1 1.4 0L8.9 7.5A1 1 0 0 1 7.5 8.9L6.4 7.8a1 1 0 0 1 0-1.4Zm9.7 9.7a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 1 1-1.4 1.4l-1.1-1.1a1 1 0 0 1 0-1.4Zm0-9.7 1.1-1.1a1 1 0 0 1 1.4 1.4L17.5 7.5A1 1 0 1 1 16.1 6.1ZM7.5 15.1a1 1 0 0 1 1.4 1.4l-1.1 1.1a1 1 0 1 1-1.4-1.4l1.1-1.1ZM12 19a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V20a1 1 0 0 1 1-1Z"/>
    </svg>
    <!-- Moon: shown in light mode (click to go dark) -->
    <svg v-show="!isDark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
    </svg>
  </button>
</template>
