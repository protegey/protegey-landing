import { MailtrapClient } from 'mailtrap';
import 'dotenv/config';

const token = process.env.MAILTRAP_TOKEN;

if (!token) {
    console.error('MAILTRAP_TOKEN not found in environment');
    process.exit(1);
}

const client = new MailtrapClient({ token });

const sender = { name: "Protegey Inc.", email: "no-reply@mail.protegey.com" };
const recipients = [{ email: "test@example.com" }];

const name = "Ghost";
const title = "Mr.";

function getEmailContent(lang, name, title) {
    let greetingName = name
    if (title) {
        if (lang === 'fr') {
            const titleMap = {
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
    } else {
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

async function sendTestEmails() {
    console.log('Attempting to send English email...');
    const enContent = getEmailContent('en', name, title);
    try {
        const enRes = await client.send({
            from: sender,
            to: recipients,
            subject: enContent.subject,
            html: enContent.html,
        });
        console.log('English Success:', enRes);
    } catch (err) {
        console.error('English Error:', err);
    }

    console.log('\nAttempting to send French email...');
    const frContent = getEmailContent('fr', name, title);
    try {
        const frRes = await client.send({
            from: sender,
            to: recipients,
            subject: frContent.subject,
            html: frContent.html,
        });
        console.log('French Success:', frRes);
    } catch (err) {
        console.error('French Error:', err);
    }
}

sendTestEmails();


