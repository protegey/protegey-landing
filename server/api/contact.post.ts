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
    if (!body.email || !body.name || !body.message || !body.country) {
        throw createError({
            statusCode: 400,
            message: 'Name, Email, Message, and Country are required.'
        })
    }

    const notion = new Client({ auth: config.notionApiKey })
    const mailtrap = config.mailtrapToken ? new MailtrapClient({ token: config.mailtrapToken }) : null

    try {
        // Helper to truncate text to Notion limits (2000 chars)
        const truncate = (str: string, length: number = 2000) => (str || '').substring(0, length)

        const response = await notion.pages.create({
            parent: { database_id: config.notionDatabaseId },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: truncate(body.name),
                            },
                        },
                    ],
                },
                Email: {
                    email: body.email,
                },
                Phone: {
                    phone_number: body.phone || null,
                },
                Country: {
                    rich_text: [
                        {
                            text: {
                                content: truncate(body.country),
                            },
                        },
                    ],
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
                                content: truncate(body.message),
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
                const lang = body.lang || 'en'
                const emailContent = getEmailContent(lang, body.name, body.message)

                await mailtrap.send({
                    from: { name: 'Protegey Inc.', email: 'no-reply@mail.protegey.com' },
                    to: [{ email: body.email }],
                    subject: emailContent.subject,
                    html: emailContent.html
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

function getEmailContent(lang: string, name: string, message: string) {
    if (lang === 'fr') {
        return {
            subject: "Merci d'avoir contacté Protegey",
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">Bonjour ${name},</h2>
                    
                    <p>Nous vous remercions de nous avoir contactés. Nous avons bien reçu votre message et nous reviendrons vers vous dans les plus brefs délais.</p>
                    
                    <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <strong style="color: #1a365d; display: block; margin-bottom: 10px;">Rappel de votre message :</strong>
                        <p style="margin: 0; font-style: italic; color: #4a5568;">"${message}"</p>
                    </div>
                    
                    <p style="margin-top: 30px;">
                        Cordialement,<br><br>
                        <strong>Lamyaa Chaibni</strong><br>
                        Senior Account Manager<br>
                        <strong>PROTEGEY</strong>
                    </p>
                </div>
            `
        }
    } else if (lang === 'ar') {
        return {
            subject: "شكراً لتواصلكم مع بروتجي",
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; direction: rtl; text-align: right;">
                    <h2 style="color: #1a365d;">مرحباً ${name}،</h2>
                    
                    <p>نشكركم على تواصلكم معنا. لقد استلمنا رسالتكم وسنعود إليكم في أقرب وقت ممكن.</p>
                    
                    <div style="background-color: #f7fafc; padding: 20px; border-right: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <strong style="color: #1a365d; display: block; margin-bottom: 10px;">تذكير برسالتكم:</strong>
                        <p style="margin: 0; font-style: italic; color: #4a5568;">"${message}"</p>
                    </div>
                    
                    <p style="margin-top: 30px;">
                        مع خالص التحيات،<br><br>
                        <strong>Lamyaa Chaibni</strong><br>
                        Senior Account Manager<br>
                        <strong>PROTEGEY</strong>
                    </p>
                </div>
            `
        }
    } else {
        // English (Default)
        return {
            subject: "Thank you for contacting Protegey",
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">Hello ${name},</h2>
                    
                    <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
                    
                    <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <strong style="color: #1a365d; display: block; margin-bottom: 10px;">Copy of your message:</strong>
                        <p style="margin: 0; font-style: italic; color: #4a5568;">"${message}"</p>
                    </div>
                    
                    <p style="margin-top: 30px;">
                        Sincerely,<br><br>
                        <strong>Lamyaa Chaibni</strong><br>
                        Senior Account Manager<br>
                        <strong>PROTEGEY</strong>
                    </p>
                </div>
            `
        }
    }
}
