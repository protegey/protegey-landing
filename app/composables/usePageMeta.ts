export function usePageMeta(opts: {
  title: string | (() => string)
  description: string | (() => string)
  schemaOrg?: any[]
}) {
  const { t } = useI18n()
  const title = typeof opts.title === 'function' ? opts.title() : opts.title
  const description = typeof opts.description === 'function' ? opts.description() : opts.description

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterSite: '@ProtegeyHQ',
  })

  // Generate OG image dynamically from page content
  if (import.meta.server) {
    defineOgImageComponent('Protegey', {
      title,
      description,
      tagline: t('seo.global.og_tagline'),
      siteName: 'protegey.com',
    })

    if (opts.schemaOrg) {
      useSchemaOrg(opts.schemaOrg)
    }
  }
}
