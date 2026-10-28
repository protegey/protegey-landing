export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    if (!slug) throw createError({ statusCode: 400, message: 'Missing slug.' })

    try {
        const page = await findPostBySlug(slug)
        if (!page) throw createError({ statusCode: 404, message: 'Article not found.' })

        const { html, wordCount } = await renderBlocksToHtml((page as any).id)
        return {
            post: {
                ...mapPostSummary(page, estimateReadingTime(wordCount)),
                contentHtml: html,
            },
        }
    } catch (error: any) {
        // Any failure here (Notion not configured yet, article missing, API
        // error) surfaces the same "not found" state to the visitor.
        console.error('Failed to load blog post:', error?.message || error)
        throw createError({ statusCode: 404, message: 'Article not found.' })
    }
})
