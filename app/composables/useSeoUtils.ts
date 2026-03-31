import { useLocalePath, useLocaleHead, useI18n } from '#imports'

export const useSeoUtils = () => {
  const localePath = useLocalePath()
  const locale = useI18n()
  const config = useRuntimeConfig()
  const baseUrl = 'https://www.protegey.com'

  const getCanonicalUrl = (path: string) => {
    const currentLocale = locale.locale.value
    const localePrefix = currentLocale === 'fr' ? '' : `/${currentLocale}`
    const cleanPath = path === '/' ? '' : path.replace(/^\/(en|fr|ar)/, '')
    return `${baseUrl}${localePrefix}${cleanPath}`
  }

  const getAlternateLinks = (path: string) => {
    const locales = ['en', 'fr', 'ar']
    const localeCodes = ['en-US', 'fr-FR', 'ar-EG']
    const links = []
    const cleanPath = path === '/' ? '' : path.replace(/^\/(en|fr|ar)/, '')

    for (let i = 0; i < locales.length; i++) {
      const loc = locales[i]
      const localePrefix = loc === 'fr' ? '' : `/${loc}`
      links.push({
        rel: 'alternate',
        hreflang: localeCodes[i],
        href: `${baseUrl}${localePrefix}${cleanPath}`
      })
    }

    links.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${baseUrl}${cleanPath}`
    })

    return links
  }

  const getLocalizedPath = (name: string) => {
    return localePath(name)
  }

  const getSchemaUrl = (path: string) => {
    const currentLocale = locale.locale.value
    const localePrefix = currentLocale === 'fr' ? '' : `/${currentLocale}`
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
