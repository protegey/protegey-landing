import { Client } from '@notionhq/client'
import { MailtrapClient } from 'mailtrap'

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
    if (!body.email || !body.name || !body.message) {
        throw createError({
            statusCode: 400,
            message: 'Name, Email and Message are required.'
        })
    }

    const notion = new Client({ auth: config.notionApiKey })
    const mailtrap = config.mailtrapToken ? new MailtrapClient({ token: config.mailtrapToken }) : null

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
                Interest: {
                    multi_select: [
                        {
                            name: 'Contact Form',
                        }
                    ],
                },
                Message: {
                    rich_text: [
                        {
                            text: {
                                content: body.message,
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

        // Send Notification Email via Mailtrap
        if (mailtrap) {
            try {
                await mailtrap.send({
                    from: { name: 'Protegey Inc.', email: 'no-reply@mail.protegey.com' },
                    to: [{ email: body.email }],
                    subject: "Merci d'avoir contacté Protegey",
                    html: `
                        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                            <h2 style="color: #1a365d;">Bonjour ${body.name},</h2>
                            
                            <p>Nous vous remercions de nous avoir contactés. Nous avons bien reçu votre message et nous reviendrons vers vous dans les plus brefs délais.</p>
                            
                            <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                                <strong style="color: #1a365d; display: block; margin-bottom: 10px;">Rappel de votre message :</strong>
                                <p style="margin: 0; font-style: italic; color: #4a5568;">"${body.message}"</p>
                            </div>
                            
                            <p style="margin-top: 30px;">
                                Cordialement,<br>
                                <strong>L’équipe PROTEGEY</strong>
                            </p>
                        </div>
                    `
                })
            } catch (emailError) {
                console.error('Failed to send contact confirmation email via Mailtrap:', emailError)
            }
        }

        return { success: true, id: response.id }
    } catch (error: any) {
        console.error('Notion API Error (Contact):', error)
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to submit contact form.'
        })
    }
})
