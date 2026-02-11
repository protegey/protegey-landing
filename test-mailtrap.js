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

const name = "Test User";
const htmlContent = `
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
`;

console.log('Attempting to send email...');

client
    .send({
        from: sender,
        to: recipients,
        subject: "PROTEGEY Platform Demo & Sandbox Access",
        html: htmlContent,
    })
    .then((response) => console.log('Success:', response))
    .catch((err) => console.error('Error:', err));

