export function usePageMeta(opts: {
  title: string | (() => string)
  description: string | (() => string)
  ogImage?: string
  schemaOrg?: any[]
}) {
  const { t } = useI18n()
  const globalImage = t('seo.global.image')
  const ogImage = opts.ogImage ?? globalImage

  useSeoMeta({
    title: opts.title,
    ogTitle: opts.title,
    description: opts.description,
    ogDescription: opts.description,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: opts.title,
    twitterDescription: opts.description,
    twitterImage: ogImage,
    twitterSite: '@ProtegeyHQ',
  })

  if (import.meta.server && opts.schemaOrg) {
    useSchemaOrg(opts.schemaOrg)
  }

  if (import.meta.server && opts.ogImage) {
    defineOgImageComponent('NuxtSeo', {
      title: typeof opts.title === 'function' ? opts.title() : opts.title,
      description: typeof opts.description === 'function' ? opts.description() : opts.description,
      theme: '#0B1741',
      colorMode: 'dark',
    })
  }
}
