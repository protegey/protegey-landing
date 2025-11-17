<script setup>
import { ref } from 'vue'
import ThemeToggle from '~/components/ui/ThemeToggle.vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const scrollTo = (selector) => {
  const el = document.getElementById(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <a href="#" class="text-lg font-bold text-slate-900 dark:text-white">PROTEGEY</a>
      </div>

  <nav class="hidden md:flex items-center gap-6" role="navigation" aria-label="Main">
        <a class="text-sm text-slate-700 dark:text-slate-300 hover:text-lime-500" href="#solution">Solution</a>
        <a class="text-sm text-slate-700 dark:text-slate-300 hover:text-lime-500" href="#who">Who</a>
        <a class="text-sm text-slate-700 dark:text-slate-300 hover:text-lime-500" href="#features">Features</a>
        <a class="text-sm text-slate-700 dark:text-slate-300 hover:text-lime-500" href="#waitlist">Join</a>
      </nav>

  <div class="hidden md:flex items-center gap-4">
        <ThemeToggle />
        <button @click.prevent="scrollTo('waitlist')" class="bg-lime-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-lime-600">Join Waitlist</button>
      </div>

  <!-- Mobile -->
  <div class="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button @click="toggleMenu" aria-expanded="isOpen" aria-label="Open menu" class="p-2 rounded-md border border-slate-200 dark:border-gray-700">
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" clip-rule="evenodd"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
        </button>
      </div>
  </div>
    <div v-if="isOpen" class="md:hidden fixed left-0 right-0 top-16 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-gray-700 shadow">
      <div class="px-4 py-3 flex flex-col gap-2">
        <a @click.prevent="scrollTo('solution'); toggleMenu()" class="text-sm text-slate-700 dark:text-slate-300">Solution</a>
        <a @click.prevent="scrollTo('who'); toggleMenu()" class="text-sm text-slate-700 dark:text-slate-300">Who</a>
        <a @click.prevent="scrollTo('features'); toggleMenu()" class="text-sm text-slate-700 dark:text-slate-300">Features</a>
        <a @click.prevent="scrollTo('waitlist'); toggleMenu()" class="text-sm text-slate-700 dark:text-slate-300">Join</a>
        <button class="mt-2 bg-lime-500 text-white px-4 py-2 rounded-xl font-semibold" @click.prevent="scrollTo('waitlist'); toggleMenu()">Join Waitlist</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.container { max-width: 1150px; }
</style>
