import { Client } from '@notionhq/client'
import { Resend } from 'resend'

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
    const resend = config.resendApiKey ? new Resend(config.resendApiKey) : null

    try {
        // Check for duplicates
        // Use manual fetch because SDK notion.databases.query is missing/broken in this environment
        const existing: any = await $fetch(`https://api.notion.com/v1/databases/${config.notionDatabaseId}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.notionApiKey}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: {
                filter: {
                    property: 'Email',
                    email: {
                        equals: body.email
                    }
                }
            }
        })

        if (existing.results && existing.results.length > 0) {
            return {
                success: true,
                message: 'You are already on the waitlist!',
                id: existing.results[0].id,
                isDuplicate: true
            }
        }

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
                    multi_select: [
                        {
                            name: body.role ? body.role.charAt(0).toUpperCase() + body.role.slice(1) : 'Other',
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

        // Send Confirmation Email
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'Protegey <hello@protegey.com>', // Use resend default for testing, user should update
                    to: body.email,
                    subject: 'Welcome to the Protegey Demo Waitlist',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h1>Welcome to Protegey!</h1>
                            <p>Hi ${body.name},</p>
                            <p>Thanks for requesting access to Protegey. We've received your request and have added you to our priority waitlist.</p>
                            <p>We'll be in touch soon with next steps.</p>
                            <br/>
                            <p>Best regards,</p>
                            <p>The Protegey Team</p>
                        </div>
                    `
                })
            } catch (emailError) {
                console.error('Failed to send confirmation email:', emailError)
                // correct - we don't want to fail the whole request if email fails
            }
        }

        return { success: true, id: response.id }
    } catch (error: any) {
        console.error('Notion API Error:', error)
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to submit to Notion.'
        })
    }
})
