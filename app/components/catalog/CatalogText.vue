<script setup lang="ts">
// Renders catalog prose: `backticked` spans become <code>; no HTML is ever interpreted.
import { computed } from 'vue'

const props = defineProps<{ text?: string | null }>()

const parts = computed(() =>
    (props.text ?? '').split('`').map((value, i) => ({ value, code: i % 2 === 1 })),
)
</script>

<template>
    <span><template v-for="(p, i) in parts" :key="i"><code v-if="p.code" dir="ltr"
        class="rounded bg-neutral-100 dark:bg-neutral-800 px-1 py-px font-mono text-[0.92em] text-neutral-800 dark:text-neutral-200">{{ p.value }}</code><template v-else>{{ p.value }}</template></template></span>
</template>
