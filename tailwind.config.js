import { theme } from './theme.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        // Headings: IBM Plex Sans (Latin), IBM Plex Sans Arabic (Arabic script)
        // Body/UI: Inter
        sans:      ['"IBM Plex Sans"', '"IBM Plex Sans Arabic"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display:   ['"IBM Plex Sans"', '"IBM Plex Sans Arabic"', 'ui-sans-serif', 'sans-serif'],
        body:      ['"Inter"', '"IBM Plex Sans Arabic"', 'ui-sans-serif', 'sans-serif'],
      },
      animation: {
        first:        "moveVertical 30s ease infinite",
        second:       "moveInCircle 20s reverse infinite",
        third:        "moveInCircle 40s linear infinite",
        fourth:       "moveHorizontal 40s ease infinite",
        fifth:        "moveInCircle 20s ease infinite",
        'scan':       'scan 4s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%':   { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        // Security Emerald: rgb(12, 185, 158)
        'pulse-glow': {
          '0%, 100%': { opacity: 1,  boxShadow: '0 0 20px rgba(12, 185, 158, 0.5)' },
          '50%':      { opacity: .5, boxShadow: '0 0 10px rgba(12, 185, 158, 0.2)' },
        },
        moveHorizontal: {
          "0%":   { transform: "translateX(-50%) translateY(-10%)" },
          "50%":  { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%":   { transform: "rotate(0deg)" },
          "50%":  { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%":   { transform: "translateY(-50%)" },
          "50%":  { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      colors: {
        // Brand color scales from theme.config.js
        primary:   theme.colors.primary,
        secondary: theme.colors.secondary,
        neutral:   theme.colors.neutral,
        // Accent colors (Intelligence Cyan + Signal Orange)
        accent: {
          cyan:   theme.colors.accent.cyan,
          orange: theme.colors.accent.orange,
        },
        // Semantic shorthand tokens
        brand: {
          primary:   theme.colors.primary[500],
          secondary: theme.colors.secondary[500],
          cyan:      theme.colors.accent.cyan[500],
          orange:    theme.colors.accent.orange[500],
        },
        // Text tokens
        text: {
          primary:   theme.colors.semantic.text.primary,
          secondary: theme.colors.semantic.text.secondary,
          inverse:   theme.colors.semantic.text.inverse,
        },
        // Background tokens
        bg: {
          primary:   theme.colors.semantic.background.primary,
          secondary: theme.colors.semantic.background.secondary,
          card:      theme.colors.semantic.background.card,
        },
      },
    },
  },
  plugins: [],
}
