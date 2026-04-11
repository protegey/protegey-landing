<template>
  <footer role="contentinfo" :aria-label="$t('footer.aria_footer')"
    class="relative z-10 py-12 px-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
    <div class="container mx-auto max-w-6xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <NuxtLink :to="localePath('/')" class="flex items-center gap-2 mb-4 rtl:justify-end">
            <img src="/images/logo-dark.svg" :alt="isDark ? '' : $t('footer.logo_alt')" class="h-8 w-auto max-w-none shrink-0" :class="isDark ? 'hidden' : 'block'" />
            <img src="/images/logo-light.svg" :alt="isDark ? $t('footer.logo_alt') : ''" class="h-8 w-auto max-w-none shrink-0" :class="isDark ? 'block' : 'hidden'" />
          </NuxtLink>
          <p class="text-sm text-neutral-500 dark:text-neutral-400 rtl:text-right">{{ $t('footer.slogan') }}</p>
        </div>

        <div class="rtl:text-right">
          <h3 class="font-semibold mb-4 text-neutral-900 dark:text-white">{{ $t('footer.company') }}</h3>
          <ul class="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
            <li>
              <NuxtLink :to="localePath('about')" class="hover:text-primary-400 transition-colors"
                data-testid="link-about">{{
                  $t('footer.links.about') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('contact')" class="hover:text-primary-400 transition-colors"
                data-testid="link-contact">
                {{ $t('footer.links.contact') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('careers')" class="hover:text-primary-400 transition-colors"
                data-testid="link-careers">
                {{ $t('footer.links.careers') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="rtl:text-right">
          <h3 class="font-semibold mb-4 text-neutral-900 dark:text-white">{{ $t('nav.solutions') }}</h3>
          <ul class="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
            <li>
              <NuxtLink :to="localePath('/solutions/transaction-monitoring')" class="hover:text-primary-400 transition-colors">
                {{ $t('solutions.modules.transaction-monitoring.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/solutions/account-protection')" class="hover:text-primary-400 transition-colors">
                {{ $t('solutions.modules.account-protection.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/solutions/aml-compliance')" class="hover:text-primary-400 transition-colors">
                {{ $t('solutions.modules.aml-compliance.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/solutions/risk-profiling')" class="hover:text-primary-400 transition-colors">
                {{ $t('solutions.modules.risk-profiling.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/solutions/fraud-intelligence')" class="hover:text-primary-400 transition-colors">
                {{ $t('solutions.modules.fraud-intelligence.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/panid')"
                class="hover:text-primary-400 transition-colors flex items-center gap-2 rtl:justify-end">
                {{ $t('solutions.panid_teaser.title') }}
                <span
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-500/10 text-primary-400 border border-primary-500/20 leading-none">
                  {{ $t('solutions.coming_soon') }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="rtl:text-right">
          <h3 class="font-semibold mb-4 text-neutral-900 dark:text-white">{{ $t('footer.resources') }}</h3>
          <ul class="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
            <li>
              <NuxtLink :to="localePath('who-its-for')" class="hover:text-primary-400 transition-colors">
                {{ $t('footer.links.who_its_for') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('api-docs')" class="hover:text-primary-400 transition-colors"
                data-testid="link-api-docs">{{
                  $t('footer.links.api_docs') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('trust')" class="hover:text-primary-400 transition-colors">
                {{ $t('footer.links.trust') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('regulatory-alignment')" class="hover:text-primary-400 transition-colors">
                {{ $t('footer.links.regulatory_alignment') }}
              </NuxtLink>
            </li>
          </ul>

          <h3 class="font-semibold mt-8 mb-4 text-neutral-900 dark:text-white">{{ $t('footer.legal') }}</h3>
          <ul class="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
            <li>
              <NuxtLink :to="localePath('privacy')" class="hover:text-primary-400 transition-colors"
                data-testid="link-privacy">
                {{ $t('footer.links.privacy') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('terms')" class="hover:text-primary-400 transition-colors">
                {{ $t('footer.links.terms') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="rtl:text-right">
          <h3 class="font-semibold mb-4 text-neutral-900 dark:text-white">{{ $t('nav.industries') }}</h3>
          <ul class="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
            <li>
              <NuxtLink :to="localePath('/use-cases/banks')" class="hover:text-primary-400 transition-colors">
                {{ $t('industries.sectors.banks.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/use-cases/fintechs')" class="hover:text-primary-400 transition-colors">
                {{ $t('industries.sectors.fintechs.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/use-cases/mobile_money')" class="hover:text-primary-400 transition-colors">
                {{ $t('industries.sectors.mobile_money.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/use-cases/regulators')" class="hover:text-primary-400 transition-colors">
                {{ $t('industries.sectors.regulators.title') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/use-cases')" class="hover:text-primary-400 transition-colors font-medium">
                {{ $t('industries.view_all') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="font-semibold mb-4 text-neutral-900 dark:text-white">{{ $t('footer.connect') }}</h3>
          <div class="flex gap-4">
            <a href="https://www.linkedin.com/company/protegeyhq/" target="_blank" rel="noopener noreferrer"
              class="text-neutral-500 dark:text-neutral-400 hover:text-primary-400 transition-colors"
              :aria-label="$t('footer.social_linkedin')" data-testid="link-linkedin">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8.5 19.5H5.5V9h3v10.5zM7 7.8c-.9 0-1.6-.8-1.6-1.7 0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.7 1.7-1.6 1.7zM20 19.5h-3v-5.5c0-1.3-.5-2.2-1.6-2.2-1 0-1.5.7-1.8 1.4-.1.3-.1.8-.1 1.2V19.5h-3V9h3v1.4c.4-.6 1.3-1.6 3-1.6 2.2 0 3.9 1.5 3.9 4.9V19.5z" />
              </svg>
            </a>
            <a href="https://x.com/ProtegeyHQ" target="_blank" rel="noopener noreferrer"
              class="text-neutral-500 dark:text-neutral-400 hover:text-primary-400 transition-colors"
              :aria-label="$t('footer.social_twitter')" data-testid="link-x">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M24 4.6c-.9.4-1.9.7-2.9.8 1-0.6 1.7-1.6 2.1-2.8-1 0.6-2.1 1-3.3 1.2-1-1-2.5-1.6-4-1.6-3 0-5.3 2.8-4.6 5.9-3.9-.2-7.4-2.1-9.7-5.3-1.3 2.2-.6 5 1.3 6.3-0.8 0-1.5-0.2-2.2-0.6 0 2.3 1.6 4.3 3.8 4.7-0.7 0.2-1.4 0.3-2.1 0.1 0.6 2 2.4 3.4 4.5 3.5-2 1.5-4.5 2-6.8 1.4 2.5 1.6 5.4 2.5 8.5 2.5 10.2 0 15.8-8.8 15.8-16.3v-0.7c1.1-0.8 2-1.7 2.8-2.8-1 0.5-2 0.8-3.1 1" />
              </svg>
            </a>
            <a href="https://www.instagram.com/protegeyhq/" target="_blank" rel="noopener noreferrer"
              class="text-neutral-500 dark:text-neutral-400 hover:text-primary-400 transition-colors"
              aria-label="Instagram">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-neutral-200 dark:border-neutral-900 text-center text-sm text-neutral-500 dark:text-neutral-400 rtl:text-right">
        <p>{{ $t('footer.copyright', { year: currentYear }) }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
const localePath = useLocalePath()
const { isDark } = useTheme()
</script>
