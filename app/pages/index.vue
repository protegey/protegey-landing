<template>
  <div class="relative min-h-screen bg-neutral-950">
    <!-- Content -->
    <div class="relative">
      <Hero />
      <WhyProtegey :isDark="isDark" />
      <TrustedBy />
      <!-- <NetworkMap /> -->
      <!-- <Solution :isDark="isDark" />
      <Features :isDark="isDark" /> -->
      <!-- <Target :isDark="isDark" /> -->
      <WaitlistDemo />
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'
import Hero from '~/components/sections/Hero.vue'
import WhyProtegey from '~/components/sections/WhyProtegey.vue'
import TrustedBy from '~/components/sections/TrustedBy.vue'
// import NetworkMap from '~/components/sections/NetworkMap.vue'
// import Solution from '~/components/sections/Solution.vue'
// import Features from '~/components/sections/Features.vue'
// import Target from '~/components/sections/Target.vue'
import WaitlistDemo from '~/components/sections/WaitlistDemo.vue'

const { isDark } = useTheme()
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.typewriter::after {
  content: '|';
  margin-left: 0.25rem;
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>
