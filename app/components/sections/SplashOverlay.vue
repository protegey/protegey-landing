<template>
  <div v-if="visible" class="splash" :class="{ 'splash--dark': isDark }" aria-hidden="true">
    <div class="splash__scan" />

    <div class="splash__body">
      <div class="splash__logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.14 15.15" fill="none">
          <path fill="#0CB99E" d="M0.22 6.15c0.43,-0.16 0.83,-0.32 1.39,-0.5 3.77,-1.17 8.18,-1.16 11.95,0 0.47,0.15 0.9,0.32 1.32,0.47 -0.11,0.56 -0.24,1.11 -0.41,1.65 -0.31,-0.11 -0.66,-0.24 -0.93,-0.32 -1.3,-0.4 -2.7,-0.67 -4.12,-0.8 0.06,0.18 0.09,0.38 0.09,0.58 0,0.94 -0.68,1.72 -1.57,1.89 2.23,-0.03 4.46,-0.41 6.43,-1.14 0.01,0 0.03,-0.01 0.05,-0.02 -1.11,3.5 -3.45,6.44 -6.9,7.19 -3.58,-0.84 -5.86,-3.77 -6.89,-7.23 0.06,0.02 0.11,0.04 0.15,0.05 0.27,0.1 0.54,0.19 0.82,0.28 0.56,0.18 1.18,0.33 1.79,0.46 1.23,0.25 2.51,0.39 3.8,0.41 -0.88,-0.17 -1.55,-0.96 -1.55,-1.89 0,-0.2 0.03,-0.39 0.08,-0.57 -1.42,0.12 -2.81,0.4 -4.12,0.8 -0.29,0.09 -0.67,0.23 -1,0.35 -0.16,-0.54 -0.28,-1.1 -0.38,-1.66zm-0.1 -0.73c0.34,-0.12 1.02,-0.39 1.48,-0.53 1.88,-0.57 3.94,-0.89 5.99,-0.89 2.02,0 4.09,0.31 5.95,0.88 0.44,0.14 1.09,0.39 1.45,0.52 0.08,-0.54 0.12,-1.07 0.14,-1.61 -0.5,-0.17 -1.01,-0.39 -1.57,-0.56 -3.77,-1.16 -8.18,-1.17 -11.95,0 -0.66,0.2 -1.09,0.4 -1.61,0.57 0.01,0.54 0.05,1.08 0.12,1.62zm-0.12 -2.32c0.28,-0.08 1.08,-0.4 1.6,-0.57 1.88,-0.57 3.94,-0.88 5.99,-0.88 2.02,0 4.09,0.31 5.95,0.88 0.52,0.15 1.31,0.47 1.6,0.56 0,-0.57 -0.03,-1.13 -0.1,-1.69 -0.47,-0.17 -0.95,-0.36 -1.48,-0.53 -3.77,-1.16 -8.18,-1.16 -11.95,0 -0.6,0.19 -1.02,0.37 -1.48,0.53 -0.07,0.56 -0.12,1.13 -0.13,1.7z"/>
        </svg>
      </div>
      <div class="splash__wordmark">PROTEGEY</div>
      <div class="splash__tagline">{{ t('seo.global.og_tagline') }}</div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const { isDark } = useTheme()

// ref(true) → SSR renders the overlay immediately, covering the page from the
// first byte. No route detection needed: this component is only used in index.vue.
const visible = ref(true)

onMounted(() => {
  // CSS animation drives the visual exit. JS only removes the DOM node
  // after the animation finishes so it stops consuming pointer events.
  setTimeout(() => {
    visible.value = false
  }, 2800)
})
</script>

<style scoped>
/* ─── Theme tokens ────────────────────────────────────────────── */
/* Light mode defaults */
.splash {
  --splash-bg:          #F1F4F8;   /* neutral-50  */
  --splash-wordmark:    #0B1741;   /* neutral-900 */
  --splash-tagline:     #0CB99E;   /* primary-500 */
  --scan-edge:    rgba(12, 185, 158, 0.35);
  --scan-peak:    rgba(12, 185, 158, 0.65);
}

/* Dark mode — applied via isDark from useTheme(), same cookie source as the rest of the site */
.splash--dark {
  --splash-bg:       #060D1C;   /* neutral-950 */
  --splash-wordmark: #ffffff;
  --splash-tagline:  #2DD4B6;   /* primary-400 */
  --scan-edge: rgba(12, 185, 158, 0.45);
  --scan-peak: rgba(12, 185, 158, 0.90);
}

/* ─── Overlay ─────────────────────────────────────────────────── */
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--splash-bg);
  /* Exit fully CSS-driven — fires whether or not JS has run */
  animation: splash-exit 0.6s cubic-bezier(0.65, 0, 0.35, 1) 2.1s forwards;
}

@keyframes splash-exit {
  to { opacity: 0; }
}

/* ─── Scan line ───────────────────────────────────────────────── */
.splash__scan {
  position: absolute;
  inset-inline: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--scan-edge) 25%,
    var(--scan-peak) 50%,
    var(--scan-edge) 75%,
    transparent
  );
  animation: scan 1.4s cubic-bezier(0.4, 0, 0.6, 1) 0.3s 1 forwards;
  opacity: 0;
}

@keyframes scan {
  0%   { top: 15%; opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { top: 85%; opacity: 0; }
}

/* ─── Content ─────────────────────────────────────────────────── */
.splash__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

/* ─── Logo ────────────────────────────────────────────────────── */
.splash__logo {
  width: clamp(52px, 12vw, 88px);
  height: clamp(52px, 12vw, 88px);
  animation: logo-enter 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.splash__logo svg {
  width: 100%;
  height: 100%;
}

@keyframes logo-enter {
  from { opacity: 0; transform: scale(0.55) translateY(6px); }
  to   { opacity: 1; transform: scale(1)    translateY(0);   }
}

/* ─── Wordmark ────────────────────────────────────────────────── */
.splash__wordmark {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: clamp(18px, 4vw, 26px);
  font-weight: 600;
  letter-spacing: 0.22em;
  color: var(--splash-wordmark);
  animation: text-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
}

/* ─── Tagline ─────────────────────────────────────────────────── */
.splash__tagline {
  font-family: 'IBM Plex Sans', monospace;
  font-size: clamp(9px, 1.5vw, 11px);
  font-weight: 500;
  letter-spacing: 0.18em;
  color: var(--splash-tagline);
  text-transform: uppercase;
  animation: text-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
}

@keyframes text-enter {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0);    }
}
</style>
