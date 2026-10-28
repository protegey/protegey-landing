import { Client } from '@notionhq/client'

let client: Client | null = null

export function getNotionBlogClient(): Client {
    if (!client) {
        const config = useRuntimeConfig()
        if (!config.notionApiKey) {
            throw createError({ statusCode: 500, message: 'Notion API key is not configured.' })
        }
        client = new Client({ auth: config.notionApiKey as string })
    }
    return client
}

export function getBlogDatabaseId(): string {
    const config = useRuntimeConfig()
    const id = config.notionBlogDatabaseId as string | undefined
    if (!id) {
        throw createError({ statusCode: 500, message: 'Blog database is not configured.' })
    }
    return id
}

// The five fixed editorial categories from the blog brief.
export const BLOG_CATEGORIES = [
    'Fraud Intelligence',
    'Identity & Onboarding',
    'Risk & Compliance',
    'Financial Services in Africa',
    'Product & Technology',
] as const

export type BlogCategory = typeof BLOG_CATEGORIES[number]

function slugify(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 80)
}

function richTextToPlain(rich: any[]): string {
    return (rich || []).map((t) => t.plain_text || '').join('')
}

export interface BlogPostSummary {
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    publishedDate: string | null
    featured: boolean
    hasCover: boolean
    readingTime: number
}

export function mapPostSummary(page: any, readingTime = 0): BlogPostSummary {
    const props = page.properties
    const title = richTextToPlain(props.Title?.title || props.Name?.title || [])
    return {
        id: page.id,
        slug: slugify(title) || page.id,
        title,
        excerpt: richTextToPlain(props.Excerpt?.rich_text || []),
        category: props.Category?.select?.name || '',
        publishedDate: props['Published Date']?.date?.start || null,
        featured: !!props.Featured?.checkbox,
        hasCover: !!(props['Cover Image']?.files?.length),
        readingTime,
    }
}

// Simple in-process TTL cache. Nitro route-rule ISR config is deliberately
// avoided for /api/blog/** — giving those exact-path routes their own
// Vercel-preset build config collides with Nitro's function bundling at
// build time. This process-local cache gets most of the same benefit
// (fewer Notion round-trips) without touching the build pipeline.
const memoCache = new Map<string, { value: any, expiresAt: number }>()

async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
    const hit = memoCache.get(key)
    if (hit && hit.expiresAt > Date.now()) return hit.value as T
    const value = await fn()
    memoCache.set(key, { value, expiresAt: Date.now() + ttlMs })
    return value
}

export async function queryPublishedPosts(options: { category?: string, featuredOnly?: boolean } = {}) {
    const cacheKey = `posts:${options.category || ''}:${options.featuredOnly ? 1 : 0}`
    return cached(cacheKey, 30 * 60_000, async () => {
        const notion = getNotionBlogClient()
        const databaseId = getBlogDatabaseId()

        const andFilters: any[] = [{ property: 'Status', select: { equals: 'Published' } }]
        if (options.category) {
            andFilters.push({ property: 'Category', select: { equals: options.category } })
        }
        if (options.featuredOnly) {
            andFilters.push({ property: 'Featured', checkbox: { equals: true } })
        }

        const response = await notion.databases.query({
            database_id: databaseId,
            filter: { and: andFilters },
            sorts: [{ property: 'Published Date', direction: 'descending' }],
        })

        return response.results
    })
}

export async function findPostBySlug(slug: string) {
    const posts = await queryPublishedPosts()
    return posts.find((page: any) => mapPostSummary(page).slug === slug) || null
}

// Resolves the current (possibly freshly re-signed) URL for a Notion-hosted
// or external file attached to a page property or block, given its parent id.
export async function resolveCoverUrl(pageId: string): Promise<{ url: string, contentType?: string } | null> {
    const notion = getNotionBlogClient()
    const page: any = await notion.pages.retrieve({ page_id: pageId })
    const files = page.properties?.['Cover Image']?.files || []
    const file = files[0]
    if (!file) return null
    const url = file.type === 'external' ? file.external.url : file.file.url
    return { url }
}

export async function resolveBlockImageUrl(blockId: string): Promise<{ url: string } | null> {
    const notion = getNotionBlogClient()
    const block: any = await notion.blocks.retrieve({ block_id: blockId })
    const image = block.image
    if (!image) return null
    const url = image.type === 'external' ? image.external.url : image.file.url
    return { url }
}

function escapeHtml(str: string): string {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

function richTextToHtml(rich: any[]): string {
    return (rich || []).map((t) => {
        let text = escapeHtml(t.plain_text || '')
        if (t.annotations?.code) text = `<code>${text}</code>`
        if (t.annotations?.bold) text = `<strong>${text}</strong>`
        if (t.annotations?.italic) text = `<em>${text}</em>`
        if (t.href) text = `<a href="${escapeHtml(t.href)}" target="_blank" rel="noopener noreferrer">${text}</a>`
        return text
    }).join('')
}

// Renders a flat list of top-level Notion blocks into article HTML.
// Supports the common block types an editor would use for a blog post.
export async function renderBlocksToHtml(pageId: string): Promise<{ html: string, wordCount: number }> {
    return cached(`blocks:${pageId}`, 30 * 60_000, () => renderBlocksToHtmlUncached(pageId))
}

async function renderBlocksToHtmlUncached(pageId: string): Promise<{ html: string, wordCount: number }> {
    const notion = getNotionBlogClient()
    let cursor: string | undefined
    const blocks: any[] = []
    do {
        const res: any = await notion.blocks.children.list({ block_id: pageId, start_cursor: cursor, page_size: 100 })
        blocks.push(...res.results)
        cursor = res.has_more ? res.next_cursor : undefined
    } while (cursor)

    let html = ''
    let wordCount = 0
    let listBuffer: { type: 'ul' | 'ol', items: string[] } | null = null

    const flushList = () => {
        if (!listBuffer) return
        const tag = listBuffer.type
        html += `<${tag}>${listBuffer.items.map((i) => `<li>${i}</li>`).join('')}</${tag}>`
        listBuffer = null
    }

    for (const block of blocks) {
        const type = block.type
        const data = block[type]
        const text = data?.rich_text ? richTextToHtml(data.rich_text) : ''
        wordCount += richTextToPlain(data?.rich_text || []).split(/\s+/).filter(Boolean).length

        if (type === 'bulleted_list_item') {
            if (!listBuffer || listBuffer.type !== 'ul') { flushList(); listBuffer = { type: 'ul', items: [] } }
            listBuffer.items.push(text)
            continue
        }
        if (type === 'numbered_list_item') {
            if (!listBuffer || listBuffer.type !== 'ol') { flushList(); listBuffer = { type: 'ol', items: [] } }
            listBuffer.items.push(text)
            continue
        }
        flushList()

        if (type === 'paragraph') html += text ? `<p>${text}</p>` : ''
        else if (type === 'heading_1') html += `<h2>${text}</h2>`
        else if (type === 'heading_2') html += `<h3>${text}</h3>`
        else if (type === 'heading_3') html += `<h4>${text}</h4>`
        else if (type === 'quote') html += `<blockquote>${text}</blockquote>`
        else if (type === 'divider') html += '<hr />'
        else if (type === 'code') html += `<pre><code>${escapeHtml(richTextToPlain(data.rich_text))}</code></pre>`
        else if (type === 'image') html += `<img src="/api/blog/image/${block.id}" alt="" loading="lazy" />`
    }
    flushList()

    return { html, wordCount }
}

export function estimateReadingTime(wordCount: number): number {
    return Math.max(1, Math.round(wordCount / 200))
}
