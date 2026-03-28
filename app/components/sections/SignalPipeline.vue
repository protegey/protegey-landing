<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  FilterIcon,
  Shield01Icon,
  DatabaseIcon,
  LayersIcon,
  Activity01Icon,
  ChartIcon,
  Globe02Icon,
  AiNetworkIcon,
  LockComputerIcon,
  MessageAdd01Icon
} from '@hugeicons/core-free-icons'

const { t } = useI18n()

const steps = [
  { number: '01', icon: FilterIcon,          color: 'primary',   key: 'step1' },
  { number: '02', icon: Shield01Icon,         color: 'primary',   key: 'step2' },
  { number: '03', icon: Globe02Icon,          color: 'secondary', key: 'step3' },
  { number: '04', icon: Activity01Icon,       color: 'secondary', key: 'step4' },
  { number: '05', icon: LayersIcon,           color: 'amber',     key: 'step5' },
  { number: '06', icon: DatabaseIcon,         color: 'amber',     key: 'step6' },
  { number: '07', icon: AiNetworkIcon,        color: 'emerald',   key: 'step7' },
  { number: '08', icon: ChartIcon,            color: 'emerald',   key: 'step8' },
  { number: '09', icon: LockComputerIcon,     color: 'primary',   key: 'step9' },
  { number: '10', icon: MessageAdd01Icon,     color: 'primary',   key: 'step10' },
]

const colorMap: Record<string, { border: string; text: string; bg: string; glow: string }> = {
  primary:   { border: 'border-primary-500/40',   text: 'text-primary-400',   bg: 'bg-primary-500/10',   glow: 'shadow-primary-500/20' },
  secondary: { border: 'border-secondary-500/40', text: 'text-secondary-400', bg: 'bg-secondary-500/10', glow: 'shadow-secondary-500/20' },
  amber:     { border: 'border-accent-orange-500/40', text: 'text-accent-orange-400', bg: 'bg-accent-orange-500/10', glow: 'shadow-accent-orange-500/20' },
  emerald:   { border: 'border-accent-cyan-500/40',  text: 'text-accent-cyan-400',  bg: 'bg-accent-cyan-500/10',  glow: 'shadow-accent-cyan-500/20' },
}

const visible = ref(false)
let observer: IntersectionObserver | null = null

const getColor = (color: string) => colorMap[color] ?? colorMap['primary']!

onMounted(() => {
  const sectionEl = document.getElementById('signal-pipeline')
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  if (sectionEl) observer.observe(sectionEl)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section id="signal-pipeline" class="relative py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
    <!-- Background grid -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/3 to-transparent pointer-events-none" />

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-mono tracking-wide mb-4">
          <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          {{ t('signal_pipeline.badge') }}
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          {{ t('signal_pipeline.title') }}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
            {{ t('signal_pipeline.title_highlight') }}
          </span>
        </h2>
        <p class="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
          {{ t('signal_pipeline.subtitle') }}
        </p>
      </div>

      <!-- API entry point label -->
      <div class="flex justify-center mb-8">
        <div class="flex items-center gap-3 px-5 py-2 rounded-full border border-primary-500/40 bg-primary-500/10 font-mono text-sm text-primary-300">
          <span class="w-2 h-2 rounded-full bg-primary-400 animate-ping" />
          POST /api/v1/signals
        </div>
      </div>

      <!-- Steps grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        <div
          v-for="(step, idx) in steps"
          :key="step.key"
          class="relative group"
          :style="{ transitionDelay: `${idx * 60}ms` }"
          :class="[
            'transition-all duration-700',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          ]"
        >
          <!-- Connector arrow (desktop) -->
          <div
            v-if="idx % 5 !== 4"
            class="hidden lg:block absolute top-8 -right-3 z-20 text-neutral-400 dark:text-neutral-400"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <div
            :class="[
              'h-full p-5 rounded-2xl border bg-white dark:bg-neutral-900/60 backdrop-blur-sm transition-all duration-300',
              'hover:scale-[1.03] hover:shadow-lg cursor-default',
              getColor(step.color).border,
              getColor(step.color).glow
            ]"
          >
            <!-- Step number + icon row -->
            <div class="flex items-center gap-3 mb-3">
              <span class="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500">{{ step.number }}</span>
              <div :class="['p-2 rounded-lg', getColor(step.color).bg]">
                <HugeiconsIcon
                  :icon="step.icon"
                  :size="18"
                  :class="getColor(step.color).text"
                />
              </div>
            </div>
            <!-- Title -->
            <h3 :class="['text-sm font-bold mb-1', getColor(step.color).text]">
              {{ t(`signal_pipeline.${step.key}.title`) }}
            </h3>
            <!-- Description -->
            <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {{ t(`signal_pipeline.${step.key}.desc`) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Output label -->
      <div class="flex justify-center mt-8">
        <div class="flex items-center gap-3 px-5 py-2 rounded-full border border-primary-500/40 bg-primary-500/10 font-mono text-sm text-primary-300">
          <span class="w-2 h-2 rounded-full bg-primary-400" />
          {{ t('signal_pipeline.output_label') }}
        </div>
      </div>
    </div>
  </section>
</template>
