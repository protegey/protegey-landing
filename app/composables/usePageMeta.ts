export function usePageMeta(opts: {
  title: string | (() => string)
  description: string | (() => string)
  ogImage?: string
  schemaOrg?: any[]
}) {
  const { t } = useI18n()
  const globalImage = t('seo.global.image')
  const ogImage = opts.ogImage ?? globalImage

  const title = typeof opts.title === 'function' ? opts.title() : opts.title
  const description = typeof opts.description === 'function' ? opts.description() : opts.description

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterSite: '@ProtegeyHQ',
  })

  if (import.meta.server && opts.schemaOrg) {
    useSchemaOrg(opts.schemaOrg)
  }
}
