<script setup>
defineProps({
    flip: { type: Boolean, default: false },
})
</script>

<template>
    <svg class="absolute left-0 w-full h-20 sm:h-28 z-[15] pointer-events-none"
        :class="flip ? 'top-0 -translate-y-full' : 'bottom-0'"
        viewBox="0 0 1440 56" :preserveAspectRatio="flip ? 'none' : 'none'" aria-hidden="true">
        <template v-if="!flip">
            <path d="M0,28 C60,6 180,50 240,28 C300,6 420,50 480,28 C540,6 660,50 720,28 C780,6 900,50 960,28 C1020,6 1140,50 1200,28 C1260,6 1380,50 1440,28 L1440,56 L0,56 Z" fill="#FF6B00" opacity="0.55" />
            <path d="M0,34 C60,14 180,54 240,34 C300,14 420,54 480,34 C540,14 660,54 720,34 C780,14 900,54 960,34 C1020,14 1140,54 1200,34 C1260,14 1380,54 1440,34 L1440,56 L0,56 Z" fill="#0B1741" class="dark:fill-neutral-950" />
        </template>
        <template v-else>
            <path d="M0,28 C60,50 180,6 240,28 C300,50 420,6 480,28 C540,50 660,6 720,28 C780,50 900,6 960,28 C1020,50 1140,6 1200,28 C1260,50 1380,6 1440,28 L1440,0 L0,0 Z" fill="#FF6B00" opacity="0.55" />
            <path d="M0,22 C60,42 180,2 240,22 C300,42 420,2 480,22 C540,42 660,2 720,22 C780,42 900,2 960,22 C1020,42 1140,2 1200,22 C1260,42 1380,2 1440,22 L1440,0 L0,0 Z" fill="#0B1741" class="dark:fill-neutral-950" />
        </template>
    </svg>
</template>
