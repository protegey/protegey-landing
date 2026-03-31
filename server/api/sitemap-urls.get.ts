export default defineEventHandler(async () => {
  const baseUrl = 'https://www.protegey.com'
  const locales = ['en', 'fr', 'ar']
  
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
    'solutions'
  ]

  const solutions = ['transaction-monitoring', 'account-protection', 'aml-compliance', 'risk-profiling', 'fraud-intelligence']
  
  const urls = []
  
  for (const locale of locales) {
    const localePrefix = locale === 'en' ? '' : `/${locale}`
    
    for (const page of staticPages) {
      const path = page ? `${localePrefix}/${page}` : localePrefix || '/'
      urls.push({
        loc: `${baseUrl}${path}`,
        changefreq: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {}
        }
      })
      
      for (const altLocale of locales) {
        if (altLocale !== locale) {
          const altPrefix = altLocale === 'en' ? '' : `/${altLocale}`
          const altPath = page ? `${altPrefix}/${page}` : altPrefix || '/'
          urls[urls.length - 1].alternates.languages[altLocale] = `${baseUrl}${altPath}`
        }
      }
    }
    
    for (const solution of solutions) {
      const path = `${localePrefix}/solutions/${solution}`
      urls.push({
        loc: `${baseUrl}${path}`,
        changefreq: 'weekly',
        priority: 0.9,
        alternates: {
          languages: {}
        }
      })
      
      const currentIndex = urls.length - 1
      for (const altLocale of locales) {
        if (altLocale !== locale) {
          const altPrefix = altLocale === 'en' ? '' : `/${altLocale}`
          urls[currentIndex].alternates.languages[altLocale] = `${baseUrl}${altPrefix}/solutions/${solution}`
        }
      }
    }
  }
  
  return urls
})
