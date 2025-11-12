<template>
  <div class="min-h-screen bg-black text-white flex items-center justify-center">
    <div class="text-center opacity-0 animate-fade-in">
      <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight">
        PROTEGEY
      </h1>
      <p class="text-lg md:text-xl lg:text-3xl text-gray-300 font-light mt-2">
        Bientôt Disponible
      </p>
      <p class="text-xl md:text-2xl lg:text-2xl text-gray-400 font-light mt-2">
        Launching Soon
      </p>
    </div>
  </div>
</template>

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
</style>

