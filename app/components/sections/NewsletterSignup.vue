<script setup lang="ts">
import { ref, computed } from 'vue'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const email = ref('')
const consent = ref(false)
const website = ref('')
const pending = ref(false)
const subscribed = ref(false)
const errorKey = ref('')
const message = computed(() => errorKey.value ? t(`newsletter.${errorKey.value}`) : '')

async function subscribe() {
  if (pending.value || subscribed.value) return
  errorKey.value = ''
  if (!consent.value) { errorKey.value = 'consent_required'; return }
  pending.value = true
  try {
    const response = await $fetch<{ success: boolean }>('/api/newsletter', {
      method: 'POST',
      body: { email: email.value, consent: consent.value, lang: locale.value, website: website.value }
    })
    if (!response.success) throw new Error('Subscription not completed')
    subscribed.value = true
    email.value = ''
    consent.value = false
  } catch (error: any) {
    const status = error?.statusCode || error?.response?.status
    errorKey.value = status === 429 ? 'too_many' : status === 503 ? 'unavailable' : status === 409 ? 'contact_support' : 'error'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section aria-labelledby="newsletter-title" class="newsletter-card relative isolate mb-12 overflow-hidden rounded-[2rem] border border-primary-500/25 bg-white p-6 shadow-xl shadow-primary-900/5 sm:p-9 lg:p-12 dark:border-primary-400/25 dark:bg-neutral-900">
    <div class="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 items-center">
      <div class="rtl:text-right">
        <div aria-hidden="true" class="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/10 text-primary-600 dark:text-primary-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
        </div>
        <h2 id="newsletter-title" class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">{{ t('newsletter.title') }}</h2>
        <p class="max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-300">{{ t('newsletter.description') }}</p>
      </div>
      <div>
        <p v-if="subscribed" role="status" class="rounded-2xl border border-primary-500/30 bg-primary-500/10 p-6 text-base leading-relaxed text-neutral-900 dark:text-white">{{ t('newsletter.success') }}</p>
        <form v-else @submit.prevent="subscribe" :aria-busy="pending" class="space-y-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/80 p-5 sm:p-6 dark:border-white/10 dark:bg-neutral-950/45">
          <div>
            <label for="newsletter-email" class="block mb-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">{{ t('newsletter.email') }}</label>
            <div class="flex flex-col sm:flex-row gap-3">
              <input id="newsletter-email" v-model="email" type="email" name="email" required maxlength="254" autocomplete="email" inputmode="email" dir="ltr" :disabled="pending" :aria-invalid="!!errorKey" :aria-describedby="errorKey ? 'newsletter-error' : undefined"
                class="min-w-0 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3.5 text-base text-neutral-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-60 transition-shadow" />
              <button type="submit" :disabled="pending" class="shrink-0 rounded-xl bg-primary-500 hover:bg-primary-400 px-6 py-3.5 text-base font-bold text-neutral-950 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-60 disabled:cursor-wait transition-all">
                {{ pending ? t('newsletter.submitting') : t('newsletter.subscribe') }}
              </button>
            </div>
          </div>
          <div class="hidden" aria-hidden="true">
            <label for="newsletter-website">Website</label>
            <input id="newsletter-website" v-model="website" name="website" tabindex="-1" autocomplete="off" />
          </div>
          <label class="flex items-start gap-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            <input v-model="consent" type="checkbox" required :disabled="pending" class="mt-1 h-4 w-4 shrink-0 accent-primary-500" />
            <span>{{ t('newsletter.consent') }}</span>
          </label>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {{ t('newsletter.unsubscribe') }}
            <NuxtLink :to="localePath('/privacy')" class="underline underline-offset-4 hover:text-primary-500">{{ t('newsletter.privacy') }}</NuxtLink>
          </p>
          <p v-if="errorKey" id="newsletter-error" role="alert" class="text-sm text-red-700 dark:text-red-400">{{ message }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.newsletter-card {
  background-image: radial-gradient(ellipse at 0% 0%, rgb(12 185 158 / 9%), transparent 65%);
}
.newsletter-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgb(12 185 158 / 80%), transparent);
  pointer-events: none;
}
.newsletter-card::after {
  content: '';
  position: absolute;
  width: 22rem;
  height: 22rem;
  inset-inline-start: -10rem;
  bottom: -18rem;
  border: 1px solid rgb(12 185 158 / 20%);
  border-radius: 50%;
  box-shadow: 0 0 0 3rem rgb(12 185 158 / 4%), 0 0 0 6rem rgb(12 185 158 / 3%);
  pointer-events: none;
  z-index: -1;
}
</style>
