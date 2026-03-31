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

  const solutionSlugs = ['transaction-monitoring', 'account-protection', 'aml-compliance', 'risk-profiling', 'fraud-intelligence']
  const useCaseSlugs = ['banks', 'lending', 'microfinance', 'fintechs', 'mobile_money', 'remittance', 'ecommerce', 'gaming', 'crypto', 'regulators', 'mobility']

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
        if (altLocale !== locale) {
          const altPrefix = altLocale === 'fr' ? '' : `/${altLocale}`
          const altPath = page ? `${altPrefix}/${page}` : altPrefix || '/'
          entry.alternates.languages[altLocale] = `${baseUrl}${altPath}`
        }
      }

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
        if (altLocale !== locale) {
          const altPrefix = altLocale === 'fr' ? '' : `/${altLocale}`
          entry.alternates.languages[altLocale] = `${baseUrl}${altPrefix}/solutions/${slug}`
        }
      }

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
        if (altLocale !== locale) {
          const altPrefix = altLocale === 'fr' ? '' : `/${altLocale}`
          entry.alternates.languages[altLocale] = `${baseUrl}${altPrefix}/use-cases/${slug}`
        }
      }

      urls.push(entry)
    }
  }

  return urls
})
