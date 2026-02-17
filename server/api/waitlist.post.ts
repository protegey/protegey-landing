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
    if (!body.email || !body.name || !body.country) {
        throw createError({
            statusCode: 400,
            message: 'Name, Email, and Country are required.'
        })
    }

    const notion = new Client({ auth: config.notionApiKey })
    const mailtrap = config.mailtrapToken ? new MailtrapClient({ token: config.mailtrapToken }) : null

    try {
        // ... Check for duplicates logic ...
        // (existing code remains same)
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

        // Helper to sanitize multi-select options (remove commas and truncate to 100 chars)
        const sanitizeOption = (val: string) => (val || '').replace(/,/g, '').substring(0, 100)

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
                Company: {
                    rich_text: [
                        {
                            text: {
                                content: truncate(body.company || 'N/A'),
                            },
                        },
                    ],
                },
                Role: {
                    multi_select: [
                        {
                            name: sanitizeOption(body.role ? body.role : 'Other'),
                        },
                    ],
                },
                'Business Model': {
                    multi_select: body.businessModel ? [{ name: sanitizeOption(body.businessModel) }] : [],
                },
                'Stage': {
                    multi_select: body.stage ? [{ name: sanitizeOption(body.stage) }] : [],
                },
                'Sector': {
                    multi_select: body.sector ? [{ name: sanitizeOption(body.sector) }] : [],
                },
                'Pain Points': {
                    multi_select: (Array.isArray(body.painPoints) ? body.painPoints : []).map((p: string) => ({ name: sanitizeOption(String(p)) })),
                },
                'Other Pain Point': {
                    rich_text: [
                        {
                            text: {
                                content: truncate(body.otherPainPoint || ''),
                            },
                        },
                    ],
                },
                Interest: {
                    multi_select: [
                        {
                            name: sanitizeOption(body.interestType || 'Other'),
                        },
                    ],
                },
                Message: {
                    rich_text: [
                        {
                            text: {
                                content: truncate(body.message || ''),
                            },
                        },
                    ],
                },
                Date: {
                    date: {
                        start: new Date().toISOString(),
                    },
                },
                Title: {
                    rich_text: [
                        {
                            text: {
                                content: body.title || 'N/A',
                            },
                        },
                    ],
                },
            },
        })

        // Send Confirmation Email via Mailtrap
        if (mailtrap) {
            try {
                const lang = body.lang || 'fr'
                const emailContent = getEmailContent(lang, body.name, body.title)

                await mailtrap.send({
                    from: { name: 'PROTEGEY.', email: 'no-reply@mail.protegey.com' },
                    to: [{ email: body.email }],
                    subject: emailContent.subject,
                    html: emailContent.html
                })
            } catch (emailError) {
                console.error('Failed to send confirmation email via Mailtrap:', emailError)
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

function getEmailContent(lang: string, name: string, title?: string) {
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
                    
                    <p>Cette session nous permettra de vous présenter de manière détaillée les fonctionnalités de PROTEGEY ainsi que ses cas d’usage adaptés à votre environnement opérationnel. La plateforme accompagne notamment ses partenaires dans les domaines suivants :</p>
                    
                    <ul style="margin: 20px 0; padding-left: 20px;">
                        <li>Monitoring des transactions et filtrage LBC/FT (AML)</li>
                        <li>Gestion des cas et reporting réglementaire</li>
                        <li>Scoring de risque et automatisation des processus décisionnels</li>
                        <li>Filtrage des sanctions et surveillance des médias défavorables</li>
                        <li>Détection de fraude et gestion des risques liés à l’identité</li>
                    </ul>

                    <p>Cette démonstration sera également l’occasion de mieux comprendre vos enjeux spécifiques en matière de risque, de conformité et de sécurité financière, afin d’évaluer ensemble les modalités de collaboration les plus adaptées.</p>

                    <p>Pour toute question préalable, nous restons à votre disposition à l’adresse suivante : <a href="mailto:partners@protegey.com" style="color: #1a365d; text-decoration: underline;">partners@protegey.com</a></p>

                    <p>Nous serons ravis d’échanger avec vous très prochainement.</p>
                    
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
