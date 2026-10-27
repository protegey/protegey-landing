<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useCountries } from '~/composables/useCountries'

const props = defineProps({
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    inputId: { type: String, default: 'country' },
})
const emit = defineEmits(['update:modelValue'])

const { countries } = useCountries()
const { t } = useI18n()

const isOpen = ref(false)
const query = ref('')
const root = ref(null)
const searchInput = ref(null)
const highlightedIndex = ref(0)

const selected = computed(() => countries.value.find((c) => c.name === props.modelValue) || null)

const filtered = computed(() => {
    if (!query.value.trim()) return countries.value
    const q = normalize(query.value)
    return countries.value.filter((c) => normalize(c.name).includes(q))
})

function normalize(str) {
    return str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

function open() {
    isOpen.value = true
    query.value = ''
    highlightedIndex.value = 0
    nextTick(() => searchInput.value?.focus())
}

function close() {
    isOpen.value = false
}

function toggle() {
    if (isOpen.value) close()
    else open()
}

function select(country) {
    emit('update:modelValue', country.name)
    close()
}

function onKeydown(e) {
    if (!isOpen.value) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault()
            open()
        }
        return
    }
    if (e.key === 'Escape') {
        e.preventDefault()
        close()
    } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        highlightedIndex.value = Math.min(highlightedIndex.value + 1, filtered.value.length - 1)
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
    } else if (e.key === 'Enter') {
        e.preventDefault()
        const country = filtered.value[highlightedIndex.value]
        if (country) select(country)
    }
}

function onClickOutside(e) {
    if (root.value && !root.value.contains(e.target)) close()
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<template>
    <div ref="root" class="relative">
        <button
            :id="inputId"
            type="button"
            class="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all bg-white/90 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-between gap-2 rtl:flex-row-reverse"
            @click="toggle"
            @keydown="onKeydown"
        >
            <span v-if="selected" class="flex items-center gap-2 min-w-0 rtl:flex-row-reverse">
                <span class="text-lg leading-none">{{ selected.flag }}</span>
                <span class="truncate">{{ selected.name }}</span>
            </span>
            <span v-else class="text-neutral-400 dark:text-neutral-500">{{ placeholder }}</span>
            <svg class="w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform" :class="{ 'rotate-180': isOpen }" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
        </button>

        <div v-if="isOpen"
            class="absolute z-30 mt-2 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl overflow-hidden">
            <div class="p-2 border-b border-neutral-100 dark:border-neutral-800">
                <input
                    ref="searchInput"
                    v-model="query"
                    type="text"
                    :placeholder="t('waitlist.form.country_search_placeholder')"
                    class="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white rtl:text-right"
                    @keydown="onKeydown"
                />
            </div>
            <ul class="max-h-56 overflow-y-auto py-1" role="listbox">
                <li v-for="(country, i) in filtered" :key="country.code"
                    role="option"
                    class="px-3 py-2 text-sm flex items-center gap-2.5 cursor-pointer rtl:flex-row-reverse"
                    :class="i === highlightedIndex ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'"
                    @mouseenter="highlightedIndex = i"
                    @click="select(country)"
                >
                    <span class="text-lg leading-none">{{ country.flag }}</span>
                    <span class="truncate">{{ country.name }}</span>
                </li>
                <li v-if="filtered.length === 0" class="px-3 py-4 text-sm text-center text-neutral-400">
                    {{ t('waitlist.form.country_no_results') }}
                </li>
            </ul>
        </div>
    </div>
</template>
