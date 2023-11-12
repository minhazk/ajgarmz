import nodemailer from 'nodemailer';

const email = process.env.CONTACT_EMAIL as string;
const password = process.env.MAILER_PASSWORD as string;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password,
    },
});

export async function POST(req: Request) {
    const { recipients, subject, body } = await req.json();

    if (email == null || recipients == null || subject == null || body == null) return new Response('Bad Request', { status: 400 });

    try {
        await transporter.sendMail({
            from: email,
            to: recipients,
            subject,
            html: body,
        });
        return new Response('Email sent', { status: 200 });
    } catch (e) {
        console.log(e);
        return new Response(e as string, { status: 400 });
    }
}
