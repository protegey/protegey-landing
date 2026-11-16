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

/**
 * Shared branded shell (logo + navy header, white card, footer) — same colors/markup as the
 * backend's transactional emails (src/mail/templates/*.hbs in protegey-backend): #0B1741 header,
 * #0CB99E accent, same S3-hosted logo. protegey-landing has no template engine, so this is plain
 * string interpolation instead of a Handlebars partial.
 */
function wrapBrandedEmail(bodyHtml: string, dir: 'ltr' | 'rtl' = 'ltr'): string {
    const align = dir === 'rtl' ? 'right' : 'left'
    return `
        <!doctype html>
        <html lang="${dir === 'rtl' ? 'ar' : 'en'}" dir="${dir}">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>PROTEGEY</title>
          </head>
          <body style="margin:0;padding:0;background-color:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F4F6;padding:32px 16px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(16,24,40,0.08);">
                    <tr>
                      <td style="background-color:#0B1741;padding:24px 32px;">
                        <img src="https://protegey-bucket.s3.eu-north-1.amazonaws.com/public/constant/protegey_logo.svg"
                             alt="PROTEGEY" height="28" style="display:block;height:28px;width:auto;border:0;" />
                      </td>
                    </tr>
                    <tr>
                      <td dir="${dir}" style="padding:36px 32px 8px;text-align:${align};">
                        ${bodyHtml}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 32px 28px;border-top:1px solid #E5E7EB;text-align:${align};">
                        <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
                          &copy; ${new Date().getFullYear()} PROTEGEY Inc. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
    `
}

function getEmailContent(lang: string, name: string) {
    const safeName = escapeHtml(name)

    if (lang === 'fr') {
        return {
            subject: 'Votre demande de démonstration - PROTEGEY',
            html: wrapBrandedEmail(`
                <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0B1741;line-height:1.3;">Demande de démonstration reçue</h1>
                <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">Cher/Chère ${safeName},</p>

                <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">Nous vous remercions de l'intérêt que vous portez à PROTEGEY ; nous sommes ravis que vous envisagiez d'utiliser notre plateforme.</p>

                <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">Un membre de notre équipe prendra contact avec vous prochainement afin de convenir d'une brève démonstration de notre solution. Au cours de cet échange, nous vous présenterons comment PROTEGEY peut contribuer à renforcer vos activités liées à la gestion des risques et à la conformité.</p>

                <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">Dans l'attente d'échanger avec vous,</p>

                <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;">
                    Bien cordialement,<br><br>
                    <strong>Marie</strong><br>
                    Responsable grands comptes (Senior Account Manager)<br>
                    PROTEGEY Inc.
                </p>
            `)
        }
    } else if (lang === 'ar') {
        return {
            subject: 'طلب العرض التوضيحي الخاص بكم - PROTEGEY',
            html: wrapBrandedEmail(`
                <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0B1741;line-height:1.3;">تم استلام طلب العرض التوضيحي</h1>
                <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">عزيزي/عزيزتي ${safeName}،</p>

                <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">نشكركم على اهتمامكم بـ PROTEGEY؛ يسعدنا أن تفكروا في استخدام منصتنا.</p>

                <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">سيتواصل معكم أحد أعضاء فريقنا قريباً لتحديد موعد لعرض توضيحي موجز لحلّنا. خلال هذا التبادل، سنوضح لكم كيف يمكن لـ PROTEGEY أن يسهم في تعزيز أنشطتكم المتعلقة بإدارة المخاطر والامتثال.</p>

                <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">بانتظار التواصل معكم،</p>

                <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;">
                    مع أطيب التحيات،<br><br>
                    <strong>ماري</strong><br>
                    مسؤولة الحسابات الكبرى (Senior Account Manager)<br>
                    PROTEGEY Inc.
                </p>
            `, 'rtl')
        }
    } else {
        // English (Default)
        return {
            subject: 'Your Demo Request - PROTEGEY',
            html: wrapBrandedEmail(`
                <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0B1741;line-height:1.3;">Demo request received</h1>
                <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">Dear ${safeName},</p>

                <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">Thank you for your interest in PROTEGEY, we truly appreciate you considering our platform.</p>

                <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">A member of our team will be reaching out shortly to schedule a brief product demonstration. During this session, we will walk you through how PROTEGEY can support in strengthening your risk and compliance operations.</p>

                <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">We look forward to speaking with you soon.</p>

                <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;">
                    Warm regards,<br><br>
                    <strong>Marie</strong><br>
                    Senior Account Manager<br>
                    PROTEGEY Inc.
                </p>
            `)
        }
    }
}
