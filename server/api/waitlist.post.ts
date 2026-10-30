import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
    // 5 submissions per IP per 10 minutes
    rateLimit(event, { max: 5, windowMs: 10 * 60_000 })

    const config = useRuntimeConfig()
    const body = await readBody(event)

    // Validate body
    if (!body.email || !body.name || !body.country) {
        throw createError({
            statusCode: 400,
            message: 'Name, Email, and Country are required.'
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
            const emailContent = getEmailContent(lang, body.name, body.title)

            await resend.emails.send({
                from: 'PROTEGEY <no-reply@assistance.protegey.com>',
                to: [body.email],
                subject: emailContent.subject,
                html: emailContent.html
            })
        } catch (emailError) {
            console.error('Failed to send confirmation email via Resend:', emailError)
        }

        try {
            await resend.emails.send({
                from: 'Protegey Website <notifications@assistance.protegey.com>',
                to: ['sales@protegey.com'],
                replyTo: body.email,
                subject: 'New Demo Request submission',
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
            <h2 style="font-size: 16px; margin-bottom: 16px;">New waitlist submission</h2>
            <table style="border-collapse: collapse; width: 100%;">
                ${row('Name', body.name)}
                ${row('Email', body.email)}
                ${row('Company', body.company)}
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

function getEmailContent(lang: string, name: string, title?: string) {
    name = escapeHtml(name)
    if (title) title = escapeHtml(title)
    let greetingName = name
    if (title) {
        if (lang === 'fr') {
            const titleMap: Record<string, string> = {
                'Mr.': 'Monsieur',
                'Mrs.': 'Madame',
                'Ms.': 'Madame',
                'Dr.': 'Docteur'
            }
            greetingName = `${titleMap[title] || title} ${name}`
        } else {
            greetingName = `${title} ${name}`
        }
    }

    if (lang === 'fr') {
        const titleFr = title === 'Mr.' ? 'Monsieur' : (title === 'Mrs.' || title === 'Ms.' ? 'Madame' : title || 'Monsieur/Madame');
        return {
            subject: 'Merci pour l’intérêt porté à PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d; font-size: 18px; margin-bottom: 20px;">Bonjour ${titleFr} ${name},</h2>

                    <p>Nous vous remercions pour l’intérêt porté à PROTEGEY et pour la confiance que vous nous témoignez.</p>

                    <p>Un membre de notre équipe prendra contact avec vous dans les plus brefs délais afin d’organiser une démonstration personnalisée de la plateforme.</p>

                    <p>Pour toute question préalable, nous restons à votre disposition à l’adresse suivante : <a href="mailto:sales@protegey.com" style="color: #1a365d; text-decoration: underline;">sales@protegey.com</a></p>

                    <p>Nous serons ravis d’échanger avec vous très prochainement.</p>

                    <p style="margin-top: 30px;">
                        Cordialement,<br><br>
                        <strong>Équipe Commerciale</strong><br>
                        <strong>PROTEGEY Inc.</strong>
                    </p>
                </div>
            `
        }
    } else if (lang === 'ar') {
        let greetingNameAr = name
        if (title) {
            const titleMapAr: Record<string, string> = {
                'Mr.': 'السيد',
                'Mrs.': 'السيدة',
                'Ms.': 'السيدة',
                'Dr.': 'الدكتور'
            }
            greetingNameAr = `${titleMapAr[title] || title} ${name}`
        }
        return {
            subject: 'شكراً لاهتمامكم بـ PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; direction: rtl; text-align: right;">
                    <h2 style="color: #1a365d; font-size: 18px; margin-bottom: 20px;">عزيزي/عزيزتي ${greetingNameAr}،</h2>

                    <p>نشكركم على اهتمامكم بـ PROTEGEY — نحن نقدر حقاً اهتمامكم بمنصتنا.</p>

                    <p>سيقوم أحد أعضاء فريقنا بالتواصل معكم قريباً لتحديد موعد لعرض توضيحي موجز للمنتج. خلال هذه الجلسة، سنوضح لكم كيف يمكن لـ PROTEGEY دعم عملياتكم في مجالات مثل:</p>

                    <ul style="margin: 20px 0; padding-right: 20px;">
                        <li>مراقبة المعاملات وفحص مكافحة غسل الأموال (AML)</li>
                        <li>إدارة الحالات والتقارير التنظيمية</li>
                        <li>تقييم المخاطر وأتمتة القرارات</li>
                        <li>فحص العقوبات والوسائط الإعلامية السلبية</li>
                        <li>كشف الاحتيال ومخاطر الهوية</li>
                    </ul>

                    <p>هدفنا هو فهم احتياجاتكم التشغيلية بشكل أفضل وتوضيح كيف يمكن لمنصتنا تعزيز إطار عمل المخاطر والامتثال لديكم بشكل عملي.</p>

                    <p>في هذه الأثناء، إذا كانت لديكم أي أسئلة فورية، فلا تترددوا في الاتصال بنا على <a href="mailto:partners@protegey.com" style="color: #1a365d; text-decoration: underline;">partners@protegey.com</a>.</p>

                    <p>نتطلع إلى التحدث معكم قريباً.</p>

                    <p style="margin-top: 30px;">
                        مع أطيب التحيات،<br><br>
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
            subject: 'Thank you for your interest in PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d; font-size: 18px; margin-bottom: 20px;">Dear ${greetingName},</h2>

                    <p>Thank you for your interest in PROTEGEY — we truly appreciate you considering our platform.</p>

                    <p>A member of our team will be reaching out shortly to schedule a brief product demonstration. During this session, we will walk you through how PROTEGEY can support your operations in areas such as:</p>

                    <ul style="margin: 20px 0; padding-left: 20px;">
                        <li>Transaction Monitoring & AML Screening</li>
                        <li>Case Management & Regulatory Reporting</li>
                        <li>Risk Scoring & Decision Automation</li>
                        <li>Sanctions & Adverse Media Screening</li>
                        <li>Fraud Detection & Identity Risk</li>
                    </ul>

                    <p>Our objective is to better understand your operational needs and demonstrate how our platform can practically strengthen your risk and compliance framework.</p>

                    <p>In the meantime, if you have any immediate questions, please feel free to contact us at <a href="mailto:partners@protegey.com" style="color: #1a365d; text-decoration: underline;">partners@protegey.com</a>.</p>

                    <p>We look forward to speaking with you soon.</p>

                    <p style="margin-top: 30px;">
                        Warm regards,<br><br>
                        <strong>Lamyaa Chaibni</strong><br>
                        Senior Account Manager<br>
                        <strong>PROTEGEY</strong>
                    </p>
                </div>
            `
        }
    }
}
