<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from '~/components/sections/ThemeToggle.vue'

const { locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const isOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollTo = (selector) => {
  const el = document.getElementById(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <header class="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out" :class="[
    isScrolled
      ? 'top-0 w-full bg-white/95 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800'
      : 'top-4 w-[95%] max-w-7xl bg-white/80 dark:bg-neutral-900/40 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/30 rounded-3xl shadow-2xl'
  ]">
    <div class="container mx-auto px-6 transition-all duration-500" :class="isScrolled ? 'h-16' : 'h-14'">
      <div class="flex items-center justify-between h-full">
        <div class="flex items-center gap-4">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
            <img src="~/assets/images/logo.png" :alt="$t('footer.logo_alt')" class="w-8 h-8 object-contain"></img>
            <span class="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Protegey</span>
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <NuxtLink :to="localePath('about')"
            class="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium text-sm transition-colors">{{
              $t('nav.about') }}</NuxtLink>
          <NuxtLink :to="localePath('products')"
            class="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium text-sm transition-colors">{{
              $t('nav.products') }}</NuxtLink>
          <NuxtLink :to="localePath('contact')"
            class="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium text-sm transition-colors">{{
              $t('nav.contact') }}</NuxtLink>
        </div>

        <div class="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <div class="flex items-center bg-neutral-100/80 dark:bg-neutral-800/50 rounded-lg p-1 border border-neutral-200/50 dark:border-neutral-700/30">
            <template v-for="l in ['en', 'fr', 'ar']" :key="l">
              <NuxtLink :to="switchLocalePath(l)"
                class="px-2 py-1 rounded text-[10px] font-bold transition-all uppercase" :class="[
                  locale === l
                    ? 'bg-primary-500 text-neutral-950'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                ]">
                {{ l }}
              </NuxtLink>
            </template>
          </div>
          <NuxtLink :to="localePath('/#waitlist')" :class="[
            'transition-all duration-300 font-bold text-sm',
            isScrolled
              ? 'bg-primary-500 text-neutral-950 px-5 py-2 rounded-lg hover:bg-primary-400'
              : 'bg-neutral-900/10 text-neutral-900 dark:text-white hover:bg-neutral-900/20 dark:bg-white/10 dark:hover:bg-white/20 px-5 py-2 rounded-2xl backdrop-blur-sm'
          ]">
            {{ $t('nav.request_demo') }}
          </NuxtLink>
        </div>

        <!-- Mobile -->
        <div class="md:hidden flex items-center gap-2">
          <div class="flex items-center bg-neutral-100/80 dark:bg-neutral-800/50 rounded-lg p-1 border border-neutral-200/50 dark:border-neutral-700/30 mr-2">
            <template v-for="l in ['en', 'fr', 'ar']" :key="l">
              <NuxtLink :to="switchLocalePath(l)"
                class="px-2 py-1 rounded text-[10px] font-bold uppercase transition-all" :class="[
                  locale === l
                    ? 'bg-primary-500 text-neutral-950'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                ]">
                {{ l }}
              </NuxtLink>
            </template>
          </div>
          <ThemeToggle />
          <button @click="toggleMenu" :aria-expanded="isOpen"
            :aria-label="isOpen ? $t('nav.close_menu') : $t('nav.open_menu')"
            class="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300">
            <svg v-if="!isOpen" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd" d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" clip-rule="evenodd" />
            </svg>
            <svg v-else aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isOpen" role="navigation" :aria-label="$t('nav.mobile_menu_label')"
      @keydown.escape="isOpen = false"
      class="md:hidden absolute left-0 right-0 top-full mt-2 mx-4 z-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
      <div class="px-4 py-4 flex flex-col gap-4">
        <NuxtLink :to="localePath('about')" @click="toggleMenu"
          class="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium text-base transition-colors px-2">{{ $t('nav.about') }}
        </NuxtLink>
        <NuxtLink :to="localePath('products')" @click="toggleMenu"
          class="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium text-base transition-colors px-2">{{ $t('nav.products')
          }}
        </NuxtLink>
        <NuxtLink :to="localePath('contact')" @click="toggleMenu"
          class="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium text-base transition-colors px-2">{{ $t('nav.contact') }}
        </NuxtLink>
        <NuxtLink
          class="bg-primary-500 text-neutral-950 px-6 py-3 rounded-xl font-bold hover:bg-primary-400 shadow-lg shadow-primary-500/20 text-center"
          :to="localePath('/#waitlist')" @click="toggleMenu">{{ $t('nav.request_demo') }}</NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  will-change: transform, width, top, border-radius;
}
</style>
