<script setup>
import { ref, reactive, onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { PlayCircle02Icon, Key02Icon } from '@hugeicons/core-free-icons'

const props = defineProps({
  method: { type: String, required: true },
  path: { type: String, required: true },
  fields: { type: Array, default: () => [] },
})

const { t } = useI18n()
const API_KEY_STORAGE_KEY = 'protegey_console_api_key'
const BACKEND_URL = 'https://api.protegey.com'

const apiKey = ref('')
const values = reactive(Object.fromEntries(props.fields.map((f) => [f.name, f.defaultValue !== undefined ? String(f.defaultValue) : ''])))
const sending = ref(false)
const response = ref(null)

onMounted(() => {
  try {
    const stored = window.localStorage.getItem(API_KEY_STORAGE_KEY)
    if (stored) apiKey.value = stored
  } catch {
    // Private browsing / storage blocked — the key just won't persist across reloads.
  }
})

function updateApiKey(next) {
  apiKey.value = next
  try {
    window.localStorage.setItem(API_KEY_STORAGE_KEY, next)
  } catch {
    // Same as above — not persisting is fine, sending still works this session.
  }
}

function buildBody() {
  const body = {}
  for (const field of props.fields) {
    const raw = values[field.name]
    if (raw === '' || raw === undefined) continue
    if (field.type === 'number') body[field.name] = Number(raw)
    else if (field.type === 'boolean') body[field.name] = raw === 'true'
    else body[field.name] = raw
  }
  return body
}

async function handleSend() {
  sending.value = true
  response.value = null
  try {
    const res = await fetch(`${BACKEND_URL}${props.path}`, {
      method: props.method,
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey.value },
      body: props.method === 'GET' ? undefined : JSON.stringify(buildBody()),
    })
    const text = await res.text()
    let pretty = text
    try {
      pretty = JSON.stringify(JSON.parse(text), null, 2)
    } catch {
      // Not JSON — show as-is.
    }
    response.value = { status: res.status, ok: res.ok, body: pretty }
  } catch (error) {
    response.value = { status: null, ok: false, body: `${t('api_docs.console_network_error')}\n${error.message}` }
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-4">
    <div class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
      <HugeiconsIcon :icon="PlayCircle02Icon" :size="14" />
      {{ t('api_docs.console_title') }}
    </div>

    <label class="flex flex-col gap-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
      <span class="flex items-center gap-1.5">
        <HugeiconsIcon :icon="Key02Icon" :size="14" class="text-neutral-400" />
        {{ t('api_docs.console_api_key_label') }}
      </span>
      <input
        type="password"
        :value="apiKey"
        @input="updateApiKey($event.target.value)"
        :placeholder="t('api_docs.console_api_key_placeholder')"
        class="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm font-normal text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/50"
      />
    </label>

    <div class="grid gap-2 sm:grid-cols-2">
      <label v-for="field in fields" :key="field.name" class="flex flex-col gap-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
        <span>{{ field.label }}<span v-if="field.required" class="text-red-500"> *</span></span>
        <select
          v-if="field.type === 'select'"
          v-model="values[field.name]"
          class="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm font-normal text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/50"
        >
          <option v-for="opt in field.options ?? []" :key="opt" :value="opt">{{ opt }}</option>
        </select>
        <select
          v-else-if="field.type === 'boolean'"
          v-model="values[field.name]"
          class="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm font-normal text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/50"
        >
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
        <input
          v-else
          :type="field.type === 'number' ? 'number' : 'text'"
          v-model="values[field.name]"
          :placeholder="field.placeholder"
          class="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm font-normal text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/50"
        />
      </label>
    </div>

    <button
      type="button"
      :disabled="sending || !apiKey"
      @click="handleSend"
      class="flex w-fit items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-bold text-neutral-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <HugeiconsIcon :icon="PlayCircle02Icon" :size="16" />
      {{ t('api_docs.console_send_button') }} {{ method }} {{ path }}
    </button>
    <p v-if="!apiKey" class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.console_no_key_hint') }}</p>

    <div v-if="response" class="flex flex-col gap-1.5">
      <p class="text-xs font-bold" :class="response.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'">
        {{ response.status !== null ? `HTTP ${response.status}` : t('api_docs.console_network_error') }}
      </p>
      <pre class="max-h-64 overflow-auto rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-3 text-xs text-neutral-800 dark:text-neutral-200">{{ response.body }}</pre>
    </div>
  </div>
</template>
