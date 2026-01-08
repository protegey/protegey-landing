console.log("NUXT CONFIG LOADED");
export default defineNuxtConfig({
  compatibilityDate: '2025-11-17',
  site: {
    url: 'https://www.protegey.com',
    name: 'Protegey',
    titleSeparator: '|',
    defaultLocale: 'en',
    templateTitle: '%s %separator %siteName',
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/i18n', '@nuxtjs/seo'],
  seo: {
    redirectToCanonicalSiteUrl: true
  },
  sitemap: {
    strictNuxtContentPaths: true,
    autoI18n: true,
    exclude: ['/api/**'],
    urls: [
      '/products/signal',
      '/products/radar',
      '/products/api',
      '/products/console',
      '/products/compliance',
      '/products/panid',
      '/fr/products/signal',
      '/fr/products/radar',
      '/fr/products/api',
      '/fr/products/console',
      '/fr/products/compliance',
      '/fr/products/panid',
      '/what-is-protegey',
      '/how-it-works',
      '/who-its-for',
      '/use-cases',
      '/comparisons',
      '/fr/what-is-protegey',
      '/fr/how-it-works',
      '/fr/who-its-for',
      '/fr/use-cases',
      '/fr/comparisons',
      '/ar/what-is-protegey',
      '/ar/how-it-works',
      '/ar/who-its-for',
      '/ar/use-cases',
      '/ar/comparisons',
      '/ar/products/signal',
      '/ar/products/radar',
      '/ar/products/api',
      '/ar/products/console',
      '/ar/products/compliance',
      '/ar/products/panid'
    ]
  },
  robots: {
    allow: ['/'],
  },
  ogImage: {
    defaults: {
      component: 'NuxtSeo',
      props: {
        title: 'Protegey',
        description: 'Unified Fraud Intelligence Engine for Francophone and Northern Africa',
      }
    }
  },
  linkChecker: {
    enabled: true,
    runOnBuild: true
  },
  i18n: {
    baseUrl: 'https://www.protegey.com',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'ar', language: 'ar-EG', file: 'ar.json', name: 'العربية', dir: 'rtl' }
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
      title: "Protegey | Unified Fraud Intelligence Engine for Francophone and Northern Africa",
      htmlAttrs: {
        // lang is handled dynamically by @nuxtjs/i18n
      },
      meta: [
        { name: "author", content: "Protegey" },
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
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "preconnect", href: "https://images.squarespace-cdn.com" },
        { rel: "preconnect", href: "https://www.tonyelumelufoundation.org" },
      ],
    },
  },
})
