export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) throw createError({ statusCode: 400, message: 'Missing id.' })

    const resolved = await resolveCoverUrl(id)
    if (!resolved) throw createError({ statusCode: 404, message: 'No cover image.' })

    const res = await fetch(resolved.url)
    if (!res.ok || !res.body) throw createError({ statusCode: 502, message: 'Failed to fetch cover image.' })

    setResponseHeader(event, 'Content-Type', res.headers.get('content-type') || 'image/jpeg')
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')
    return sendStream(event, res.body as any)
})
