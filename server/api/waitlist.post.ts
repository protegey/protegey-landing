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
                const lang = body.lang || 'en'
                const emailContent = getEmailContent(lang, body.name, body.title)

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
        return {
            subject: 'Accès à la démo et au Sandbox PROTEGEY',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">${greetingName},</h2>
                    
                    <p>Nous vous remercions pour l’intérêt que vous portez à PROTEGEY.</p>
                    
                    <p>Nous vous remercions sincèrement d’avoir considéré PROTEGEY.</p>
                    
                    <p>Vous pouvez accéder à la démonstration du produit ainsi qu’à la documentation via les liens ci-dessous :</p>
                    
                    <p><strong>Accès à la démo :</strong> <a href="https://youtu.be/_L37WlcS0Ak?si=1eDOdnF069Xxuq9L" style="color: #1a365d; text-decoration: underline;">Regarder la démo</a></p>
                    
                    <p><strong>Documentation :</strong> <a href="https://docs.protegey.com" style="color: #1a365d; text-decoration: underline;">docs.protegey.com</a></p>

                    <p>Après consultation de ces éléments, si vous souhaitez tester notre environnement Sandbox, nous vous prions de bien vouloir nous transmettre les informations ci-dessous à l’adresse suivante : <a href="mailto:partners@protegey.com" style="color: #1a365d; text-decoration: underline;">partners@protegey.com</a>. Dès réception, notre équipe procédera à la configuration de votre accès Sandbox.</p>

                    <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <p style="margin-top: 0;"><strong>Informations sur l’organisation :</strong></p>
                        <p style="margin: 10px 0 0 0;">
                        • Nom du partenaire<br>
                        • Type de partenaire (Fintech, Banque, Telco, Blockchain & Crypto, Régulateur, Marketplace, Autre)<br>
                        • Pays<br>
                        • Adresse e-mail de contact de l’organisation<br>
                        • Numéro de téléphone de contact<br>
                        • Notes internes pour PROTEGEY (cas d’usage, facultatif)</p>

                        <p style="margin-top: 15px;"><strong>Informations du partenaire administrateur principal pour l’accès à la plateforme PROTEGEY :</strong></p>
                        <p style="margin: 10px 0 0 0;">
                        • Nom complet<br>
                        • Fonction<br>
                        • Adresse e-mail (de préférence professionnelle)<br>
                        • Numéro de téléphone (facultatif)</p>
                    </div>

                    <p><strong>Remarque :</strong> Nous vous recommandons d’explorer l’environnement Sandbox avant de passer en production.</p>

                    <p>Si vous avez des questions supplémentaires après avoir consulté la démo et la documentation, n’hésitez pas à nous contacter à <a href="mailto:support@protegey.com" style="color: #1a365d; text-decoration: underline;">support@protegey.com</a>. Nous serons ravis de vous accompagner.</p>

                    <p>Nous nous réjouissons de vous accompagner dans le renforcement de vos opérations en matière de Risque et de Conformité.</p>
                    
                    <p style="margin-top: 30px;">
                        Cordialement,<br><br>
                        <strong>Lamyaa Chaibni</strong><br>
                        Customer Success & Accounts Manager<br>
                        <strong>PROTEGEY</strong>
                    </p>
                </div>
            `
        }
    } else if (lang === 'ar') {
        const arGreetingName = title ? `${title} ${name}` : name
        return {
            subject: 'العرض التوضيحي لـ PROTEGEY والوصول إلى Sandbox',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; direction: rtl; text-align: right;">
                    <h2 style="color: #1a365d;">عزيزي/عزيزتي ${arGreetingName}،</h2>
                    
                    <p>شكراً لاهتمامك بـ PROTEGEY.</p>
                    
                    <p>نقدر حقاً تفكيرك في PROTEGEY.</p>
                    
                    <p>يمكنك الوصول إلى العرض التوضيحي للمنتج والوثائق أدناه:</p>
                    
                    <p><strong>الوصول إلى العرض التوضيحي:</strong> <a href="https://youtu.be/_L37WlcS0Ak?si=1eDOdnF069Xxuq9L" style="color: #1a365d; text-decoration: underline;">مشاهدة العرض</a></p>
                    
                    <p><strong>الوثائق:</strong> <a href="https://docs.protegey.com" style="color: #1a365d; text-decoration: underline;">docs.protegey.com</a></p>

                    <p>إذا كنت ترغب، بعد مراجعة المواد، في اختبار بيئة sandbox الخاصة بنا، يرجى إرسال المعلومات أدناه إلى <a href="mailto:partners@protegey.com" style="color: #1a365d; text-decoration: underline;">partners@protegey.com</a>. بمجرد استلامها، سيقوم فريقنا بتوفير وصولك إلى sandbox.</p>

                    <div style="background-color: #f7fafc; padding: 20px; border-right: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <p style="margin-top: 0;"><strong>تفاصيل المؤسسة:</strong></p>
                        <p style="margin: 10px 0 0 0;">
                        • اسم الشريك<br>
                        • نوع الشريك (Fintech, Bank, Telco, Blockchain & Crypto, Regulator, Marketplace, Other)<br>
                        • الدولة<br>
                        • البريد الإلكتروني للتواصل مع المؤسسة<br>
                        • رقم الهاتف للتواصل<br>
                        • ملاحظات داخلية لـ PROTEGEY (مثل حالة الاستخدام الخاصة بك، اختياري)</p>

                        <p style="margin-top: 15px;"><strong>تفاصيل المسؤول الأساسي للشريك للوصول إلى منصة PROTEGEY:</strong></p>
                        <p style="margin: 10px 0 0 0;">
                        • الاسم الكامل<br>
                        • الدور الوظيفي<br>
                        • البريد الإلكتروني (يفضل بريد الشركة)<br>
                        • رقم الهاتف (اختياري)</p>
                    </div>

                    <p><strong>ملاحظة:</strong> نوصي باستكشاف بيئة Sandbox قبل الانتقال إلى مرحلة الإنتاج.</p>

                    <p>إذا كان لديك أي أسئلة أخرى بعد مشاهدة العرض التوضيحي والوثائق، فلا تتردد في الاتصال بنا على <a href="mailto:support@protegey.com" style="color: #1a365d; text-decoration: underline;">support@protegey.com</a> وسنكون سعداء بمساعدتك.</p>

                    <p>نتطلع إلى دعمك في تعزيز عمليات المخاطر والامتثال الخاصة بك.</p>
                    
                    <p style="margin-top: 30px;">
                        مع أطيب التحيات،<br><br>
                        <strong>Lamyaa Chaibni</strong><br>
                        Customer Success & Accounts Manager<br>
                        <strong>PROTEGEY</strong>
                    </p>
                </div>
            `
        }
    } else {
        // English (Default)
        return {
            subject: 'Your PROTEGEY Demo & Sandbox Access',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">Dear ${greetingName},</h2>
                    
                    <p>Thank you for your interest in PROTEGEY.</p>
                    
                    <p>We really appreciate you for considering PROTEGEY.</p>
                    
                    <p>You can access the product demo and documentation below:</p>
                    
                    <p><strong>Demo Access:</strong> <a href="https://youtu.be/_L37WlcS0Ak?si=1eDOdnF069Xxuq9L" style="color: #1a365d; text-decoration: underline;">Watch the demo</a></p>
                    
                    <p><strong>Documentation:</strong> <a href="https://docs.protegey.com" style="color: #1a365d; text-decoration: underline;">docs.protegey.com</a></p>

                    <p>If, after reviewing the materials, you would like to test our sandbox environment, kindly send us the below information to <a href="mailto:partners@protegey.com" style="color: #1a365d; text-decoration: underline;">partners@protegey.com</a> once that is received, our team will proceed with provisioning your sandbox access.</p>

                    <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <p style="margin-top: 0;"><strong>Organization Details:</strong></p>
                        <p style="margin: 10px 0 0 0;">
                        • Partner Name<br>
                        • Partner Type (Fintech, Bank, Telco, Blockchain & Crypto, Regulator, Marketplace, Other)<br>
                        • Country<br>
                        • Organization Contact Email<br>
                        • Contact Phone<br>
                        • Internal notes for PROTEGEY (like your use case, optional)</p>

                        <p style="margin-top: 15px;"><strong>Primary Partner Admin Details for PROTEGEY Platform Access:</strong></p>
                        <p style="margin: 10px 0 0 0;">
                        • Full Name<br>
                        • Role<br>
                        • Email (preferably company email)<br>
                        • Phone number (optional)</p>
                    </div>

                    <p><strong>Note:</strong> We recommend you explore the Sandbox environment before moving to production.</p>

                    <p>If you have any further questions after viewing the demo and documentation, please feel free to contact us at <a href="mailto:support@protegey.com" style="color: #1a365d; text-decoration: underline;">support@protegey.com</a> and we will be happy to assist.</p>

                    <p>We look forward to supporting you in strengthening your Risk and Compliance operations.</p>
                    
                    <p style="margin-top: 30px;">
                        Warm Regards,<br><br>
                        <strong>Lamyaa Chaibni,</strong><br>
                        Customer Success & Accounts Manager<br>
                        <strong>PROTEGEY</strong>
                    </p>
                </div>
            `
        }
    }
}
