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
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        'scan': 'scan 4s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(163, 230, 53, 0.5)' },
          '50%': { opacity: .5, boxShadow: '0 0 10px rgba(163, 230, 53, 0.2)' },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
      colors: {
        // Primary brand colors
        primary: theme.colors.primary,
        // Secondary brand colors
        secondary: theme.colors.secondary,
        // Neutral colors
        neutral: theme.colors.neutral,
        // Accent colors
        accent: {
          yellow: theme.colors.accent.yellow,
          blue: theme.colors.accent.blue,
        },
        // Semantic colors for easy reference
        brand: {
          primary: theme.colors.primary[400],
          secondary: theme.colors.secondary[500],
        },
        // Text colors
        text: {
          primary: theme.colors.semantic.text.primary,
          secondary: theme.colors.semantic.text.secondary,
          inverse: theme.colors.semantic.text.inverse,
        },
        // Background colors
        bg: {
          primary: theme.colors.semantic.background.primary,
          secondary: theme.colors.semantic.background.secondary,
          card: theme.colors.semantic.background.card,
        },
      },
    },
  },
  plugins: [],
}

