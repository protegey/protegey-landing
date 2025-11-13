<template>
  <div class="bg-black text-white">
    <Hero />

  </div>
</template>

<script setup>

import Hero from '~/components/sections/Hero.vue'

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

