export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
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
      title: 'PROTEGEY - Launching Soon',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'PROTEGEY is launching soon. Stay tuned for something amazing.' }
      ]
    }
  }
})

