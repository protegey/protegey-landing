<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import ThemeToggle from '~/components/sections/ThemeToggle.vue'
import { gsap } from 'gsap'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  ArrowDown01Icon,
  Activity01Icon,
  SmartPhone01Icon,
  Shield01Icon,
  UserStar01Icon,
  Share08Icon,
  FingerPrintIcon,
  BankIcon,
  Wallet02Icon,
  MoneySend01Icon,
  GlobalIcon,
  BitcoinCircleIcon,
  ShoppingBag01Icon,
  Building03Icon,
  Building01Icon,
  GameController01Icon,
  Location01Icon,
  BookOpen01Icon,
  LockKeyIcon,
  DocumentValidationIcon,
  InformationCircleIcon,
  UserGroupIcon,
  Briefcase02Icon
} from '@hugeicons/core-free-icons'

const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)
const isScrolled = ref(false)
const activeDropdown = ref(null)
const activeMobileSection = ref(null)
let dropdownTimeout = null

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    activeMobileSection.value = null
  }
}

const toggleMobileSection = (section) => {
  activeMobileSection.value = activeMobileSection.value === section ? null : section
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
    activeMobileSection.value = null
  }
  if (e.key === 'Tab' && isOpen.value) {
    const menu = document.querySelector('[role="dialog"]')
    if (!menu) return
    const focusable = menu.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

const openDropdown = (name) => {
  clearTimeout(dropdownTimeout)
  activeDropdown.value = name
}

const closeDropdown = () => {
  dropdownTimeout = setTimeout(() => {
    activeDropdown.value = null
  }, 150)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})

// GSAP Animations for Mobile Menu
watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      gsap.from('.mobile-nav-item', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.2
      })
      gsap.from('.mobile-nav-footer', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.5
      })
    })
  }
})

watch(activeMobileSection, (newSection) => {
  if (newSection) {
    nextTick(() => {
      const target = newSection === 'solutions' ? '.mobile-solution-item' : '.mobile-industry-item'
      gsap.from(target, {
        x: -10,
        opacity: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.out'
      })
    })
  }
})

const scrollTo = (selector) => {
  const el = document.getElementById(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const solutionItems = [
  { key: 'transaction-monitoring', icon: Activity01Icon, color: 'text-primary-400' },
  { key: 'account-protection', icon: SmartPhone01Icon, color: 'text-secondary-400' },
  { key: 'aml-compliance', icon: Shield01Icon, color: 'text-accent-cyan-400' },
  { key: 'risk-profiling', icon: UserStar01Icon, color: 'text-accent-orange-400' },
  { key: 'fraud-intelligence', icon: Share08Icon, color: 'text-primary-400' },
]

const resourceItems = [
  { key: 'what_is_protegey', to: 'what-is-protegey', icon: InformationCircleIcon },
  { key: 'how_it_works', to: 'how-it-works', icon: Activity01Icon },
  { key: 'who_its_for', to: 'who-its-for', icon: UserGroupIcon },
  { key: 'comparisons', to: 'comparisons', icon: DocumentValidationIcon },
  { key: 'trust', to: 'trust', icon: Shield01Icon },
  { key: 'api_docs', to: 'api-docs', icon: BookOpen01Icon },
]

const industryIcons = {
  banks: BankIcon, 
  lending: MoneySend01Icon,
  microfinance: Building01Icon,
  fintechs: Wallet02Icon, 
  mobile_money: SmartPhone01Icon,
  remittance: GlobalIcon,
  ecommerce: ShoppingBag01Icon, 
  gaming: GameController01Icon,
  crypto: BitcoinCircleIcon, 
  regulators: Building03Icon,
  mobility: Location01Icon
}

const INDUSTRY_ORDER = [
  'banks',
  'lending',
  'microfinance',
  'fintechs',
  'mobile_money',
  'remittance',
  'ecommerce',
  'gaming',
  'crypto',
  'regulators',
  'mobility'
]

const getIndustries = () => {
  const sectors = tm('industries.sectors') || {}
  return INDUSTRY_ORDER
    .filter(key => sectors[key])
    .map(key => ({
    key,
    title: rt(sectors[key].title),
    desc: rt(sectors[key].desc),
    icon: industryIcons[key] || BankIcon
  }))
}
</script>

<template>
  <header class="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out" :class="[
    isScrolled
      ? 'top-0 w-full bg-white/95 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800'
      : 'top-4 w-[95%] max-w-7xl bg-white/80 dark:bg-neutral-900/40 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/30 rounded-3xl shadow-2xl'
  ]">
    <div class="container mx-auto px-6 transition-all duration-500" :class="isScrolled ? 'h-16' : 'h-14'">
      <div class="flex items-center justify-between h-full">
        <!-- Logo -->
        <div class="flex items-center gap-4">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
            <img src="/images/logo-dark.svg" :alt="$t('footer.logo_alt')" class="h-8 w-auto max-w-none dark:hidden" />
            <img src="/images/logo-light.svg" :alt="$t('footer.logo_alt')" class="h-8 w-auto max-w-none hidden dark:block" />
            <!-- <span class="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Protegey</span> -->
          </NuxtLink>
        </div>

        <!-- Desktop Navigation Mega Menu -->
        <nav class="hidden md:flex items-center h-full gap-8" role="navigation" :aria-label="$t('a11y.main_navigation')">
          
          <!-- Solutions Dropdown -->
          <div class="relative h-full flex items-center" 
               @mouseenter="openDropdown('solutions')" @mouseleave="closeDropdown">
            <button class="flex items-center gap-1 text-sm font-medium transition-colors"
               :class="activeDropdown === 'solutions' ? 'text-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
               @click="activeDropdown = activeDropdown === 'solutions' ? null : 'solutions'"
               @focus="openDropdown('solutions')"
               @blur="closeDropdown()"
               aria-haspopup="true"
               :aria-expanded="activeDropdown === 'solutions'">
               {{ $t('nav.solutions') }}
               <HugeiconsIcon :icon="ArrowDown01Icon" :size="12" class="transition-transform duration-300" :class="{ 'rotate-180': activeDropdown === 'solutions' }" />
            </button>
            <transition name="dropdown">
              <div v-if="activeDropdown === 'solutions'" class="absolute top-[calc(100%-0.5rem)] left-1/2 -translate-x-1/2 w-[600px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-6 grid grid-cols-2 gap-x-6 gap-y-4">
                <NuxtLink v-for="mod in solutionItems" :key="mod.key" :to="localePath(`/solutions/${mod.key}`)" class="flex items-start gap-3 p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
                  <div class="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-white dark:group-hover:bg-neutral-700 transition-colors">
                    <HugeiconsIcon :icon="mod.icon" :size="20" :class="mod.color" />
                  </div>
                  <div>
                    <div class="text-sm font-bold text-neutral-900 dark:text-white mb-0.5">{{ $t(`solutions.modules.${mod.key}.title`) }}</div>
                    <div class="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-tight">{{ $t(`solutions.modules.${mod.key}.subtext`) }}</div>
                  </div>
                </NuxtLink>
                <NuxtLink :to="localePath('/solutions')" class="flex items-start gap-3 p-3 rounded-2xl bg-primary-500/5 hover:bg-primary-500/10 transition-colors group">
                  <div class="p-2 rounded-xl bg-primary-500/10 text-primary-500">
                    <HugeiconsIcon :icon="FingerPrintIcon" :size="20" />
                  </div>
                  <div>
                    <div class="text-sm font-bold text-primary-500 flex items-center gap-2">
                        {{ $t('solutions.panid_teaser.title') }}
                        <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary-500/20 text-primary-500 leading-none uppercase">{{ $t('solutions.coming_soon') }}</span>
                    </div>
                    <div class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-tight">Pan-African identity verification and eKYC natively built-in.</div>
                  </div>
                </NuxtLink>
              </div>
            </transition>
          </div>

          <!-- Industries Dropdown -->
          <div class="relative h-full flex items-center" 
               @mouseenter="openDropdown('industries')" @mouseleave="closeDropdown">
            <button class="flex items-center gap-1 text-sm font-medium transition-colors"
               :class="activeDropdown === 'industries' ? 'text-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
               @click="activeDropdown = activeDropdown === 'industries' ? null : 'industries'"
               @focus="openDropdown('industries')"
               @blur="closeDropdown()"
               aria-haspopup="true"
               :aria-expanded="activeDropdown === 'industries'">
               {{ $t('nav.industries') }}
               <HugeiconsIcon :icon="ArrowDown01Icon" :size="12" class="transition-transform duration-300" :class="{ 'rotate-180': activeDropdown === 'industries' }" />
            </button>
            <transition name="dropdown">
              <div v-if="activeDropdown === 'industries'" class="absolute -translate-x-12 top-[calc(100%-0.5rem)] w-[650px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-6 flex flex-col gap-4">
                <div class="grid grid-cols-2 gap-3">
                  <NuxtLink v-for="ind in getIndustries()" :key="ind.key" :to="localePath(`/use-cases/${ind.key}`)" class="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
                    <div class="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:text-primary-500 transition-colors">
                      <HugeiconsIcon :icon="ind.icon" :size="18" />
                    </div>
                    <div class="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-primary-400">{{ ind.title }}</div>
                  </NuxtLink>
                </div>
                <div class="pt-4 mt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <NuxtLink :to="localePath('/use-cases')" class="text-sm text-primary-500 font-bold hover:text-primary-400 flex items-center gap-1 w-fit mx-auto">
                        View all use cases &rarr;
                    </NuxtLink>
                </div>
              </div>
            </transition>
          </div>

          <!-- Resources Dropdown -->
          <div class="relative h-full flex items-center" 
               @mouseenter="openDropdown('resources')" @mouseleave="closeDropdown">
            <button class="flex items-center gap-1 text-sm font-medium transition-colors"
               :class="activeDropdown === 'resources' ? 'text-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
               @click="activeDropdown = activeDropdown === 'resources' ? null : 'resources'"
               @focus="openDropdown('resources')"
               @blur="closeDropdown()"
               aria-haspopup="true"
               :aria-expanded="activeDropdown === 'resources'">
               {{ $t('nav.resources') }}
               <HugeiconsIcon :icon="ArrowDown01Icon" :size="12" class="transition-transform duration-300" :class="{ 'rotate-180': activeDropdown === 'resources' }" />
            </button>
            <transition name="dropdown">
              <div v-if="activeDropdown === 'resources'" class="absolute left-1/2 -translate-x-1/2 top-[calc(100%-0.5rem)] w-[320px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-3 grid gap-1">
                <NuxtLink v-for="item in resourceItems" :key="item.key" :to="localePath(item.to)" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
                    <HugeiconsIcon :icon="item.icon" :size="18" class="text-neutral-400 group-hover:text-primary-500" />
                    <span class="text-sm font-medium text-neutral-800 dark:text-neutral-200">{{ $t(`footer.links.${item.key}`) }}</span>
                </NuxtLink>
              </div>
            </transition>
          </div>

          <!-- Company Dropdown -->
          <div class="relative h-full flex items-center" 
               @mouseenter="openDropdown('company')" @mouseleave="closeDropdown">
            <button class="flex items-center gap-1 text-sm font-medium transition-colors"
               :class="activeDropdown === 'company' ? 'text-primary-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
               @click="activeDropdown = activeDropdown === 'company' ? null : 'company'"
               @focus="openDropdown('company')"
               @blur="closeDropdown()"
               aria-haspopup="true"
               :aria-expanded="activeDropdown === 'company'">
               {{ $t('nav.company') }}
               <HugeiconsIcon :icon="ArrowDown01Icon" :size="12" class="transition-transform duration-300" :class="{ 'rotate-180': activeDropdown === 'company' }" />
            </button>
            <transition name="dropdown">
              <div v-if="activeDropdown === 'company'" class="absolute -translate-x-12 top-[calc(100%-0.5rem)] w-[240px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-3 flex flex-col gap-1">
                <NuxtLink :to="localePath('about')" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
                    <HugeiconsIcon :icon="InformationCircleIcon" :size="18" class="text-neutral-400 group-hover:text-primary-500" />
                    <span class="text-sm font-medium text-neutral-800 dark:text-neutral-200">{{ $t('footer.links.about') }}</span>
                </NuxtLink>
                <NuxtLink :to="localePath('contact')" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
                    <HugeiconsIcon :icon="UserGroupIcon" :size="18" class="text-neutral-400 group-hover:text-primary-500" />
                    <span class="text-sm font-medium text-neutral-800 dark:text-neutral-200">{{ $t('footer.links.contact') }}</span>
                </NuxtLink>
                <NuxtLink :to="localePath('careers')" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
                    <HugeiconsIcon :icon="Briefcase02Icon" :size="18" class="text-neutral-400 group-hover:text-primary-500" />
                    <span class="text-sm font-medium text-neutral-800 dark:text-neutral-200">{{ $t('footer.links.careers') }}</span>
                </NuxtLink>
              </div>
            </transition>
          </div>
        </nav>

        <!-- Desktop Controls -->
        <div class="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <div
            class="flex items-center bg-neutral-100/80 dark:bg-neutral-800/50 rounded-lg p-1 border border-neutral-200/50 dark:border-neutral-700/30">
            <template v-for="l in ['en', 'fr', 'ar']" :key="l">
              <NuxtLink :to="switchLocalePath(l)"
                class="px-2 py-1 rounded text-[10px] font-bold transition-all uppercase" :class="[
                  locale === l
                    ? 'bg-primary-500 text-neutral-950'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                ]">
                {{ l }}
              </NuxtLink>
            </template>
          </div>
          <NuxtLink :to="localePath('/demo')" :class="[
            'transition-all duration-300 font-bold text-sm',
            isScrolled
              ? 'bg-primary-500 text-neutral-950 px-5 py-2 rounded-lg hover:bg-primary-400'
              : 'bg-neutral-900/10 text-neutral-900 dark:text-white hover:bg-neutral-900/20 dark:bg-white/10 dark:hover:bg-white/20 px-5 py-2 rounded-2xl backdrop-blur-sm'
          ]">
            {{ $t('nav.request_demo') }}
          </NuxtLink>
        </div>

        <!-- Mobile Controls -->
        <div class="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button @click="toggleMenu" :aria-expanded="isOpen"
            class="relative z-[60] p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 overflow-hidden group">
            <div
              class="absolute inset-0 bg-primary-500 transform translate-y-full group-active:translate-y-0 transition-transform duration-300" />
            <svg v-if="!isOpen" class="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Premium Mobile Menu Overlay -->
    <Teleport to="body">
      <transition enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4">
        <div v-if="isOpen"
          class="fixed inset-0 z-[100] bg-white dark:bg-neutral-950 overflow-hidden flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('a11y.mobile_menu')">
          
          <!-- Header for Mobile Menu -->
          <div class="h-16 px-6 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 shrink-0">
            <div class="flex items-center gap-2">
              <img src="/images/logo-dark.svg" :alt="$t('footer.logo_alt')" class="w-7 h-7 object-contain dark:hidden" />
              <img src="/images/logo-light.svg" :alt="$t('footer.logo_alt')" class="w-7 h-7 object-contain hidden dark:block" />
              <span class="text-base font-bold text-neutral-900 dark:text-white tracking-tight">Protegey</span>
            </div>
            <button @click="toggleMenu" class="p-2 text-neutral-500 dark:text-neutral-400" :aria-label="$t('a11y.close_menu')">
              <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-6 py-8">
            <div class="flex flex-col gap-6">
              
              <!-- Accordion: Solutions -->
              <div class="flex flex-col mobile-nav-item">
                <button @click="toggleMobileSection('solutions')"
                  class="flex items-center justify-between py-2 text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] text-[10px] font-bold w-full">
                  <span>{{ $t('nav.solutions') }}</span>
                  <HugeiconsIcon :icon="ArrowDown01Icon" :size="14" class="transition-transform duration-300" :class="{ 'rotate-180': activeMobileSection === 'solutions' }" />
                </button>
                <div v-show="activeMobileSection === 'solutions'" class="mt-4 grid gap-4 pl-2">
                  <NuxtLink v-for="mod in solutionItems" :key="mod.key" :to="localePath(`/solutions/${mod.key}`)" @click="toggleMenu" class="flex items-start gap-4 p-2 rounded-xl group active:bg-neutral-100 dark:active:bg-neutral-900 mobile-solution-item">
                    <div class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                      <HugeiconsIcon :icon="mod.icon" :size="18" :class="mod.color" />
                    </div>
                    <div>
                      <div class="text-sm font-bold text-neutral-900 dark:text-white">{{ $t(`solutions.modules.${mod.key}.title`) }}</div>
                      <div class="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">{{ $t(`solutions.modules.${mod.key}.subtext`) }}</div>
                    </div>
                  </NuxtLink>
                </div>
              </div>

              <!-- Accordion: Industries -->
              <div class="flex flex-col mobile-nav-item">
                <button @click="toggleMobileSection('industries')"
                  class="flex items-center justify-between py-2 text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] text-[10px] font-bold w-full">
                  <span>{{ $t('nav.industries') }}</span>
                  <HugeiconsIcon :icon="ArrowDown01Icon" :size="14" class="transition-transform duration-300" :class="{ 'rotate-180': activeMobileSection === 'industries' }" />
                </button>
                <div v-show="activeMobileSection === 'industries'" class="mt-4 grid grid-cols-2 gap-2 pl-2">
                  <NuxtLink v-for="ind in getIndustries()" :key="ind.key" :to="localePath(`/use-cases/${ind.key}`)" @click="toggleMenu" class="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/50 mobile-industry-item">
                    <HugeiconsIcon :icon="ind.icon" :size="16" class="text-primary-500 shrink-0" />
                    <span class="text-xs font-bold text-neutral-900 dark:text-white leading-tight">{{ ind.title }}</span>
                  </NuxtLink>
                </div>
              </div>

              <!-- Static Links: Company -->
              <div class="flex flex-col mobile-nav-item">
                <div class="py-2 text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] text-[10px] font-bold">{{ $t('nav.company') }}</div>
                <div class="mt-2 grid gap-1">
                  <NuxtLink :to="localePath('about')" @click="toggleMenu" class="py-3 px-3 rounded-xl text-sm font-bold text-neutral-700 dark:text-neutral-300 active:bg-neutral-100 dark:active:bg-neutral-900 flex items-center gap-3">
                    <HugeiconsIcon :icon="InformationCircleIcon" :size="18" class="text-neutral-400" />
                    {{ $t('footer.links.about') }}
                  </NuxtLink>
                  <NuxtLink :to="localePath('contact')" @click="toggleMenu" class="py-3 px-3 rounded-xl text-sm font-bold text-neutral-700 dark:text-neutral-300 active:bg-neutral-100 dark:active:bg-neutral-900 flex items-center gap-3">
                    <HugeiconsIcon :icon="UserGroupIcon" :size="18" class="text-neutral-400" />
                    {{ $t('footer.links.contact') }}
                  </NuxtLink>
                  <NuxtLink :to="localePath('careers')" @click="toggleMenu" class="py-3 px-3 rounded-xl text-sm font-bold text-neutral-700 dark:text-neutral-300 active:bg-neutral-100 dark:active:bg-neutral-900 flex items-center gap-3">
                    <HugeiconsIcon :icon="Briefcase02Icon" :size="18" class="text-neutral-400" />
                    {{ $t('footer.links.careers') }}
                  </NuxtLink>
                </div>
              </div>

              <!-- Static Links: Resources -->
              <div class="flex flex-col mobile-nav-item">
                <div class="py-2 text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] text-[10px] font-bold">{{ $t('nav.resources') }}</div>
                <div class="mt-2 grid gap-1">
                  <NuxtLink v-for="item in resourceItems" :key="item.key" :to="localePath(item.to)" @click="toggleMenu" class="py-3 px-3 rounded-xl text-sm font-bold text-neutral-700 dark:text-neutral-300 active:bg-neutral-100 dark:active:bg-neutral-900 flex items-center gap-3">
                    <HugeiconsIcon :icon="item.icon" :size="18" class="text-neutral-400" />
                    {{ $t(`footer.links.${item.key}`) }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom: Language Switcher and CTA -->
          <div class="p-6 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/50 shrink-0 mobile-nav-footer">
            <div class="flex flex-col gap-6">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">Language / Langue / لغة</span>
                <div class="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 border border-neutral-200 dark:border-neutral-700/50">
                  <template v-for="l in ['en', 'fr', 'ar']" :key="l">
                    <NuxtLink :to="switchLocalePath(l)"
                      class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all" :class="[
                        locale === l
                          ? 'bg-primary-500 text-neutral-950'
                          : 'text-neutral-500 dark:text-neutral-400'
                      ]">
                      {{ l }}
                    </NuxtLink>
                  </template>
                </div>
              </div>
              <NuxtLink
                class="w-full bg-primary-500 text-neutral-950 px-6 py-4 rounded-2xl font-black text-center shadow-2xl shadow-primary-500/20 active:scale-[0.98] transition-transform"
                :to="localePath('/demo')" @click="toggleMenu">{{ $t('nav.request_demo') }}</NuxtLink>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<style scoped>
header {
  will-change: transform, width, top, border-radius;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
