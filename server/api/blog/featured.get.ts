export default defineEventHandler(async () => {
    try {
        const pages = await queryPublishedPosts({ featuredOnly: true })
        const page = pages[0]
        if (!page) return { post: null }
        const { wordCount } = await renderBlocksToHtml((page as any).id)
        return { post: mapPostSummary(page, estimateReadingTime(wordCount)) }
    } catch (error: any) {
        console.error('Failed to load featured blog post:', error?.message || error)
        return { post: null }
    }
})
