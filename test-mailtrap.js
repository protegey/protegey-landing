import { MailtrapClient } from 'mailtrap';
import 'dotenv/config';

const token = process.env.MAILTRAP_TOKEN;

if (!token) {
    console.error('MAILTRAP_TOKEN not found in environment');
    process.exit(1);
}

const client = new MailtrapClient({ token });

const sender = { name: "Test User", email: "no-reply@mail.protegey.com" };
const recipients = [{ email: "test@example.com" }];

console.log('Attempting to send email...');

client
    .send({
        from: sender,
        to: recipients,
        subject: "Connection Test",
        text: "Testing Mailtrap connection.",
    })
    .then((response) => console.log('Success:', response))
    .catch((err) => console.error('Error:', err));
