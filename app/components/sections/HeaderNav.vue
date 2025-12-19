<script setup>
import { ref } from 'vue'
import ThemeToggle from '~/components/sections/ThemeToggle.vue'

const { locale, setLocale } = useI18n()
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const scrollTo = (selector) => {
  const el = document.getElementById(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const toggleLanguage = () => {
  setLocale(locale.value === 'en' ? 'fr' : 'en')
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <a href="/" class="flex items-center">
          <img src="~/assets/images/logo.png" alt="Protegey Logo" class="w-14 h-14 object-contain"></img>
          <span class="text-xl font-bold text-white tracking-tight">Protegey</span>
        </a>
      </div>



      <div class="hidden md:flex items-center gap-4">
        <button @click="toggleLanguage" class="text-neutral-400 hover:text-white font-medium text-sm transition-colors">
          {{ locale === 'en' ? 'FR' : 'EN' }}
        </button>
        <!-- <ThemeToggle /> -->
        <button @click.prevent="scrollTo('waitlist')"
          class="bg-primary-500 text-neutral-950 px-6 py-2.5 rounded-lg font-bold hover:bg-primary-400 transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40">
          {{ $t('nav.request_demo') }}
        </button>
      </div>

      <!-- Mobile -->
      <div class="md:hidden flex items-center gap-4">
        <button @click="toggleLanguage" class="text-neutral-400 hover:text-white font-medium text-sm transition-colors">
          {{ locale === 'en' ? 'FR' : 'EN' }}
        </button>
        <!-- <ThemeToggle /> -->
        <button @click="toggleMenu" :aria-expanded="isOpen" :aria-label="isOpen ? 'Close menu' : 'Open menu'"
          class="p-2 rounded-md border border-neutral-800 text-neutral-300">
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd" d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" clip-rule="evenodd" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isOpen"
      class="md:hidden fixed left-0 right-0 top-20 z-40 bg-neutral-950 border-t border-neutral-800 shadow-2xl">
      <div class="px-4 py-3 flex flex-col gap-2">

        <button
          class="mt-2 bg-primary-500 text-neutral-950 px-6 py-3 rounded-lg font-bold hover:bg-primary-400 shadow-lg shadow-primary-500/20"
          @click.prevent="scrollTo('waitlist'); toggleMenu()">{{ $t('nav.request_demo') }}</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
