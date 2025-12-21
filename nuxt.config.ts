console.log("NUXT CONFIG LOADED");
export default defineNuxtConfig({
  compatibilityDate: '2025-11-17',
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/i18n'],
  i18n: {
    baseUrl: 'https://protegey.com',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json', name: 'Français' }
    ],
    defaultLocale: 'en',
    fallbackLocale: 'en',
    lazy: true,
    langDir: './locales',
    strategy: 'prefix_except_default',
    compilation: {
      strictMessage: false
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    notionApiKey: process.env.NOTION_API_KEY,
    notionDatabaseId: process.env.NOTION_DATABASE_ID,
    resendApiKey: process.env.RESEND_API_KEY,
    public: {
      vercelAnalyticsEnabled: process.env.VERCEL_ANALYTICS_ENABLED !== 'true'
    }
  },
  app: {
    head: {
      title: "Protegey",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        //author
        { name: "author", content: "Protegey" },

        // Mobile & PWA basics (optional)
        { name: "mobile-web-app-title", content: "Protegey" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "mobile-web-app-status-bar-style", content: "black" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0E1225" },
      ],
      script: [
        {
          // Use innerHTML for inline script to satisfy types
          innerHTML:
            "(function(){try{var stored=localStorage.getItem('theme');var dark=stored==='dark'||(!stored&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);}catch(e){}})();",
          type: 'text/javascript'
        },
      ],
      link: [
        // Favicon setup (update paths to match your assets)
        { rel: "icon", type: "image/png", href: "https://protegey.com/favicon.png" },
        { rel: "apple-touch-icon", href: "https://protegey.com/apple-touch-icon.png" },
        // Preconnect to external image domains
        { rel: "preconnect", href: "https://images.squarespace-cdn.com" },
        { rel: "preconnect", href: "https://www.tonyelumelufoundation.org" },
      ],
    },
  },
})

