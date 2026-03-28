export type ThemeMode = 'light' | 'dark'

/**
 * SSR-compatible theme manager.
 * Persists preference in a cookie so the server can render the correct theme
 * on first load, eliminating hydration mismatches and flash of wrong theme.
 *
 * Usage: const { isDark, toggleTheme } = useTheme()
 */
export function useTheme() {
  const themeCookie = useCookie<ThemeMode>('theme', {
    default: () => 'dark',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })

  const isDark = computed(() => themeCookie.value === 'dark')

  const setTheme = (mode: ThemeMode) => {
    themeCookie.value = mode
    // Apply class immediately on client so the toggle feels instant
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', mode === 'dark')
    }
  }

  const toggleTheme = () => {
    setTheme(themeCookie.value === 'dark' ? 'light' : 'dark')
  }

  return { theme: themeCookie, isDark, setTheme, toggleTheme }
}
