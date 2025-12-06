/**
 * Universal Theme Configuration
 * Change colors here to update the entire application
 */

export const theme = {
  colors: {
    // Primary brand colors (Lime/Cyber Green)
    primary: {
      50: '#f7fee7',
      100: '#ecfccb',
      200: '#d9f99d',
      300: '#bef264',
      400: '#a3e635', // Main Brand Lime
      500: '#84cc16',
      600: '#65a30d',
      700: '#4d7c0f',
      800: '#365314',
      900: '#1a2e05',
      950: '#0d1602',
    },
    // Secondary brand colors (Cyber Purple)
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7', // Main Brand Purple
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    // Neutral colors (Slate/Dark Blue-Grey)
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b', // Card bg
      900: '#0f172a', // Darker bg
      950: '#020617', // Deepest bg
    },
    // Accent colors
    accent: {
      cyan: {
        400: '#22d3ee',
        500: '#06b6d4',
      },
      rose: {
        500: '#f43f5e',
      },
    },
    // Semantic colors
    semantic: {
      text: {
        primary: '#f8fafc', // Slate-50
        secondary: '#94a3b8', // Slate-400
        inverse: '#020617', // Slate-950
      },
      background: {
        primary: '#020617', // Slate-950
        secondary: '#0f172a', // Slate-900
        card: '#1e293b', // Slate-800
        overlay: 'rgba(2, 6, 23, 0.8)',
      },
    },
  },
  // Gradient definitions
  gradients: {
    primary: 'from-lime-400 to-emerald-500',
    cyber: 'from-lime-400 via-emerald-400 to-cyan-500',
    dark: 'from-slate-900 to-slate-950',
    glow: 'from-lime-500/20 to-emerald-500/20',
  },
};

