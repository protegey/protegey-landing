import { Client } from '@notionhq/client'
import { MailtrapClient } from 'mailtrap'

export default defineEventHandler(async (event) => {
    rateLimit(event, { max: 3, windowMs: 10 * 60_000 })

    const config = useRuntimeConfig()
    const body = await readBody(event)

    if (!config.notionApiKey || !config.notionDatabaseId) {
        console.error('Notion API Key or Database ID is missing in server config.')
        throw createError({
            statusCode: 500,
            message: 'Server configuration error. Please contact support.'
        })
    }

    if (!body.email || !body.name) {
        throw createError({
            statusCode: 400,
            message: 'Name and Email are required.'
        })
    }

    if (!body.topic) {
        throw createError({
            statusCode: 400,
            message: 'Please select a topic.'
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
        throw createError({ statusCode: 400, message: 'Invalid email address.' })
    }

    const notion = new Client({ auth: config.notionApiKey })
    const mailtrap = config.mailtrapToken ? new MailtrapClient({ token: config.mailtrapToken }) : null

    try {
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

        const sanitizeOption = (val: string) => (val || '').replace(/,/g, '').substring(0, 100)
        const truncate = (str: string, length: number = 2000) => (str || '').substring(0, length)

        const response = await notion.pages.create({
            parent: { database_id: config.notionDatabaseId },
            properties: {
                Name: {
                    title: [{ text: { content: truncate(body.name) } }]
                },
                Email: { email: body.email },
                Phone: { phone_number: body.phone || null },
                Country: {
                    rich_text: [{ text: { content: truncate(body.country || 'N/A') } }]
                },
                Company: {
                    rich_text: [{ text: { content: truncate(body.company || 'N/A') } }]
                },
                Role: {
                    multi_select: [{ name: sanitizeOption(body.role || 'N/A') }]
                },
                'Pain Points': {
                    multi_select: [{ name: sanitizeOption(body.topic) }]
                },
                Message: {
                    rich_text: [{ text: { content: truncate(body.message || 'N/A') } }]
                },
                Interest: {
                    multi_select: [{ name: 'Expert Consultation' }]
                },
                Date: {
                    date: { start: new Date().toISOString() }
                },
            },
        })

        if (mailtrap) {
            try {
                const lang = body.lang || 'fr'
                const emailContent = getEmailContent(lang, body.name)

                await mailtrap.send({
                    from: { name: 'PROTEGEY.', email: 'no-reply@mail.protegey.com' },
                    to: [{ email: body.email }],
                    subject: emailContent.subject,
                    html: emailContent.html
                })
            } catch (emailError) {
                console.error('Failed to send expert consultation confirmation email:', emailError)
            }
        }

        return { success: true, message: 'Thank you for your request! Our experts will contact you within 24 hours.' }
    } catch (error: any) {
        console.error('Notion API Error (Expert):', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to submit. Please try again later.'
        })
    }
})

function escapeHtml(str: string): string {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
}

function getEmailContent(lang: string, name: string) {
    const safeName = escapeHtml(name)

    if (lang === 'fr') {
        return {
            subject: 'Votre demande de consultation expert - PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">Bonjour ${safeName},</h2>
                    
                    <p>Merci pour votre intérêt envers PROTEGEY. Nous avons bien reçu votre demande de consultation et nos experts vont la traiter rapidement.</p>
                    
                    <p>Un membre de notre équipe expert vous contactera dans les <strong>24 heures</strong> pour discuter de vos besoins spécifiques en matière de prévention de la fraude.</p>
                    
                    <p>Si vous avez des questions urgentes, n'hésitez pas à nous contacter directement à l'adresse <a href="mailto:experts@protegey.com" style="color: #1a365d; text-decoration: underline;">experts@protegey.com</a></p>
                    
                    <p style="margin-top: 30px;">
                        Cordialement,<br><br>
                        <strong>Équipe PROTEGEY</strong><br>
                        Experts en Prévention de la Fraude
                    </p>
                </div>
            `
        }
    } else if (lang === 'ar') {
        return {
            subject: 'طلب استشارة الخبير الخاص بك - PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; direction: rtl; text-align: right;">
                    <h2 style="color: #1a365d;">مرحباً ${safeName}،</h2>
                    
                    <p>شكراً لاهتمامكم بـ PROTEGEY. لقد استلمنا طلب الاستشارة الخاص بكم وسيتولى خبراؤنا معالجته بسرعة.</p>
                    
                    <p>سيتواصل أحد أعضاء فريق الخبراء معنا خلال <strong>24 ساعة</strong> لمناقشة احتياجاتكم المحددة في مجال منع الاحتيال.</p>
                    
                    <p>إذا كانت لديكم أسئلة عاجلة، لا تترددوا في التواصل معنا على <a href="mailto:experts@protegey.com" style="color: #1a365d; text-decoration: underline;">experts@protegey.com</a></p>
                    
                    <p style="margin-top: 30px;">
                        مع خالص التحيات،<br><br>
                        <strong>فريق PROTEGEY</strong><br>
                        خبراء منع الاحتيال
                    </p>
                </div>
            `
        }
    } else {
        return {
            subject: 'Your Expert Consultation Request - PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">Hello ${safeName},</h2>
                    
                    <p>Thank you for your interest in PROTEGEY. We have received your consultation request and our experts will process it promptly.</p>
                    
                    <p>A member of our expert team will reach out to you within <strong>24 hours</strong> to discuss your specific fraud prevention needs.</p>
                    
                    <p>If you have any urgent questions, feel free to contact us at <a href="mailto:experts@protegey.com" style="color: #1a365d; text-decoration: underline;">experts@protegey.com</a></p>
                    
                    <p style="margin-top: 30px;">
                        Sincerely,<br><br>
                        <strong>PROTEGEY Team</strong><br>
                        Fraud Prevention Experts
                    </p>
                </div>
            `
        }
    }
}
