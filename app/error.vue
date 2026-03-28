<script setup>
const props = defineProps({
  error: Object
})

const { t } = useI18n()
const localePath = useLocalePath()
const { isDark } = useTheme()

const handleError = () => clearError({ redirect: localePath('/') })

const is404 = computed(() => props.error?.statusCode === 404)
const statusCode = computed(() => props.error?.statusCode || 500)

const anomalyId = ref('')
onMounted(() => {
  anomalyId.value = Math.random().toString(36).substring(7).toUpperCase()
})

useHead(() => ({
  title: is404.value ? t('errors.title_404') : t('errors.title_500'),
  htmlAttrs: { class: isDark.value ? 'dark' : '' }
}))
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans" role="main">
    <!-- Grid Background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-neutral-50 dark:from-neutral-950 via-transparent to-transparent"></div>
    </div>

    <!-- Scanning Radar Animation -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
      <div class="scanner-line h-[1px] w-full bg-primary-500/50 absolute top-0 shadow-[0_0_15px_rgba(12,185,158,0.5)]"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-2xl w-full text-center space-y-8 animate-fade-in">
      <!-- Status Code with Glow -->
      <div class="relative inline-block">
        <h1 class="text-[7rem] sm:text-[10rem] md:text-[14rem] font-black text-neutral-900/5 dark:text-white/8 leading-none select-none tracking-tighter">
          {{ statusCode }}
        </h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary-500/10 blur-3xl animate-pulse"></div>
        </div>
      </div>

      <!-- Messages -->
      <div class="space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
          {{ is404 ? $t('errors.title_404') : $t('errors.title_500') }}
        </h2>
        <p class="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
          {{ is404 ? $t('errors.desc_404') : $t('errors.desc_500') }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          @click="handleError"
          class="w-full sm:w-auto px-8 py-4 bg-primary-500 hover:bg-primary-400 text-neutral-950 font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-primary-500/20 active:scale-95"
        >
          {{ $t('errors.back_to_home') }}
        </button>
        <NuxtLink
          :to="localePath('/contact')"
          class="w-full sm:w-auto px-8 py-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-700 dark:text-white font-semibold rounded-2xl border border-neutral-200 dark:border-white/10 transition-all duration-300 backdrop-blur-sm"
        >
          {{ $t('errors.contact_support') }}
        </NuxtLink>
      </div>

      <!-- System ID / Trace (Subtle) -->
      <p v-if="anomalyId" class="text-neutral-400 dark:text-neutral-600 text-xs font-mono pt-8">
        PROTEGEY_SEC_NODE_ANOMALY_ID: {{ anomalyId }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes scan {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.scanner-line {
  animation: scan 4s linear infinite;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}
</style>
