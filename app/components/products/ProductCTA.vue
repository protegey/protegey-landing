<script setup>
import { computed } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
    <section class="relative py-24 px-6 md:py-32 bg-neutral-950 overflow-hidden border-t border-neutral-900">
        <!-- Background Decor -->
        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]">
            </div>
        </div>

        <div class="container mx-auto max-w-5xl relative z-10 text-center">
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                {{ $t('products.cta.title') }}
            </h2>
            <p class="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                {{ $t('products.cta.subtitle') }}
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <!-- Join Waitlist -->
                <NuxtLink :to="localePath('/#waitlist')"
                    class="w-full sm:w-auto px-10 py-4 rounded-xl bg-primary-500 text-neutral-950 font-bold text-lg hover:bg-primary-400 transition-all hover:scale-105 shadow-lg shadow-primary-500/20">
                    {{ $t('products.cta.request_demo') }}
                </NuxtLink>

                <!-- Contact Sales -->
                <NuxtLink :to="localePath('contact')"
                    class="w-full sm:w-auto px-10 py-4 rounded-xl border border-neutral-700 bg-neutral-900 text-white font-bold text-lg hover:bg-neutral-800 transition-all hover:border-neutral-600">
                    {{ $t('products.cta.contact_us') }}
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
