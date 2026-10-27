<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HugeiconsIcon } from '@hugeicons/vue';
import { BankIcon, PiggyBankIcon, SmartPhone01Icon, CreditCardIcon, Wallet01Icon } from '@hugeicons/core-free-icons';

gsap.registerPlugin(ScrollTrigger);

const localePath = useLocalePath();
const cards = [
    { key: 'banks', icon: BankIcon, accent: 'border-primary-500', photo: '/images/persona-banks.webp', glow: 'bg-primary-500/10' },
    { key: 'microfinance', icon: PiggyBankIcon, accent: 'border-secondary-500', photo: '/images/persona-microfinance.webp', glow: 'bg-secondary-500/10' },
    { key: 'mobile_money', icon: SmartPhone01Icon, accent: 'border-accent-cyan-500', photo: '/images/persona-mobile-money.webp', glow: 'bg-accent-cyan-500/10' },
    { key: 'fintechs', icon: CreditCardIcon, accent: 'border-accent-orange-500', photo: '/images/persona-fintechs.webp', glow: 'bg-accent-orange-500/10' },
    { key: 'payment_providers', icon: Wallet01Icon, accent: 'border-primary-500', photo: '/images/persona-payment-providers.webp', glow: 'bg-primary-500/10' },
];

onMounted(() => {
    gsap.from('.industry-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.industries-grid', start: 'top 80%' },
    });
});
</script>

<template>
    <section id="industries" class="relative bg-primary-500/5 dark:bg-neutral-950 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-14">
                <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                    {{ $t('industries2.eyebrow') }}
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
                    {{ $t('industries2.title') }}
                </h2>
            </div>

            <div class="industries-grid grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto mb-12">
                <div v-for="card in cards" :key="card.key"
                    class="industry-card bg-white dark:bg-neutral-900 border-l-4 rounded-xl overflow-hidden"
                    :class="card.accent">
                    <div class="relative h-32 flex items-end justify-center overflow-hidden" :class="card.glow">
                        <img :src="card.photo" :alt="$t(`industries2.cards.${card.key}.title`)"
                            class="h-full w-auto object-contain object-bottom" loading="lazy" />
                    </div>
                    <div class="p-5">
                        <HugeiconsIcon :icon="card.icon" :size="18" class="text-neutral-400 dark:text-neutral-500 mb-2" />
                        <h3 class="font-bold text-neutral-900 dark:text-white text-sm mb-2 leading-snug">
                            {{ $t(`industries2.cards.${card.key}.title`) }}
                        </h3>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            {{ $t(`industries2.cards.${card.key}.body`) }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <NuxtLink :to="localePath('/use-cases')"
                    class="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all bg-white dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                    {{ $t('industries2.cta') }}
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
