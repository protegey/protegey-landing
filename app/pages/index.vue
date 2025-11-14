<template>
  <div class="snap-y snap-mandatory h-screen overflow-y-scroll">
    <Hero :isDark="isDark" />
    <WhyProtegey :isDark="isDark" />
    <Solution :isDark="isDark" />
  </div>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'
import Hero from '~/components/sections/Hero.vue'
import WhyProtegey from '~/components/sections/WhyProtegey.vue'
import Solution from '~/components/sections/Solution.vue'

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

