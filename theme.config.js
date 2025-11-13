/**
 * Universal Theme Configuration
 * Change colors here to update the entire application
 */

export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      50: '#f7fee7',
      100: '#ecfccb',
      200: '#d9f99d',
      300: '#bef264', // lime-300
      400: '#a3e635', // lime-400 - main primary
      500: '#84cc16', // lime-500
      600: '#65a30d',
      700: '#4d7c0f',
      800: '#365314',
      900: '#1a2e05',
    },
    // Secondary brand colors
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc', // purple-400
      500: '#a855f7', // purple-500 - main secondary
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    // Neutral colors
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af', // gray-400
      500: '#6b7280',
      600: '#4b5563', // gray-600
      700: '#374151', // gray-700
      800: '#1f2937', // gray-800
      900: '#111827', // gray-900
    },
    // Accent colors
    accent: {
      yellow: {
        400: '#facc15', // yellow-400
        600: '#eab308', // yellow-600
      },
      blue: {
        300: '#93c5fd', // blue-300
        400: '#60a5fa', // blue-400
      },
    },
    // Semantic colors
    semantic: {
      text: {
        primary: '#ffffff', // white
        secondary: '#9ca3af', // gray-400
        inverse: '#000000', // black (for light backgrounds)
      },
      background: {
        primary: '#000000', // black
        secondary: '#111827', // gray-900
        card: '#1f2937', // gray-800
      },
    },
  },
  // Gradient definitions
  gradients: {
    primary: 'from-lime-400 to-purple-500',
    card: 'from-gray-800 to-gray-900',
    chip: 'from-yellow-400 to-yellow-600',
  },
};

