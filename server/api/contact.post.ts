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

    const resend = config.resendApiKey ? new Resend(config.resendApiKey as string) : null

    if (resend) {
        try {
            const lang = body.lang || 'fr'
            const emailContent = getEmailContent(lang, body.name, body.message)

            await resend.emails.send({
                from: 'PROTEGEY <no-reply@assistance.protegey.com>',
                to: [body.email],
                subject: emailContent.subject,
                html: emailContent.html
            })
        } catch (emailError) {
            console.error('Failed to send contact confirmation email via Resend:', emailError)
        }

        try {
            await resend.emails.send({
                from: 'Protegey Website <notifications@assistance.protegey.com>',
                to: ['hello@protegey.com'],
                replyTo: body.email,
                subject: `New contact form submission: ${body.name}`,
                html: buildInternalNotificationHtml(body),
            })
        } catch (notifyError) {
            console.error('Failed to send internal notification email via Resend:', notifyError)
        }
    }

    return { success: true }
})

function buildInternalNotificationHtml(body: any): string {
    const row = (label: string, value?: string) =>
        value ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#111827;font-size:13px;">${escapeHtml(value)}</td></tr>` : ''

    return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #111827;">
            <h2 style="font-size: 16px; margin-bottom: 16px;">New contact form submission</h2>
            <table style="border-collapse: collapse; width: 100%;">
                ${row('Name', body.name)}
                ${row('Email', body.email)}
                ${row('Phone', body.phone)}
                ${row('Country', body.country)}
                ${row('Message', body.message)}
                ${row('Language', body.lang)}
            </table>
        </div>
    `
}

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
