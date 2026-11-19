<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  copyable: { type: Boolean, default: true },
})

const { t } = useI18n()
const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch {
    // Clipboard blocked (insecure context / permissions) — the code stays selectable by hand.
  }
}

// Comments, string literals, and .methodCalls( get a touch of color; everything else stays plain
// on a solid black background, always dark regardless of the page's own theme — matches a single
// alternation so a string's own contents never get re-matched by the method-call pattern.
const TOKEN_RE = /(\/\/[^\n]*|#[^\n]*)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|(\.[a-zA-Z_$][\w$]*(?=\())/g

const highlighted = computed(() => {
  const code = props.code
  let lastIndex = 0
  let html = ''
  const re = new RegExp(TOKEN_RE)
  let match
  const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  while ((match = re.exec(code)) !== null) {
    if (match.index > lastIndex) html += escape(code.slice(lastIndex, match.index))
    const [full, comment, str, method] = match
    if (comment) html += `<span class="text-neutral-500">${escape(comment)}</span>`
    else if (str) html += `<span class="text-emerald-400">${escape(str)}</span>`
    else if (method) html += `<span class="text-sky-400">${escape(method)}</span>`
    lastIndex = match.index + full.length
  }
  if (lastIndex < code.length) html += escape(code.slice(lastIndex))
  return html
})
</script>

<template>
  <div class="relative group" dir="ltr">
    <pre :class="copyable ? 'pt-10' : ''" class="overflow-x-auto rounded-xl bg-neutral-950 border border-white/10 p-4 text-[12px] leading-relaxed text-neutral-200 font-mono"><code v-html="highlighted" /></pre>
    <button v-if="copyable" type="button" @click="copy"
      class="absolute top-2 right-2 rounded-md border border-white/10 bg-neutral-900/90 px-2 py-1 text-[10px] font-semibold text-neutral-300 opacity-80 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400">
      <span aria-live="polite">{{ copied ? t('api_docs.catalog.copied') : t('api_docs.catalog.copy') }}</span>
    </button>
  </div>
</template>
