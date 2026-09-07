import { NewsletterError, subscribeNewsletter, validateNewsletter } from '../utils/newsletter'

// Coalesce simultaneous retries in one server process. Notion stores durable records.
const pending = new Map<string, Promise<{ success: boolean }>>()

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')
  rateLimit(event, { max: 5, windowMs: 10 * 60_000 })
  try {
    const input = validateNewsletter(await readBody(event))
    const config = useRuntimeConfig()
    const running = pending.get(input.email)
    if (running) return await running
    const operation = subscribeNewsletter(input, {
      brevoApiKey: String(config.brevoApiKey || ''),
      brevoNewsletterListId: String(config.brevoNewsletterListId || ''),
      notionApiKey: String(config.notionApiKey || ''),
      notionNewsletterDataSourceId: String(config.notionNewsletterDataSourceId || '')
    }, $fetch)
    pending.set(input.email, operation)
    try { return await operation } finally { pending.delete(input.email) }
  } catch (error: any) {
    if (error instanceof NewsletterError) throw createError({ statusCode: error.statusCode, message: error.message })
    // Do not log provider request bodies, credentials, or subscriber addresses.
    console.error('Newsletter registration failed', { status: error?.statusCode || error?.response?.status || 500 })
    throw createError({ statusCode: 502, message: 'Unable to complete newsletter signup. Please try again.' })
  }
})
