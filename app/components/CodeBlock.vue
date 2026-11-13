<script setup>
import { computed } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
})

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
  <pre class="overflow-x-auto rounded-xl bg-neutral-950 border border-white/10 p-4 text-[12px] leading-relaxed text-neutral-200 font-mono"><code v-html="highlighted" /></pre>
</template>
