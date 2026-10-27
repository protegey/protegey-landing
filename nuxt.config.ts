export default defineNuxtConfig({
  compatibilityDate: '2025-11-17',
  site: {
    url: 'https://www.protegey.com',
    name: 'Protegey',
    titleSeparator: '|',
    defaultLocale: 'fr',
    templateTitle: '%s %separator %siteName',
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', 'nuxt-schema-org', '@nuxtjs/seo', '@nuxt/image'],
  // IPX's sharp-based transform pipeline hangs indefinitely on this machine (confirmed: sharp
  // loads fine standalone, but every /_ipx/* request never resolves). Serve images unprocessed
  // instead of fighting that — this is a static marketing site with pre-optimized assets anyway.
  image: {
    provider: 'none',
  },
  seo: {
    redirectToCanonicalSiteUrl: true
  },
  // @ts-expect-error routeRules is a valid top-level Nuxt config option (type definition gap in @nuxt/schema)
  routeRules: {
    // 1. Cache all pages by default (SWR - Stale While Revalidate)
    '/**': {
      swr: 3600,
      headers: {
        // Clickjacking — superseded by frame-ancestors in CSP but kept for older browsers
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        // Content Security Policy
        // script-src requires 'unsafe-inline' for Nuxt SSR hydration payload scripts.
        // All external calls to Notion/Mailtrap are server-side only — not in connect-src.
        // Vercel Analytics script is loaded from same origin via the @vercel/analytics package.
        'Content-Security-Policy': [
          "default-src 'none'",
          "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: blob: https://images.squarespace-cdn.com https://www.tonyelumelufoundation.org",
          "connect-src 'self' https://vitals.vercel-insights.com",
          "frame-src 'none'",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
          "upgrade-insecure-requests",
        ].join('; '),
      }
    },

    // 2. Explicitly dynamic for API
    '/api/**': { swr: false, cache: false },
    // 3. Blog content changes rarely — cache listings/posts briefly to avoid
    //    re-hitting Notion (and re-resolving image URLs) on every request.
    '/api/blog/posts': { swr: 1800 },
    '/api/blog/featured': { swr: 1800 },
    '/api/blog/post/**': { swr: 1800 },
    '/api/blog/cover/**': { swr: 3600 },
    '/api/blog/image/**': { swr: 3600 },
  },
  sitemap: {
    strictNuxtContentPaths: true,
    autoI18n: false,
    exclude: ['/api/**'],
    sources: ['/api/sitemap-urls'],
  },
  robots: {
    allow: ['/'],
  },
  ogImage: {
    enabled: true,
    fonts: [
      'Inter:400',
      'Inter:700',
      'Inter:800',
    ],
  },
  linkChecker: {
    enabled: true,
    runOnBuild: true
  },
  i18n: {
    baseUrl: 'https://www.protegey.com',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'ar', iso: 'ar-EG', file: 'ar.json', name: 'العربية', dir: 'rtl' }
    ],
    defaultLocale: 'fr',
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
    notionBlogDatabaseId: process.env.NOTION_BLOG_DATABASE_ID,
    mailtrapToken: process.env.MAILTRAP_TOKEN,
    resendApiKey: process.env.RESEND_API_KEY,
    public: {
      vercelAnalyticsEnabled: process.env.VERCEL_ANALYTICS_ENABLED === 'true'
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
        { name: "theme-color", content: "#0B1741" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      ],
      script: [
        {
          // Use innerHTML for inline script to satisfy types
          innerHTML:
            "(function(){try{var match=document.cookie.match(/(?:^|;)\\s*theme=([^;]*)/);var dark=match?match[1]==='dark':false;document.documentElement.classList.toggle('dark',dark);}catch(e){}})();",
          type: 'text/javascript'
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "preconnect", href: "https://images.squarespace-cdn.com" },
        { rel: "preconnect", href: "https://www.tonyelumelufoundation.org" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
        { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" },
      ],
    },
  },
})
