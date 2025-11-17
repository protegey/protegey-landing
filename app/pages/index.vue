<template>
  <div class="relative min-h-screen">
    <!-- Continuous Background Animation -->
    <BackgroundGradientAnimation
      :gradient-background-start="isDark ? 'rgb(0, 0, 0)' : 'rgb(249, 250, 251)'"
      :gradient-background-end="isDark ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)'"
      first-color="163, 230, 53"
      second-color="168, 85, 247"
      third-color="96, 165, 250"
      fourth-color="163, 230, 53"
      fifth-color="168, 85, 247"
      pointer-color="163, 230, 53"
      size="80%"
      blending-value="hard-light"
      :interactive="true"
  container-class-name="fixed inset-0 pointer-events-none z-[-1]"
      class-name="relative z-0 h-full w-full overflow-hidden"
    />
    
    <!-- Content -->
    <div class="relative z-10">
      <Hero :isDark="isDark" />
      <WhyProtegey :isDark="isDark" />
      <Solution :isDark="isDark" />
      <Features :isDark="isDark" />
      <Target :isDark="isDark" />
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'
import BackgroundGradientAnimation from '~/components/ui/BackgroundGradientAnimation.vue'
import Hero from '~/components/sections/Hero.vue'
import WhyProtegey from '~/components/sections/WhyProtegey.vue'
import Solution from '~/components/sections/Solution.vue'
import Features from '~/components/sections/Features.vue'
import Target from '~/components/sections/Target.vue'

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

