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
            },
        })

        // Send Confirmation Email via Mailtrap
        if (mailtrap) {
            try {
                const lang = body.lang || 'en'
                const emailContent = getEmailContent(lang, body.name)

                await mailtrap.send({
                    from: { name: 'Protegey Inc.', email: 'no-reply@mail.protegey.com' },
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

function getEmailContent(lang: string, name: string) {
    if (lang === 'fr') {
        return {
            subject: 'Bienvenue dans une nouvelle ère de l’intelligence antifraude en Afrique Francophone et en Afrique du Nord',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h1 style="color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 10px;">Bienvenue chez PROTEGEY</h1>
                    
                    <p>Bonjour <strong>${name}</strong>,</p>
                    
                    <p>Nous vous remercions pour votre demande d’accès à <strong>PROTEGEY</strong>.</p>
                    
                    <p>Votre demande a été dûment enregistrée et vous avez été ajouté à notre liste d’attente prioritaire pour la démonstration. PROTEGEY est une plateforme d’intelligence antifraude, de gestion du risque et de conformité, conçue pour accompagner les régulateurs, les institutions publiques, les banques, les fintechs, les établissements de paiement, les prêteurs digitaux et les plateformes à forte croissance opérant en Afrique Francophone et en Afrique du Nord.</p>
                    
                    <p><strong>PROTEGEY vous permet notamment de :</strong></p>
                    <ul style="padding-left: 20px;">
                        <li style="margin-bottom: 8px;">Lutter efficacement contre les comptes multiples et les fraudes à l’identité.</li>
                        <li style="margin-bottom: 8px;">Détecter de manière anticipée les schémas de fraude et les comportements à risque.</li>
                        <li style="margin-bottom: 8px;">Automatiser le scoring de risque et les processus de décision.</li>
                        <li style="margin-bottom: 8px;">Structurer et piloter les investigations à travers des workflows de gestion de cas traçables.</li>
                        <li style="margin-bottom: 8px;">Renforcer la conformité réglementaire et la préparation aux contrôles et audits.</li>
                    </ul>
                    
                    <p>Notre plateforme a été spécifiquement conçue pour répondre aux exigences réglementaires locales, aux enjeux de sécurité financière, ainsi qu’aux réalités des opérations transfrontalières dans notre région, là où les solutions génériques atteignent rapidement leurs limites.</p>
                    
                    <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin-top: 0;"><strong>Prochaines étapes :</strong></p>
                        <p>Un membre de notre équipe prendra contact avec vous prochainement afin de :</p>
                        <ul style="margin-bottom: 0;">
                            <li style="margin-bottom: 5px;">Organiser une démonstration de la plateforme.</li>
                            <li style="margin-bottom: 5px;">Analyser vos besoins spécifiques en matière de fraude, de risque et de conformité.</li>
                            <li style="margin-bottom: 5px;">Vous présenter les modalités d’accès anticipé ainsi que les conditions tarifaires préférentielles.</li>
                        </ul>
                    </div>

                    <p>Nous serons ravis de vous accompagner dans le renforcement de la sécurité, de la conformité et de la confiance au sein de vos opérations.</p>
                    
                    <p style="margin-top: 30px;">
                        Cordialement,<br>
                        <strong>L’équipe PROTEGEY</strong>
                    </p>
                </div>
            `
        }
    } else if (lang === 'ar') {
        return {
            subject: 'مرحباً بكم في عصر جديد من استخبارات مكافحة الاحتيال في أفريقيا الناطقة بالفرنسية وشمال أفريقيا',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; direction: rtl; text-align: right;">
                    <h1 style="color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 10px;">مرحباً بكم في PROTEGEY</h1>
                    
                    <p>مرحباً <strong>${name}</strong>،</p>
                    
                    <p>نشكركم على طلبكم للوصول إلى <strong>PROTEGEY</strong>.</p>
                    
                    <p>تم تسجيل طلبكم وسنضمكم إلى قائمة الانتظار ذات الأولوية للعرض التوضيحي. PROTEGEY هي منصة لاستخبارات مكافحة الاحتيال وإدارة المخاطر والامتثال، مصممة لدعم المنظمين والمؤسسات العامة والبنوك وشركات التكنولوجيا المالية ومؤسسات الدفع والمقرضين الرقميين والمنصات عالية النمو العاملة في أفريقيا الناطقة بالفرنسية وشمال أفريقيا.</p>
                    
                    <p><strong>تسمح لكم PROTEGEY بما يلي:</strong></p>
                    <ul style="padding-right: 20px;">
                        <li style="margin-bottom: 8px;">مكافحة الحسابات المتعددة واحتيال الهوية بفعالية.</li>
                        <li style="margin-bottom: 8px;">الكشف المبكر عن أنماط الاحتيال والسلوكيات الخطرة.</li>
                        <li style="margin-bottom: 8px;">أتمتة تسجيل المخاطر وعمليات اتخاذ القرار.</li>
                        <li style="margin-bottom: 8px;">هيكلة وتوجيه التحقيقات من خلال سير عمل إدارة الحالات القابلة للتتبع.</li>
                        <li style="margin-bottom: 8px;">تعزيز الامتثال التنظيمي والاستعداد للضوابط وعمليات التدقيق.</li>
                    </ul>
                    
                    <p>تم تصميم منصتنا خصيصاً لتلبية المتطلبات التنظيمية المحلية، وتحديات الأمن المالي، بالإضافة إلى واقع العمليات العابرة للحدود في منطقتنا، حيث تصل الحلول العامة بسرعة إلى حدودها.</p>
                    
                    <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin-top: 0;"><strong>الخطوات التالية:</strong></p>
                        <p>سيتصل بكم أحد أعضاء فريقنا قريباً من أجل:</p>
                        <ul style="margin-bottom: 0; padding-right: 20px;">
                            <li style="margin-bottom: 5px;">تنظيم عرض توضيحي للمنصة.</li>
                            <li style="margin-bottom: 5px;">تحليل احتياجاتكم المحددة في مجال الاحتيال والمخاطر والامتثال.</li>
                            <li style="margin-bottom: 5px;">تقديم شروط الوصول المبكر بالإضافة إلى شروط التسعير التفضيلية.</li>
                        </ul>
                    </div>

                    <p>سنسعد بمرافقتكم في تعزيز الأمن والامتثال والثقة داخل عملياتكم.</p>
                    
                    <p style="margin-top: 30px;">
                        مع خالص التحيات،<br>
                        <strong>فريق PROTEGEY</strong>
                    </p>
                </div>
            `
        }
    } else {
        // English (Default)
        return {
            subject: 'Welcome to a new era of Fraud Intelligence in Africa',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h1 style="color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 10px;">Welcome to PROTEGEY</h1>
                    
                    <p>Hello <strong>${name}</strong>,</p>
                    
                    <p>Thank you for your request to access <strong>PROTEGEY</strong>.</p>
                    
                    <p>Your request has been duly recorded and you have been added to our priority waitlist for the demonstration. PROTEGEY is a Fraud Intelligence, risk management, and compliance platform designed to support regulators, public institutions, banks, fintechs, payment institutions, digital lenders, and high-growth platforms operating in Francophone and Northern Africa.</p>
                    
                    <p><strong>PROTEGEY allows you to:</strong></p>
                    <ul style="padding-left: 20px;">
                        <li style="margin-bottom: 8px;">Effectively fight against multiple accounts and identity fraud.</li>
                        <li style="margin-bottom: 8px;">Detect fraud patterns and risky behaviors in advance.</li>
                        <li style="margin-bottom: 8px;">Automate risk scoring and decision processes.</li>
                        <li style="margin-bottom: 8px;">Structure and pilot investigations through traceable case management workflows.</li>
                        <li style="margin-bottom: 8px;">Strengthen regulatory compliance and preparation for controls and audits.</li>
                    </ul>
                    
                    <p>Our platform has been specifically designed to meet local regulatory requirements, financial security challenges, as well as the realities of cross-border operations in our region, where generic solutions quickly reach their limits.</p>
                    
                    <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin-top: 0;"><strong>Next steps:</strong></p>
                        <p>A member of our team will contact you shortly to:</p>
                        <ul style="margin-bottom: 0;">
                            <li style="margin-bottom: 5px;">Organize a demonstration of the platform.</li>
                            <li style="margin-bottom: 5px;">Analyze your specific fraud, risk, and compliance needs.</li>
                            <li style="margin-bottom: 5px;">Present early access terms as well as preferential pricing conditions.</li>
                        </ul>
                    </div>

                    <p>We would be delighted to accompany you in strengthening security, compliance, and trust within your operations.</p>
                    
                    <p style="margin-top: 30px;">
                        Sincerely,<br>
                        <strong>The PROTEGEY Team</strong>
                    </p>
                </div>
            `
        }
    }
}
