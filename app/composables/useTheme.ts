import { ref, computed, watch, readonly } from 'vue'

export type ThemeMode = 'light' | 'dark'

// Global theme state to prevent multiple instances
const theme = ref<ThemeMode>('light')

const applyThemeClass = (mode: ThemeMode) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', mode === 'dark')
}

const init = () => {
  if (typeof window === 'undefined') return
  try {
    const stored = window.localStorage.getItem('theme') as ThemeMode | null
    const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    const initial: ThemeMode = stored ?? (systemPrefersDark ? 'dark' : 'light')
    theme.value = initial
    applyThemeClass(initial)
  } catch {
    theme.value = 'light'
    applyThemeClass('light')
  }
}

const setTheme = (mode: ThemeMode) => {
  theme.value = mode
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', mode)
    }
  } catch {}
  applyThemeClass(mode)
}

// Watch for theme changes and apply immediately
watch(theme, (newTheme) => {
  applyThemeClass(newTheme)
}, { immediate: false })

// Initialize on first import
if (typeof window !== 'undefined') {
  init()
}

/**
 * Simple theme manager: persists to localStorage and toggles the `dark` class
 * on <html>. Uses global state to prevent multiple instances.
 */
export function useTheme() {
  const toggleTheme = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')
  const isDark = computed(() => theme.value === 'dark')

  return { theme: readonly(theme), isDark, setTheme, toggleTheme, init }
}
