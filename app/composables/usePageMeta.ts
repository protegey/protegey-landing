export function usePageMeta(opts: {
  title: string | (() => string)
  description: string | (() => string)
  schemaOrg?: any[]
}) {
  const title = typeof opts.title === 'function' ? opts.title() : opts.title

  const description =
    typeof opts.description === 'function'
      ? opts.description()
      : opts.description

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
}