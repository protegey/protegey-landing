<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
    gsap.to('.sn-pulse', {
        scale: 1.6,
        opacity: 0,
        duration: 2.2,
        repeat: -1,
        stagger: 0.5,
        ease: 'power1.out',
        transformOrigin: 'center',
    })
})

const nodes = [
    { x: 80, y: 160, r: 5, c: 'muted' },
    { x: 160, y: 320, r: 6, c: 'muted' },
    { x: 240, y: 80, r: 7, c: 'primary' },
    { x: 240, y: 240, r: 5, c: 'muted' },
    { x: 320, y: 160, r: 9, c: 'primary' },
    { x: 400, y: 320, r: 5, c: 'muted' },
    { x: 480, y: 80, r: 6, c: 'secondary' },
    { x: 480, y: 240, r: 5, c: 'muted' },
    { x: 560, y: 160, r: 10, c: 'cyan' },
    { x: 640, y: 320, r: 5, c: 'muted' },
    { x: 720, y: 80, r: 6, c: 'muted' },
    { x: 720, y: 240, r: 6, c: 'orange' },
    { x: 800, y: 160, r: 7, c: 'secondary' },
    { x: 880, y: 320, r: 5, c: 'muted' },
    { x: 880, y: 80, r: 5, c: 'muted' },
]

const edges = [
    [0, 2], [0, 1], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6],
    [5, 7], [6, 8], [7, 8], [8, 9], [8, 10], [9, 11], [10, 12],
    [11, 12], [12, 13], [12, 14],
]

const colorVar = { muted: 'currentColor', primary: 'var(--sn-primary)', secondary: 'var(--sn-secondary)', cyan: 'var(--sn-cyan)', orange: 'var(--sn-orange)' }
</script>

<template>
    <svg viewBox="0 0 960 400" class="w-full h-full signal-network" role="img" :aria-label="$t('about_page.hero.image_alt')">
        <defs>
            <pattern id="sn-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1" opacity="0.06" />
            </pattern>
        </defs>
        <rect width="960" height="400" fill="url(#sn-grid)" />

        <g stroke="currentColor" stroke-width="1" opacity="0.18">
            <line v-for="(e, i) in edges" :key="`e-${i}`"
                :x1="nodes[e[0]].x" :y1="nodes[e[0]].y"
                :x2="nodes[e[1]].x" :y2="nodes[e[1]].y" />
        </g>

        <!-- Two "active" flowing signal paths -->
        <path d="M80,160 L240,80 L320,160 L480,80 L560,160" fill="none" :stroke="colorVar.primary" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.55" class="sn-flow" />
        <path d="M560,160 L720,240 L800,160 L880,320" fill="none" :stroke="colorVar.cyan" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.55" class="sn-flow-rev" />

        <g>
            <template v-for="(n, i) in nodes" :key="`n-${i}`">
                <circle v-if="n.c !== 'muted'" class="sn-pulse" :cx="n.x" :cy="n.y" :r="n.r" :fill="colorVar[n.c]" opacity="0.35" />
                <circle :cx="n.x" :cy="n.y" :r="n.r" :fill="n.c === 'muted' ? 'currentColor' : colorVar[n.c]" :opacity="n.c === 'muted' ? 0.25 : 1" />
            </template>
        </g>
    </svg>
</template>

<style scoped>
.signal-network {
    color: #0B1741;
    --sn-primary: #0CB99E;
    --sn-secondary: #1B59AE;
    --sn-cyan: #22D3EE;
    --sn-orange: #FF6B00;
}

:global(.dark) .signal-network {
    color: #ffffff;
}

@keyframes sn-dash {
    to { stroke-dashoffset: -100; }
}

.sn-flow {
    animation: sn-dash 4s linear infinite;
}

.sn-flow-rev {
    animation: sn-dash 4s linear infinite reverse;
}

@media (prefers-reduced-motion: reduce) {
    .sn-flow, .sn-flow-rev { animation: none; }
}
</style>
