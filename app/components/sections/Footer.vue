<template>
  <footer role="contentinfo" aria-label="Site Footer"
    class="relative z-10 py-20 px-6 border-t border-neutral-900 bg-neutral-950 overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3">
      </div>
      <div
        class="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3">
      </div>
    </div>

    <div class="container mx-auto max-w-7xl relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
        <!-- Brand Section -->
        <div class="lg:col-span-4 max-w-sm">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-3 mb-6 group">
            <div
              class="p-2 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-primary-500/30 transition-colors">
              <img src="~/assets/images/logo.png" alt="Protegey Logo" class="w-10 h-10 object-contain"></img>
            </div>
            <span class="text-2xl font-bold text-white tracking-tight">PROTEGEY</span>
          </NuxtLink>
          <p class="text-neutral-400 leading-relaxed mb-8">
            {{ $t('footer.slogan') }}
          </p>
          <div class="flex gap-4">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-primary-400 hover:border-primary-500/30 transition-all"
              :aria-label="social.name">
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Products -->
        <div class="lg:col-span-3">
          <h3 class="font-bold text-white mb-6 uppercase tracking-widest text-sm">{{ $t('nav.products') }}</h3>
          <ul class="space-y-4">
            <li v-for="product in products" :key="product.id">
              <NuxtLink :to="localePath(`/products/${product.id}`)"
                class="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                <span
                  class="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-primary-500 transition-colors"></span>
                {{ $t(`products.${product.id}.title`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Links Grid -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-8">
          <div>
            <h3 class="font-bold text-white mb-6 uppercase tracking-widest text-sm">{{ $t('footer.company') }}</h3>
            <ul class="space-y-4">
              <li>
                <NuxtLink :to="localePath('about')" class="text-neutral-400 hover:text-primary-400 transition-colors">
                  {{ $t('footer.links.about') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('contact')" class="text-neutral-400 hover:text-primary-400 transition-colors">
                  {{ $t('footer.links.contact') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('careers')" class="text-neutral-400 hover:text-primary-400 transition-colors">
                  {{ $t('footer.links.careers') }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-white mb-6 uppercase tracking-widest text-sm">{{ $t('footer.resources') }}</h3>
            <ul class="space-y-4">
              <li>
                <NuxtLink :to="localePath('api-docs')"
                  class="text-neutral-400 hover:text-primary-400 transition-colors">
                  {{ $t('footer.links.api_docs') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('privacy')" class="text-neutral-400 hover:text-primary-400 transition-colors">
                  {{ $t('footer.links.privacy') }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500">
        <p>{{ $t('footer.copyright', { year: currentYear }) }}</p>
        <div class="flex items-center gap-8">
          <NuxtLink :to="localePath('privacy')" class="hover:text-neutral-300 transition-colors">Terms of Service
          </NuxtLink>
          <NuxtLink :to="localePath('privacy')" class="hover:text-neutral-300 transition-colors">Cookie Policy
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import {
  Linkedin01Icon,
  NewTwitterIcon
} from '@hugeicons/core-free-icons'

const currentYear = computed(() => new Date().getFullYear())
const localePath = useLocalePath()

const products = [
  { id: 'signal' },
  { id: 'radar' },
  { id: 'api' },
  { id: 'console' },
  { id: 'compliance' },
  { id: 'panid' }
]

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/protegeyhq/', icon: Linkedin01Icon },
  { name: 'X', url: 'https://x.com/ProtegeyHQ', icon: NewTwitterIcon }
]
</script>
