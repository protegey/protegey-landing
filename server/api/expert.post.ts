import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
    rateLimit(event, { max: 3, windowMs: 10 * 60_000 })

    const config = useRuntimeConfig()
    const body = await readBody(event)

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

    const resend = config.resendApiKey ? new Resend(config.resendApiKey as string) : null

    if (resend) {
        try {
            const lang = body.lang || 'fr'
            const emailContent = getEmailContent(lang, body.name)

            await resend.emails.send({
                from: 'PROTEGEY <no-reply@protegey.com>',
                to: [body.email],
                subject: emailContent.subject,
                html: emailContent.html
            })
        } catch (emailError) {
            console.error('Failed to send expert consultation confirmation email via Resend:', emailError)
        }

        try {
            await resend.emails.send({
                from: 'Protegey Website <notifications@protegey.com>',
                to: ['hello@protegey.com'],
                replyTo: body.email,
                subject: `New expert consultation request: ${body.name}`,
                html: buildInternalNotificationHtml(body),
            })
        } catch (notifyError) {
            console.error('Failed to send internal notification email via Resend:', notifyError)
        }
    }

    return { success: true, message: 'Thank you for your request! Our experts will contact you within 24 hours.' }
})

function buildInternalNotificationHtml(body: any): string {
    const row = (label: string, value?: string) =>
        value ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#111827;font-size:13px;">${escapeHtml(value)}</td></tr>` : ''

    return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #111827;">
            <h2 style="font-size: 16px; margin-bottom: 16px;">New expert consultation request</h2>
            <table style="border-collapse: collapse; width: 100%;">
                ${row('Name', body.name)}
                ${row('Email', body.email)}
                ${row('Phone', body.phone)}
                ${row('Country', body.country)}
                ${row('Company', body.company)}
                ${row('Role', body.role)}
                ${row('Topic', body.topic)}
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
            subject: 'طلب استشارة خبير - PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; direction: rtl; text-align: right;">
                    <h2 style="color: #1a365d;">مرحباً ${safeName}،</h2>

                    <p>شكراً لاهتمامكم بـ PROTEGEY. لقد استلمنا طلب الاستشارة الخاص بكم وسيقوم خبراؤنا بمعالجته بسرعة.</p>

                    <p>سيتواصل معكم أحد أعضاء فريق الخبراء خلال <strong>24 ساعة</strong> لمناقشة احتياجاتكم المحددة في مجال منع الاحتيال.</p>

                    <p>إذا كانت لديكم أي أسئلة عاجلة، لا تترددوا في التواصل معنا مباشرة على <a href="mailto:experts@protegey.com" style="color: #1a365d; text-decoration: underline;">experts@protegey.com</a></p>

                    <p style="margin-top: 30px;">
                        مع خالص التحيات،<br><br>
                        <strong>فريق PROTEGEY</strong><br>
                        خبراء منع الاحتيال
                    </p>
                </div>
            `
        }
    } else {
        // English (Default)
        return {
            subject: 'Your Expert Consultation Request - PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">Hello ${safeName},</h2>

                    <p>Thank you for your interest in PROTEGEY. We have received your consultation request and our experts will process it promptly.</p>

                    <p>A member of our expert team will contact you within <strong>24 hours</strong> to discuss your specific fraud prevention needs.</p>

                    <p>If you have any urgent questions, please feel free to contact us directly at <a href="mailto:experts@protegey.com" style="color: #1a365d; text-decoration: underline;">experts@protegey.com</a></p>

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
