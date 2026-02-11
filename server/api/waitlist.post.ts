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
            subject: 'Démonstration de la plateforme PROTEGEY et Accès Sandbox',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">Bonjour ${name},</h2>
                    
                    <p>Nous vous remercions de l'intérêt que vous portez à PROTEGEY.</p>
                    
                    <p>Nous sommes heureux de vous informer que nous sommes désormais officiellement opérationnels et que nous procédons activement à l'intégration de partenaires.</p>
                    
                    <p>Pour vous présenter les fonctionnalités et les cas d'utilisation de la plateforme PROTEGEY, nous vous invitons cordialement à remplir le formulaire ci-dessous. Une fois le formulaire soumis (nom complet et e-mail professionnel), vous serez redirigé vers la démonstration de la plateforme ou vous recevrez un lien d'accès à la démo.</p>
                    
                    <p><strong>Formulaire de démo PROTEGEY :</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnfcAwwrEGIC54uo-n470BVRTMRer2jq2gZpSo3pXByilYmg/viewform" style="color: #1a365d; text-decoration: underline;">Cliquez ici pour accéder au formulaire</a></p>

                    <p>Si vous avez des questions après avoir visionné la démo, n'hésitez pas à nous contacter à <a href="mailto:hello@protegey.com" style="color: #1a365d; text-decoration: underline;">hello@protegey.com</a> et nous nous ferons un plaisir de vous aider.</p>

                    <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <p style="margin-top: 0;"><strong>Souhaitez-vous aller plus loin ?</strong></p>
                        <p>Veuillez nous envoyer les détails ci-dessous à <a href="mailto:hello@protegey.com" style="color: #1a365d; text-decoration: underline;">hello@protegey.com</a> afin que nous puissions activer votre accès sandbox et vous permettre d'explorer la plateforme avant de passer en production :</p>

                        
                        <p><strong>Détails de l'organisation :</strong><br>
                        • Nom du partenaire<br>
                        • Type de partenaire (Fintech, Banque, Telco, Régulateur, Marketplace, Autre)<br>
                        • Pays<br>
                        • E-mail de contact de l'organisation<br>
                        • Téléphone de contact<br>
                        • Notes internes pour PROTEGEY (facultatif)</p>

                        <p><strong>Détails de l'administrateur partenaire principal :</strong><br>
                        • Nom complet<br>
                        • Rôle<br>
                        • E-mail (de préférence e-mail professionnel)<br>
                        • Numéro de téléphone (facultatif)</p>
                    </div>

                    <p>Vous pouvez également consulter notre documentation technique ici :<br>
                    <a href="https://docs.protegey.com" style="color: #1a365d; text-decoration: underline;">docs.protegey.com</a></p>

                    <p>Nous sommes impatients de vous accompagner dans le renforcement de vos opérations de Risque et de Conformité avec PROTEGEY.</p>
                    
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
            subject: 'عرض توضيحي لمنصة PROTEGEY والوصول إلى البيئة التجريبية (Sandbox)',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; direction: rtl; text-align: right;">
                    <h2 style="color: #1a365d;">مرحباً ${name}،</h2>
                    
                    <p>نشكركم على اهتمامكم بـ PROTEGEY.</p>
                    
                    <p>يسعدنا إبلاغكم أننا نعمل الآن رسمياً ونقوم حالياً بضم الشركاء بنشاط.</p>
                    
                    <p>لتعريفكم بميزات وحالات استخدام منصة PROTEGEY، ندعوكم لملء النموذج أدناه. بمجرد تقديم النموذج (الاسم الكامل والبريد الإلكتروني المهني)، سيتم توجيهكم إلى العرض التوضيحي للمنصة أو تزويدكم برابط الوصول.</p>
                    
                    <p><strong>نموذج عرض PROTEGEY:</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnfcAwwrEGIC54uo-n470BVRTMRer2jq2gZpSo3pXByilYmg/viewform" style="color: #1a365d; text-decoration: underline;">اضغط هنا للوصول إلى النموذج</a></p>

                    <p>إذا كان لديكم أي أسئلة بعد مشاهدة العرض، فلا تترددوا في التواصل معنا عبر البريد الإلكتروني <a href="mailto:hello@protegey.com" style="color: #1a365d; text-decoration: underline;">hello@protegey.com</a> وسنكون سعداء بمساعدتكم.</p>

                    <div style="background-color: #f7fafc; padding: 20px; border-right: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <p style="margin-top: 0;"><strong>هل ترغبون في المضي قدماً؟</strong></p>
                        <p>يرجى إرسال التفاصيل أدناه إلى <a href="mailto:hello@protegey.com" style="color: #1a365d; text-decoration: underline;">hello@protegey.com</a> حتى نتمكن من تفعيل وصولك إلى البيئة التجريبية (Sandbox) والسماح لك باستكشاف المنصة قبل الانتقال إلى مرحلة الإنتاج:</p>

                        
                        <p><strong>تفاصيل المؤسسة:</strong><br>
                        • اسم الشريك<br>
                        • نوع الشريك (Fintech, Bank, Telco, Regulator, Marketplace, Other)<br>
                        • الدولة<br>
                        • البريد الإلكتروني للتواصل مع المؤسسة<br>
                        • رقم الهاتف للتواصل<br>
                        • ملاحظات داخلية لـ PROTEGEY (اختياري)</p>

                        <p><strong>تفاصيل المسؤول الأساسي للشريك:</strong><br>
                        • الاسم الكامل<br>
                        • الدور الوظيفي<br>
                        • البريد الإلكتروني (يفضل بريد الشركة)<br>
                        • رقم الهاتف (اختياري)</p>
                    </div>

                    <p>يمكنكم أيضاً الاطلاع على وثائقنا التقنية من هنا:<br>
                    <a href="https://docs.protegey.com" style="color: #1a365d; text-decoration: underline;">docs.protegey.com</a></p>

                    <p>نتطلع إلى دعمكم في تعزيز عمليات المخاطر والامتثال الخاصة بكم مع PROTEGEY.</p>
                    
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
            subject: 'PROTEGEY Platform Demo & Sandbox Access',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <h2 style="color: #1a365d;">Hello ${name},</h2>
                    
                    <p>Thank you for your interest in PROTEGEY.</p>
                    
                    <p>We are pleased to inform you that we are now officially operational and actively onboarding partners.</p>
                    
                    <p>To introduce you to the features and use cases of the PROTEGEY platform, we kindly invite you to complete the form below. Once the form is submitted (full name and professional email), you will be redirected to the platform demo or provided with access to the demo link.</p>
                    
                    <p><strong>PROTEGEY Demo form:</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSfnfcAwwrEGIC54uo-n470BVRTMRer2jq2gZpSo3pXByilYmg/viewform" style="color: #1a365d; text-decoration: underline;">Click here to access the form</a></p>

                    <p>If you have any questions after viewing the demo, please feel free to contact us at <a href="mailto:hello@protegey.com" style="color: #1a365d; text-decoration: underline;">hello@protegey.com</a> and we will be happy to assist.</p>

                    <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #1a365d; border-radius: 5px; margin: 25px 0;">
                        <p style="margin-top: 0;"><strong>Should you wish to proceed further?</strong></p>
                        <p>Please email us the details below at <a href="mailto:hello@protegey.com" style="color: #1a365d; text-decoration: underline;">hello@protegey.com</a> so we can activate your sandbox access and allow you to explore the platform before moving to production:</p>

                        
                        <p><strong>Organization Details:</strong><br>
                        • Partner Name<br>
                        • Partner Type (Fintech, Bank, Telco, Regulator, Marketplace, Other)<br>
                        • Country<br>
                        • Organization Contact Email<br>
                        • Contact Phone<br>
                        • Internal notes for PROTEGEY (optional)</p>

                        <p><strong>Primary Partner Admin Details for PROTEGEY Platform Access:</strong><br>
                        • Full Name<br>
                        • Role<br>
                        • Email (preferably company email)<br>
                        • Phone number (optional)</p>
                    </div>

                    <p>You may also consult our technical documentation here:<br>
                    <a href="https://docs.protegey.com" style="color: #1a365d; text-decoration: underline;">docs.protegey.com</a></p>

                    <p>We look forward to supporting you in strengthening your Risk and Compliance operations with PROTEGEY.</p>
                    
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
