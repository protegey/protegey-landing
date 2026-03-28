/**
 * Universal Theme Configuration
 * Official Protegey Brand Guidelines — updated to match brand identity PDF
 * Change colors here to update the entire application
 */

export const theme = {
  colors: {
    // Primary brand colors — Security Emerald (#0CB99E)
    // Represents: Protection, Verification, Safety
    primary: {
      50:  '#f0fdf9',
      100: '#ccfbf0',
      200: '#99f6e1',
      300: '#5ee8cc',
      400: '#2dd4b6',
      500: '#0cb99e', // Security Emerald — main brand accent
      600: '#0a9882',
      700: '#0a7a69',
      800: '#0b6056',
      900: '#0c5047',
      950: '#042d28',
    },
    // Secondary brand colors — Tech Blue (#1B59AE)
    // Represents: Innovation, Digital Connectivity, Platform Scalability
    secondary: {
      50:  '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#4a90d9',
      500: '#1b59ae', // Tech Blue — main secondary
      600: '#1548a0',
      700: '#103990',
      800: '#0c2c78',
      900: '#092060',
      950: '#061440',
    },
    // Neutral colors — Deep Trust Blue family (#0B1741)
    // Represents: Trust, Security, Infrastructure
    neutral: {
      50:  '#f1f4f8',
      100: '#e2e7ef',
      200: '#c5cedc',
      300: '#9aacc5',
      400: '#6b7ea3',
      500: '#3a4e7a',
      600: '#1e3169',
      700: '#162558',
      800: '#0f1f4a',
      900: '#0b1741', // Deep Trust Blue — brand dark background
      950: '#060d1c', // Deepest background
    },
    // Accent colors — per brand guidelines
    accent: {
      cyan: {
        400: '#67e8f9',
        500: '#22d3ee', // Intelligence Cyan — Technology, Data analysis
      },
      orange: {
        400: '#fb923c',
        500: '#ff6b00', // Signal Orange — Alert, Risk Signals, Fraud Detection
      },
    },
    // Semantic colors (dark-first)
    semantic: {
      text: {
        primary:   '#f1f4f8', // near-white
        secondary: '#9aacc5', // muted blue-gray
        inverse:   '#060d1c', // deep dark for light mode text
      },
      background: {
        primary:   '#060d1c', // deepest dark
        secondary: '#0b1741', // Deep Trust Blue
        card:      '#0f1f4a', // elevated card surface
        overlay:   'rgba(6, 13, 28, 0.85)',
      },
    },
  },
  // Gradient definitions
  gradients: {
    primary: 'from-primary-400 to-secondary-400',
    cyber:   'from-primary-400 via-accent-cyan-500 to-secondary-400',
    dark:    'from-neutral-900 to-neutral-950',
    glow:    'from-primary-500/20 to-secondary-500/20',
  },
};
