import { Client } from '@notionhq/client'
import { Resend } from 'resend'

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
    if (!body.email || !body.name) {
        throw createError({
            statusCode: 400,
            message: 'Name and Email are required.'
        })
    }

    const notion = new Client({ auth: config.notionApiKey })
    const resend = config.resendApiKey ? new Resend(config.resendApiKey) : null

    try {
        // Check for duplicates
        // Use manual fetch because SDK notion.databases.query is missing/broken in this environment
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

        const response = await notion.pages.create({
            parent: { database_id: config.notionDatabaseId },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: body.name,
                            },
                        },
                    ],
                },
                Email: {
                    email: body.email,
                },
                Phone: {
                    phone_number: body.phone || '',
                },
                Company: {
                    rich_text: [
                        {
                            text: {
                                content: body.company || 'N/A',
                            },
                        },
                    ],
                },
                Role: {
                    multi_select: [
                        {
                            name: body.role ? body.role : 'Other',
                        },
                    ],
                },
                'Business Model': {
                    multi_select: body.businessModel ? [{ name: body.businessModel }] : [],
                },
                'Stage': {
                    multi_select: body.stage ? [{ name: body.stage }] : [],
                },
                'Sector': {
                    multi_select: body.sector ? [{ name: body.sector }] : [],
                },
                'Pain Points': {
                    multi_select: (body.painPoints || []).map((p: string) => ({ name: String(p) })),
                },
                'Other Pain Point': {
                    rich_text: [
                        {
                            text: {
                                content: body.otherPainPoint || '',
                            },
                        },
                    ],
                },
                Interest: {
                    multi_select: [
                        {
                            name: body.interestType || 'Other',
                        }
                    ],
                },
                Message: {
                    rich_text: [
                        {
                            text: {
                                content: body.message || '',
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

        // Send Confirmation Email
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'Protegey Inc. <no-reply@mail.protegey.com>', // Use resend default for testing, user should update
                    to: body.email,
                    subject: 'Bienvenue dans une nouvelle ère de l’intelligence antifraude en Afrique Francophone et en Afrique du Nord',
                    html: `
                        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                            <h1 style="color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 10px;">Bienvenue chez PROTEGEY</h1>
                            
                            <p>Bonjour <strong>${body.name}</strong>,</p>
                            
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
                })
            } catch (emailError) {
                console.error('Failed to send confirmation email:', emailError)
                // correct - we don't want to fail the whole request if email fails
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
