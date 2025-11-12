<template>
  <div class="min-h-screen bg-black text-white flex items-center justify-center">
    <div class="text-center opacity-0 animate-fade-in">
      <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight">
        PROTEGEY
      </h1>
      <p class="typewriter text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light mt-2">
        {{ displayText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const messages = ['Launching Soon', 'Bientôt Disponible']
const displayText = ref('')
const isDeleting = ref(false)
const currentIndex = ref(0)
let timeoutId = 0

const typingDelay = 120
const deletingDelay = 60
const pauseDelay = 1200

const type = () => {
  const currentMessage = messages[currentIndex.value]

  if (!isDeleting.value) {
    displayText.value = currentMessage.slice(0, displayText.value.length + 1)

    if (displayText.value === currentMessage) {
      isDeleting.value = true
      timeoutId = window.setTimeout(type, pauseDelay)
      return
    }
  } else {
    displayText.value = currentMessage.slice(0, displayText.value.length - 1)

    if (displayText.value === '') {
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % messages.length
      timeoutId = window.setTimeout(type, typingDelay)
      return
    }
  }

  timeoutId = window.setTimeout(type, isDeleting.value ? deletingDelay : typingDelay)
}

onMounted(() => {
  timeoutId = window.setTimeout(type, typingDelay)
})

onBeforeUnmount(() => {
  window.clearTimeout(timeoutId)
})
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

