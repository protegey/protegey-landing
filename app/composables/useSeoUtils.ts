import { useLocalePath, useLocaleHead, useI18n } from '#imports'

export const useSeoUtils = () => {
  const localePath = useLocalePath()
  const locale = useI18n()
  const config = useRuntimeConfig()
  const baseUrl = 'https://www.protegey.com'

  const getCanonicalUrl = (path: string) => {
    const currentLocale = locale.locale.value
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`
    const cleanPath = path === '/' ? '' : path.replace(/^\/(en|fr|ar)/, '')
    return `${baseUrl}${localePrefix}${cleanPath}`
  }

  const getAlternateLinks = (path: string) => {
    const locales = ['en', 'fr', 'ar']
    const links = []
    
    for (const loc of locales) {
      const cleanPath = path === '/' ? '' : path.replace(/^\/(en|fr|ar)/, '')
      const localePrefix = loc === 'en' ? '' : `/${loc}`
      links.push({
        rel: 'alternate',
        hreflang: loc === 'en' ? 'en' : loc,
        href: `${baseUrl}${localePrefix}${cleanPath}`
      })
    }
    
    links.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${baseUrl}`
    })
    
    return links
  }

  const getLocalizedPath = (name: string, params?: Record<string, string>) => {
    return localePath(name, params)
  }

  const getSchemaUrl = (path: string) => {
    const currentLocale = locale.locale.value
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${localePrefix}${cleanPath}`
  }

  return {
    getCanonicalUrl,
    getAlternateLinks,
    getLocalizedPath,
    getSchemaUrl,
    baseUrl
  }
}
