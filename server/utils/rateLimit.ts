/**
 * Simple in-memory rate limiter for Nitro server routes.
 * Limits requests per IP within a sliding window.
 *
 * Usage:
 *   await rateLimit(event, { max: 5, windowMs: 60_000 })
 *   // throws 429 if the IP has exceeded max requests in windowMs
 */

interface RateLimitOptions {
    max: number       // max requests allowed in window
    windowMs: number  // window duration in milliseconds
}

interface Record {
    count: number
    resetAt: number
}

// Module-level store (persists for the lifetime of the Nitro process)
const store = new Map<string, Record>()

// Periodically clear expired entries to prevent unbounded memory growth
setInterval(() => {
    const now = Date.now()
    for (const [key, rec] of store) {
        if (rec.resetAt <= now) store.delete(key)
    }
}, 60_000)

export function rateLimit(event: any, opts: RateLimitOptions): void {
    const ip =
        getRequestHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
        getRequestHeader(event, 'x-real-ip') ||
        event.node?.req?.socket?.remoteAddress ||
        'unknown'

    const key = `${event.node?.req?.url ?? ''}:${ip}`
    const now = Date.now()
    const rec = store.get(key)

    if (!rec || rec.resetAt <= now) {
        store.set(key, { count: 1, resetAt: now + opts.windowMs })
        return
    }

    rec.count++
    if (rec.count > opts.max) {
        throw createError({
            statusCode: 429,
            message: 'Too many requests. Please try again later.'
        })
    }
}
