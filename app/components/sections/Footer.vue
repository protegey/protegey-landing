<template>
  <footer role="contentinfo" aria-label="Site Footer" class="py-12 px-6 border-t border-neutral-900 bg-neutral-950">
    <div class="container mx-auto max-w-6xl">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <NuxtLink to="/" class="flex items-center gap-2 mb-4">
            <img src="~/assets/images/logo.png" alt="Protegey Logo" class="w-14 h-14 object-contain"></img>
            <span class="text-lg font-bold text-white">PROTEGEY</span>
          </NuxtLink>
          <p class="text-sm text-neutral-400">{{ $t('footer.slogan') }}</p>
        </div>

        <!-- Company -->
        <div>
          <h3 class="font-semibold mb-4 text-white">{{ $t('footer.company') }}</h3>
          <ul class="space-y-2 text-sm text-neutral-400">
            <li>
              <NuxtLink to="/about" class="hover:text-primary-400 transition-colors" data-testid="link-about">{{
                $t('footer.links.about') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-primary-400 transition-colors" data-testid="link-contact">
                {{ $t('footer.links.contact') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/careers" class="hover:text-primary-400 transition-colors" data-testid="link-careers">
                {{ $t('footer.links.careers') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="font-semibold mb-4 text-white">{{ $t('footer.resources') }}</h3>
          <ul class="space-y-2 text-sm text-neutral-400">
            <li>
              <NuxtLink to="/api-docs" class="hover:text-primary-400 transition-colors" data-testid="link-api-docs">{{
                $t('footer.links.api_docs') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="hover:text-primary-400 transition-colors" data-testid="link-privacy">
                {{ $t('footer.links.privacy') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="font-semibold mb-4 text-white">{{ $t('footer.connect') }}</h3>
          <div class="flex gap-4">
            <a href="https://www.linkedin.com/company/protegeyhq/" target="_blank" rel="noopener noreferrer"
              class="text-neutral-400 hover:text-primary-400 transition-colors" aria-label="LinkedIn"
              data-testid="link-linkedin">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8.5 19.5H5.5V9h3v10.5zM7 7.8c-.9 0-1.6-.8-1.6-1.7 0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.7 1.7-1.6 1.7zM20 19.5h-3v-5.5c0-1.3-.5-2.2-1.6-2.2-1 0-1.5.7-1.8 1.4-.1.3-.1.8-.1 1.2V19.5h-3V9h3v1.4c.4-.6 1.3-1.6 3-1.6 2.2 0 3.9 1.5 3.9 4.9V19.5z" />
              </svg>
            </a>
            <a href="https://x.com/ProtegeyHQ" target="_blank" rel="noopener noreferrer"
              class="text-neutral-400 hover:text-primary-400 transition-colors" aria-label="X (Twitter)"
              data-testid="link-x">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M24 4.6c-.9.4-1.9.7-2.9.8 1-0.6 1.7-1.6 2.1-2.8-1 0.6-2.1 1-3.3 1.2-1-1-2.5-1.6-4-1.6-3 0-5.3 2.8-4.6 5.9-3.9-.2-7.4-2.1-9.7-5.3-1.3 2.2-.6 5 1.3 6.3-0.8 0-1.5-0.2-2.2-0.6 0 2.3 1.6 4.3 3.8 4.7-0.7 0.2-1.4 0.3-2.1 0.1 0.6 2 2.4 3.4 4.5 3.5-2 1.5-4.5 2-6.8 1.4 2.5 1.6 5.4 2.5 8.5 2.5 10.2 0 15.8-8.8 15.8-16.3v-0.7c1.1-0.8 2-1.7 2.8-2.8-1 0.5-2 0.8-3.1 1" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-neutral-900 text-center text-sm text-neutral-400">
        <p>{{ $t('footer.copyright', { year: currentYear }) }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Shield01Icon } from '@hugeicons/core-free-icons'

const currentYear = computed(() => new Date().getFullYear())
</script>
