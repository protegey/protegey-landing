export const newsletterConsent = {
  en: 'I agree to receive the Protegey newsletter by email.',
  fr: 'J’accepte de recevoir la newsletter Protegey par email.',
  ar: 'أوافق على تلقي نشرة Protegey عبر البريد الإلكتروني.'
}

export class NewsletterError extends Error {
  constructor(public statusCode: number, message: string) { super(message) }
}

export function validateNewsletter(body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new NewsletterError(400, 'Invalid request')
  const input = body as Record<string, unknown>
  if (typeof input.website === 'string' && input.website) throw new NewsletterError(400, 'Invalid request')
  if (input.consent !== true) throw new NewsletterError(400, 'Newsletter consent is required')
  if (typeof input.email !== 'string') throw new NewsletterError(400, 'Invalid email')
  const email = input.email.trim().toLowerCase()
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new NewsletterError(400, 'Invalid email')
  if (input.lang !== 'en' && input.lang !== 'fr' && input.lang !== 'ar') throw new NewsletterError(400, 'Invalid language')
  return { email, lang: input.lang }
}

type Settings = { brevoApiKey: string; brevoNewsletterListId: string | number; notionApiKey: string; notionNewsletterDataSourceId: string }
type Request = (url: string, options: any) => Promise<any>

export async function subscribeNewsletter(input: ReturnType<typeof validateNewsletter>, config: Settings, request: Request) {
  const listId = Number(config.brevoNewsletterListId)
  if (!config.brevoApiKey || !Number.isSafeInteger(listId) || listId <= 0 || !config.notionApiKey || !/^[a-f\d-]{32,36}$/i.test(config.notionNewsletterDataSourceId || '')) {
    throw new NewsletterError(503, 'Newsletter signup is temporarily unavailable')
  }
  const brevo = (path: string, method: string, body?: unknown) => request(`https://api.brevo.com/v3${path}`, {
    method, headers: { 'api-key': config.brevoApiKey, 'Content-Type': 'application/json' }, body, timeout: 10000, retry: 0
  })
  const notion = (path: string, method: string, body?: unknown) => request(`https://api.notion.com/v1${path}`, {
    method, headers: { Authorization: `Bearer ${config.notionApiKey}`, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' }, body, timeout: 10000, retry: 0
  })
  const contactPath = `/contacts/${encodeURIComponent(input.email)}`
  let contact: any
  try { contact = await brevo(contactPath, 'GET') }
  catch (error: any) { if ((error.statusCode || error.response?.status) !== 404) throw error }
  // Never reset suppression flags or silently re-enable a previously unsubscribed address.
  if (contact?.emailBlacklisted) throw new NewsletterError(409, 'Please contact us to manage this subscription')

  const existing = await notion(`/data_sources/${config.notionNewsletterDataSourceId}/query`, 'POST', {
    filter: { property: 'Email', email: { equals: input.email } }, page_size: 1
  })
  let record = existing.results?.[0]
  if (!record) {
    record = await notion('/pages', 'POST', {
      parent: { type: 'data_source_id', data_source_id: config.notionNewsletterDataSourceId },
      properties: {
        Name: { title: [{ text: { content: input.email } }] },
        Email: { email: input.email },
        Language: { select: { name: input.lang } },
        Consent: { checkbox: true },
        'Consent text': { rich_text: [{ text: { content: newsletterConsent[input.lang] } }] },
        'Consent date': { date: { start: new Date().toISOString() } },
        Source: { rich_text: [{ text: { content: 'Website newsletter signup / consent-v1' } }] },
        'Brevo sync': { select: { name: 'Pending' } }
      }
    })
  }
  if (!record?.id) throw new Error('Newsletter record was not saved')
  // This upsert only adds list membership; it does not replace existing lists or change suppression.
  await brevo('/contacts', 'POST', { email: input.email, listIds: [listId], updateEnabled: true })
  await notion(`/pages/${record.id}`, 'PATCH', { properties: { 'Brevo sync': { select: { name: 'Synced' } } } })
  return { success: true }
}
