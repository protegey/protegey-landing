import { Client } from '@notionhq/client'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
    // 3 submissions per IP per 10 minutes
    rateLimit(event, { max: 3, windowMs: 10 * 60_000 })

    const config = useRuntimeConfig()
    const body = await readBody(event)

    // Validate body
    if (!body.email || !body.name || !body.message || !body.country) {
        throw createError({
            statusCode: 400,
            message: 'Name, Email, Message, and Country are required.'
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
        throw createError({ statusCode: 400, message: 'Invalid email address.' })
    }

    const notionConfigured = !!(config.notionApiKey && config.notionDatabaseId)
    const resend = config.resendApiKey ? new Resend(config.resendApiKey as string) : null

    let notionPageId: string | null = null
    let isDuplicate = false

    if (notionConfigured) {
        try {
            const notion = new Client({ auth: config.notionApiKey as string })

            // Check for duplicate submissions by email
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
                        email: { equals: body.email }
                    }
                }
            })

            if (existing.results && existing.results.length > 0) {
                notionPageId = existing.results[0].id
                isDuplicate = true
            } else {
                // Helper to truncate text to Notion limits (2000 chars)
                const truncate = (str: string, length: number = 2000) => (str || '').substring(0, length)

                const response = await notion.pages.create({
                    parent: { database_id: config.notionDatabaseId as string },
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
                notionPageId = response.id
            }
        } catch (error: any) {
            console.error('Notion API error (contact form will still be emailed):', error)
        }
    } else {
        console.warn('Notion is not configured — skipping the contact database write, emails will still be sent.')
    }

    if (!isDuplicate && resend) {
        try {
            const lang = body.lang || 'fr'
            const emailContent = getEmailContent(lang, body.name, body.message)

            await resend.emails.send({
                from: 'PROTEGEY <no-reply@protegey.com>',
                to: [body.email],
                subject: emailContent.subject,
                html: emailContent.html
            })
        } catch (emailError) {
            console.error('Failed to send contact confirmation email via Resend:', emailError)
        }
    }

    return { success: true, id: notionPageId, isDuplicate }
})

function escapeHtml(str: string): string {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
}

function getEmailContent(lang: string, name: string, message: string) {
    const safeName = escapeHtml(name)
    const safeMessage = escapeHtml(message)
    if (lang === 'fr') {
        return {
            subject: "Merci d'avoir contacté Protegey",
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">Bonjour ${safeName},</h2>
                    
                    <p>Nous vous remercions de nous avoir contactés. Nous avons bien reçu votre message et nous reviendrons vers vous dans les plus brefs délais.</p>
                    
                    <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <strong style="color: #1a365d; display: block; margin-bottom: 10px;">Rappel de votre message :</strong>
                        <p style="margin: 0; font-style: italic; color: #4a5568;">"${safeMessage}"</p>
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
                    <h2 style="color: #1a365d;">مرحباً ${safeName}،</h2>
                    
                    <p>نشكركم على تواصلكم معنا. لقد استلمنا رسالتكم وسنعود إليكم في أقرب وقت ممكن.</p>
                    
                    <div style="background-color: #f7fafc; padding: 20px; border-right: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <strong style="color: #1a365d; display: block; margin-bottom: 10px;">تذكير برسالتكم:</strong>
                        <p style="margin: 0; font-style: italic; color: #4a5568;">"${safeMessage}"</p>
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
                    <h2 style="color: #1a365d;">Hello ${safeName},</h2>
                    
                    <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
                    
                    <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <strong style="color: #1a365d; display: block; margin-bottom: 10px;">Copy of your message:</strong>
                        <p style="margin: 0; font-style: italic; color: #4a5568;">"${safeMessage}"</p>
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
