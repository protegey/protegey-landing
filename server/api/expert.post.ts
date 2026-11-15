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
                from: 'PROTEGEY <no-reply@assistance.protegey.com>',
                to: [body.email],
                subject: emailContent.subject,
                html: emailContent.html
            })
        } catch (emailError) {
            console.error('Failed to send expert consultation confirmation email via Resend:', emailError)
        }

        try {
            await resend.emails.send({
                from: 'Protegey Website <notifications@assistance.protegey.com>',
                to: ['sales@protegey.com'],
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
            subject: 'Votre demande de démonstration - PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <p>Cher/Chère ${safeName},</p>

                    <p>Nous vous remercions de l'intérêt que vous portez à PROTEGEY; nous sommes ravis que vous envisagiez d'utiliser notre plateforme.</p>

                    <p>Un membre de notre équipe prendra contact avec vous prochainement afin de convenir d'une brève démonstration de notre solution. Au cours de cet échange, nous vous présenterons comment PROTEGEY peut contribuer à renforcer vos activités liées à la gestion des risques et à la conformité.</p>

                    <p>Dans l'attente d'échanger avec vous,</p>

                    <p style="margin-top: 30px;">
                        Bien cordialement,<br><br>
                        <strong>Marie</strong><br>
                        Responsable grands comptes (Senior Account Manager)<br>
                        PROTEGEY Inc.
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
            subject: 'Your Demo Request - PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <p>Dear ${safeName},</p>

                    <p>Thank you for your interest in PROTEGEY, we truly appreciate you considering our platform.</p>

                    <p>A member of our team will be reaching out shortly to schedule a brief product demonstration. During this session, we will walk you through how PROTEGEY can support in strengthening your risk and compliance operations.</p>

                    <p>We look forward to speaking with you soon.</p>

                    <p style="margin-top: 30px;">
                        Warm regards,<br><br>
                        <strong>Marie</strong><br>
                        Senior Account Manager<br>
                        PROTEGEY Inc.
                    </p>
                </div>
            `
        }
    }
}
