<script setup lang="ts">
import { usePartnerApiCatalog } from '~/composables/usePartnerApiCatalog'
// Allowed / possible values of a field, each with its meaning.
import CatalogText from './CatalogText.vue'

defineProps<{ values: Array<{ value: unknown; description?: any }> }>()
const { L } = usePartnerApiCatalog()
</script>

<template>
    <ul class="flex flex-col gap-1">
        <li v-for="v in values" :key="String(v.value)" class="text-xs leading-snug">
            <code dir="ltr" class="rounded bg-primary-500/10 px-1 py-px font-mono text-[11px] font-semibold text-primary-600 dark:text-primary-300">{{ v.value === null ? 'null' : v.value }}</code>
            <span v-if="v.description" class="text-neutral-500 dark:text-neutral-400"> — <CatalogText :text="L(v.description)" /></span>
        </li>
    </ul>
</template>
