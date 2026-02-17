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
            const titleMapAr = {
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

async function sendTestEmails() {
    console.log('--- English Content ---');
    const enContent = getEmailContent('en', "John Doe", "Mr.");
    console.log('Subject:', enContent.subject);
    console.log('HTML:', enContent.html);

    console.log('\n--- Arabic Content ---');
    const arContent = getEmailContent('ar', "أحمد علي", "Mr.");
    console.log('Subject:', arContent.subject);
    console.log('HTML:', arContent.html);
}

sendTestEmails();


