export default defineNuxtConfig({
  compatibilityDate: '2025-11-17',
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      vercelAnalyticsEnabled: process.env.VERCEL_ANALYTICS_ENABLED !== 'true'
    }
  },
  app: {
    head: {
      title: "Protegey — Intelligent Anti-Fraud for Francophone Africa",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        // Primary meta
        {
          name: "description",
          content:
            "Protegey is an intelligent, centralized anti-fraud platform built for Francophone Africa — offering real-time fraud detection, reporting, analytics, and partner integrations.",
        },
        { name: "keywords", content: "fraud detection, anti-fraud, Africa, Francophone, fintech security, fraud analytics, crime reporting, Protegey" },
        { name: "author", content: "Protegey" },

        // Open Graph (Facebook, WhatsApp, LinkedIn)
        { property: "og:title", content: "Protegey — Intelligent Anti-Fraud for Francophone Africa" },
        { property: "og:description", content: "A real-time, AI-powered anti-fraud platform designed for Francophone Africa." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://protegey.com" },
        { property: "og:image", content: "https://protegey.com/og-image.png" },

        // Twitter Cards
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Protegey — Intelligent Anti-Fraud for Francophone Africa" },
        { name: "twitter:description", content: "AI-powered fraud detection and reporting across Francophone Africa." },
        { name: "twitter:image", content: "https://protegey.com/og-image.png" },

        // Mobile & PWA basics (optional)
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0E1225" },
      ],
      script: [
        {
          children:
            "(function(){try{var stored=localStorage.getItem('theme');var dark=stored==='dark'||(!stored&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);}catch(e){}})();",
        },
      ],
      link: [
        // Favicon setup (update paths to match your assets)
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
  },
})

