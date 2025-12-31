console.log("NUXT CONFIG LOADED");
export default defineNuxtConfig({
  compatibilityDate: '2025-11-17',
  site: {
    url: 'https://www.protegey.com',
    name: 'Protegey',
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  robots: {
    sitemap: 'https://www.protegey.com/sitemap_index.xml'
  },
  i18n: {
    baseUrl: 'https://www.protegey.com',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json', name: 'Français' }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
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
    mailtrapToken: process.env.MAILTRAP_TOKEN,
    public: {
      vercelAnalyticsEnabled: process.env.VERCEL_ANALYTICS_ENABLED !== 'true'
    }
  },
  app: {
    head: {
      title: "Protegey | Unified Anti-Fraud Engine for Africa",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "author", content: "Protegey" },
        { name: "mobile-web-app-title", content: "Protegey" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "mobile-web-app-status-bar-style", content: "black" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0E1225" },
        { property: "og:site_name", content: "Protegey" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@ProtegeyHQ" },
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
        { rel: "icon", type: "image/png", href: "https://www.protegey.com/favicon.png" },
        { rel: "apple-touch-icon", href: "https://www.protegey.com/apple-touch-icon.png" },
        // Preconnect to external image domains
        { rel: "preconnect", href: "https://images.squarespace-cdn.com" },
        { rel: "preconnect", href: "https://www.tonyelumelufoundation.org" },
      ],
    },
  },
})
