<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Building04Icon,
  SmartPhone01Icon,
  ZapIcon,
  Building01Icon
} from '@hugeicons/core-free-icons'

const { t } = useI18n()

const cards = [
  {
    key: 'banks',
    icon: Building04Icon,
    color: 'primary',
    features: ['transaction_monitoring', 'aml_sar', 'regulator_advisories', 'audit_logs', 'intel_sharing'],
  },
  {
    key: 'mmo',
    icon: SmartPhone01Icon,
    color: 'secondary',
    features: ['sim_swap', 'velocity', 'msisdn_resolver', 'entity_intel', 'case_mgmt'],
  },
  {
    key: 'fintech',
    icon: ZapIcon,
    color: 'amber',
    features: ['api_first', 'sandbox', 'signal_submission', 'webhooks', 'billing'],
  },
  {
    key: 'regulators',
    icon: Building01Icon,
    color: 'emerald',
    features: ['advisory_inbox', 'cross_institution', 'compliance_reporting', 'read_only'],
  },
]

const colorMap: Record<string, { border: string; text: string; bg: string; badge: string }> = {
  primary:   { border: 'border-primary-500/40',   text: 'text-primary-400',   bg: 'bg-primary-500/10',   badge: 'bg-primary-500/15 text-primary-300 border-primary-500/20' },
  secondary: { border: 'border-secondary-500/40', text: 'text-secondary-400', bg: 'bg-secondary-500/10', badge: 'bg-secondary-500/15 text-secondary-300 border-secondary-500/20' },
  amber:     { border: 'border-accent-orange-500/40',     text: 'text-accent-orange-400',     bg: 'bg-accent-orange-500/10',     badge: 'bg-accent-orange-500/15 text-accent-orange-400 border-accent-orange-500/20' },
  emerald:   { border: 'border-accent-cyan-500/40',   text: 'text-accent-cyan-400',   bg: 'bg-accent-cyan-500/10',   badge: 'bg-accent-cyan-500/15 text-accent-cyan-400 border-accent-cyan-500/20' },
}

const getColor = (color: string) => colorMap[color] ?? colorMap['primary']!
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div
      v-for="card in cards"
      :key="card.key"
      :class="[
        'group relative p-6 rounded-2xl border bg-white/90 dark:bg-neutral-900/50 backdrop-blur-sm',
        'hover:scale-[1.02] transition-all duration-300 hover:shadow-xl',
        getColor(card.color).border,
      ]"
    >
      <!-- Hover glow overlay -->
      <div :class="['absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500', getColor(card.color).bg]" />

      <div class="relative z-10">
        <!-- Icon + title -->
        <div class="flex items-center gap-4 mb-5">
          <div :class="['p-2.5 rounded-xl', getColor(card.color).bg]">
            <HugeiconsIcon :icon="card.icon" :size="24" :class="getColor(card.color).text" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-neutral-900 dark:text-white">{{ t(`who_its_for.cards.${card.key}.title`) }}</h3>
            <p :class="['text-sm font-medium', getColor(card.color).text]">{{ t(`who_its_for.cards.${card.key}.subtitle`) }}</p>
          </div>
        </div>

        <!-- Description -->
        <p class="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-5">
          {{ t(`who_its_for.cards.${card.key}.description`) }}
        </p>

        <!-- Feature badges -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="feat in card.features"
            :key="feat"
            :class="['text-xs px-3 py-1 rounded-full border font-medium', getColor(card.color).badge]"
          >
            {{ t(`who_its_for.features.${feat}`) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
