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
        <h2 style="color: #1a365d;">Dear ${name},</h2>
        
        <p>Thank you for your interest in PROTEGEY.</p>
        
        <p>We really appreciate you for considering PROTEGEY.</p>
        
        <p>You can access the product demo and documentation below:</p>
        
        <p><strong>Demo Access:</strong> <a href="https://youtu.be/_L37WlcS0Ak?si=1eDOdnF069Xxuq9L" style="color: #1a365d; text-decoration: underline;">Watch the demo</a></p>
        
        <p><strong>Documentation:</strong> <a href="https://docs.protegey.com" style="color: #1a365d; text-decoration: underline;">docs.protegey.com</a></p>

        <p>If, after reviewing the materials, you would like to test our sandbox environment, kindly send us the below information to <a href="mailto:partners@protegey.com" style="color: #1a365d; text-decoration: underline;">partners@protegey.com</a>. Once that is received, our team will proceed with provisioning your sandbox access.</p>

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
            <strong>Lamyaa Chaibni</strong><br>
            Customer Success & Accounts Manager<br>
            <strong>PROTEGEY</strong>
        </p>
    </div>
`;

console.log('Attempting to send email...');

client
    .send({
        from: sender,
        to: recipients,
        subject: "Your PROTEGEY Demo & Sandbox Access",
        html: htmlContent,
    })
    .then((response) => console.log('Success:', response))
    .catch((err) => console.error('Error:', err));


