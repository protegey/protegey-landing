export default defineEventHandler(async () => {
  const baseUrl = 'https://www.protegey.com'
  const locales = ['en', 'fr', 'ar']
  const lastmod = new Date().toISOString().slice(0, 10)

  const staticPages = [
    '',
    'about',
    'contact',
    'trust',
    'use-cases',
    'comparisons',
    'what-is-protegey',
    'how-it-works',
    'who-its-for',
    'privacy',
    'careers',
    'api-docs',
    'solutions',
    'terms',
    'demo',
  ]

  const solutionSlugs = ['transaction-monitoring', 'account-protection', 'risk-profiling', 'pan-id', 'pan-risk', 'pan-studio']
  const useCaseSlugs = ['banks', 'lending', 'microfinance', 'fintechs', 'mobile_money', 'remittance', 'crypto', 'regulators']

  const isoMap: Record<string, string> = { en: 'en-US', fr: 'fr-FR', ar: 'ar-EG' }
  const urls: { loc: string; lastmod: string; changefreq: string; priority: number; alternates: { languages: Record<string, string> } }[] = []

  for (const locale of locales) {
    const localePrefix = locale === 'fr' ? '' : `/${locale}`

    for (const page of staticPages) {
      const path = page ? `${localePrefix}/${page}` : localePrefix || '/'
      const entry = {
        loc: `${baseUrl}${path}`,
        lastmod,
        changefreq: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: { languages: {} as Record<string, string> },
      }

      for (const altLocale of locales) {
        const altPrefix = altLocale === 'fr' ? '' : `/${altLocale}`
        const altPath = page ? `${altPrefix}/${page}` : altPrefix || '/'
        entry.alternates.languages[isoMap[altLocale] ?? altLocale] = `${baseUrl}${altPath}`
      }
      // x-default points to the fr (default locale) URL
      const frPath = page ? `/${page}` : '/'
      entry.alternates.languages['x-default'] = `${baseUrl}${frPath}`

      urls.push(entry)
    }

    for (const slug of solutionSlugs) {
      const path = `${localePrefix}/solutions/${slug}`
      const entry = {
        loc: `${baseUrl}${path}`,
        lastmod,
        changefreq: 'weekly',
        priority: 0.9,
        alternates: { languages: {} as Record<string, string> },
      }

      for (const altLocale of locales) {
        const altPrefix = altLocale === 'fr' ? '' : `/${altLocale}`
        entry.alternates.languages[isoMap[altLocale] ?? altLocale] = `${baseUrl}${altPrefix}/solutions/${slug}`
      }
      entry.alternates.languages['x-default'] = `${baseUrl}/solutions/${slug}`

      urls.push(entry)
    }

    for (const slug of useCaseSlugs) {
      const path = `${localePrefix}/use-cases/${slug}`
      const entry = {
        loc: `${baseUrl}${path}`,
        lastmod,
        changefreq: 'weekly',
        priority: 0.7,
        alternates: { languages: {} as Record<string, string> },
      }

      for (const altLocale of locales) {
        const altPrefix = altLocale === 'fr' ? '' : `/${altLocale}`
        entry.alternates.languages[isoMap[altLocale] ?? altLocale] = `${baseUrl}${altPrefix}/use-cases/${slug}`
      }
      entry.alternates.languages['x-default'] = `${baseUrl}/use-cases/${slug}`

      urls.push(entry)
    }
  }

  return urls
})
