
import { Client } from '@notionhq/client'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    // Validate configuration
    if (!config.notionApiKey || !config.notionDatabaseId) {
        console.error('Notion API Key or Database ID is missing in server config.')
        throw createError({
            statusCode: 500,
            message: 'Server configuration error. Please contact support.'
        })
    }

    // Validate body
    if (!body.email || !body.name) {
        throw createError({
            statusCode: 400,
            message: 'Name and Email are required.'
        })
    }

    const notion = new Client({ auth: config.notionApiKey })

    try {
        const response = await notion.pages.create({
            parent: { database_id: config.notionDatabaseId },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: body.name,
                            },
                        },
                    ],
                },
                Email: {
                    email: body.email,
                },
                Company: {
                    rich_text: [
                        {
                            text: {
                                content: body.company || 'N/A',
                            },
                        },
                    ],
                },
                Role: {
                    rich_text: [
                        {
                            text: {
                                content: body.role ? body.role.charAt(0).toUpperCase() + body.role.slice(1) : 'Other',
                            },
                        },
                    ],
                },
                Interest: {
                    multi_select: [
                        {
                            name: body.interestType || 'Other',
                        }
                    ],
                },
                Message: {
                    rich_text: [
                        {
                            text: {
                                content: body.message || '',
                            },
                        },
                    ],
                },
                Date: {
                    date: {
                        start: new Date().toISOString(),
                    },
                },
            },
        })

        return { success: true, id: response.id }
    } catch (error: any) {
        console.error('Notion API Error:', error)
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to submit to Notion.'
        })
    }
})
