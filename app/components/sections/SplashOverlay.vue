<template>
  <div class="splash-overlay" :class="{ 'splash-visible': visible, 'splash-exiting': exiting }">
    <div class="splash-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.14 15.15" class="w-full h-full">
        <g>
          <path fill="#0CB99E" d="M0.22 6.15c0.43,-0.16 0.83,-0.32 1.39,-0.5 3.77,-1.17 8.18,-1.16 11.95,0 0.47,0.15 0.9,0.32 1.32,0.47 -0.11,0.56 -0.24,1.11 -0.41,1.65 -0.31,-0.11 -0.66,-0.24 -0.93,-0.32 -1.3,-0.4 -2.7,-0.67 -4.12,-0.8 0.06,0.18 0.09,0.38 0.09,0.58 0,0.94 -0.68,1.72 -1.57,1.89 2.23,-0.03 4.46,-0.41 6.43,-1.14 0.01,0 0.03,-0.01 0.05,-0.02 -1.11,3.5 -3.45,6.44 -6.9,7.19 -3.58,-0.84 -5.86,-3.77 -6.89,-7.23 0.06,0.02 0.11,0.04 0.15,0.05 0.27,0.1 0.54,0.19 0.82,0.28 0.56,0.18 1.18,0.33 1.79,0.46 1.23,0.25 2.51,0.39 3.8,0.41 -0.88,-0.17 -1.55,-0.96 -1.55,-1.89 0,-0.2 0.03,-0.39 0.08,-0.57 -1.42,0.12 -2.81,0.4 -4.12,0.8 -0.29,0.09 -0.67,0.23 -1,0.35 -0.16,-0.54 -0.28,-1.1 -0.38,-1.66zm-0.1 -0.73c0.34,-0.12 1.02,-0.39 1.48,-0.53 1.88,-0.57 3.94,-0.89 5.99,-0.89 2.02,0 4.09,0.31 5.95,0.88 0.44,0.14 1.09,0.39 1.45,0.52 0.08,-0.54 0.12,-1.07 0.14,-1.61 -0.5,-0.17 -1.01,-0.39 -1.57,-0.56 -3.77,-1.16 -8.18,-1.17 -11.95,0 -0.66,0.2 -1.09,0.4 -1.61,0.57 0.01,0.54 0.05,1.08 0.12,1.62zm-0.12 -2.32c0.28,-0.08 1.08,-0.4 1.6,-0.57 1.88,-0.57 3.94,-0.88 5.99,-0.88 2.02,0 4.09,0.31 5.95,0.88 0.52,0.15 1.31,0.47 1.6,0.56 0,-0.57 -0.03,-1.13 -0.1,-1.69 -0.47,-0.17 -0.95,-0.36 -1.48,-0.53 -3.77,-1.16 -8.18,-1.16 -11.95,0 -0.6,0.19 -1.02,0.37 -1.48,0.53 -0.07,0.56 -0.12,1.13 -0.13,1.7z"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
const visible = ref(false)
const exiting = ref(false)

onMounted(() => {
  visible.value = true

  setTimeout(() => {
    exiting.value = true
  }, 2200)

  setTimeout(() => {
    visible.value = false
  }, 2700)
})
</script>

<style scoped>
.splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #060D1C;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.65, 0, 0.35, 1);
}

.splash-visible {
  opacity: 1;
}

.splash-exiting {
  opacity: 0;
}

.splash-icon {
  width: clamp(48px, 15vw, 120px);
  height: clamp(48px, 15vw, 120px);
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.splash-visible .splash-icon {
  opacity: 1;
  transform: scale(1);
}
</style>
