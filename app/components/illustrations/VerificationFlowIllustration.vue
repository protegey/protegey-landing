<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
    gsap.fromTo('.vf-scan-line', { y: 18 }, {
        y: 168,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
    })
    gsap.to('.vf-check', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 1.2,
        repeat: -1,
        repeatDelay: 3.3,
        ease: 'back.out(2)',
    })
})
</script>

<template>
    <svg viewBox="0 0 360 240" class="w-full h-full verification-flow" role="img" :aria-label="$t('kyc_spotlight.illustration_alt')">
        <defs>
            <pattern id="vf-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.05" />
            </pattern>
        </defs>
        <rect width="360" height="240" fill="url(#vf-grid)" />

        <!-- ID card -->
        <rect x="60" y="16" width="160" height="188" rx="12" fill="none" stroke="currentColor" opacity="0.3" stroke-width="1.5" />
        <circle cx="100" cy="64" r="18" fill="none" stroke="var(--vf-primary)" stroke-width="1.5" opacity="0.7" />
        <rect x="80" y="92" width="100" height="6" rx="3" fill="currentColor" opacity="0.18" />
        <rect x="80" y="106" width="70" height="6" rx="3" fill="currentColor" opacity="0.12" />

        <rect x="80" y="132" width="100" height="5" rx="2.5" fill="currentColor" opacity="0.1" />
        <rect x="80" y="144" width="100" height="5" rx="2.5" fill="currentColor" opacity="0.1" />
        <rect x="80" y="156" width="60" height="5" rx="2.5" fill="currentColor" opacity="0.1" />

        <!-- scan line -->
        <line class="vf-scan-line" x1="68" y1="18" x2="212" y2="18" stroke="var(--vf-cyan)" stroke-width="2" opacity="0.8" />

        <!-- checkmark badge -->
        <g class="vf-check" style="transform-origin: 232px 150px; opacity: 0; transform: scale(0.4);">
            <circle cx="232" cy="150" r="26" fill="var(--vf-primary)" />
            <path d="M221,150 L229,158 L245,140" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>

        <!-- secondary nodes: business / AML -->
        <g opacity="0.85">
            <circle cx="276" cy="48" r="7" fill="var(--vf-secondary)" />
            <rect x="256" y="64" width="40" height="4.5" rx="2.25" fill="currentColor" opacity="0.15" />
            <rect x="256" y="74" width="28" height="4.5" rx="2.25" fill="currentColor" opacity="0.1" />
        </g>
        <g opacity="0.85">
            <circle cx="300" cy="190" r="7" fill="var(--vf-orange)" />
            <rect x="280" y="128" width="4.5" height="46" rx="2.25" fill="currentColor" opacity="0.08" />
        </g>
        <line x1="232" y1="150" x2="276" y2="55" stroke="currentColor" stroke-width="1" opacity="0.15" />
        <line x1="232" y1="150" x2="300" y2="183" stroke="currentColor" stroke-width="1" opacity="0.15" />
    </svg>
</template>

<style scoped>
.verification-flow {
    color: #0B1741;
    --vf-primary: #0CB99E;
    --vf-secondary: #1B59AE;
    --vf-cyan: #22D3EE;
    --vf-orange: #FF6B00;
}

:global(.dark) .verification-flow {
    color: #ffffff;
}
</style>
