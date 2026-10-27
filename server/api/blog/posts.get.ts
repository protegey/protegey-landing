export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const category = typeof query.category === 'string' ? query.category : undefined

    try {
        const pages = await queryPublishedPosts({ category })
        const posts = []
        for (const page of pages) {
            const { wordCount } = await renderBlocksToHtml((page as any).id)
            posts.push(mapPostSummary(page, estimateReadingTime(wordCount)))
        }
        return { posts }
    } catch (error: any) {
        // No blog database configured yet, or Notion unreachable — the UI shows
        // the pre-launch empty state rather than a hard error.
        console.error('Failed to load blog posts:', error?.message || error)
        return { posts: [] }
    }
})
