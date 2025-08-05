import nodemailer from 'nodemailer';
let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "084cda88ab95cb",
        pass: "c87d534eabd3bd"
    }
});
const sender = {
    address: process.env.MAILTRAP_FROM_EMAIL,
    name: process.env.MAILTRAP_FROM_NAME,
};
export const sendOrderConfirmation = async (to, subject, html) => {
    try {
        transport.sendMail({
            from: sender,
            to,
            subject,
            html,
            category: 'Order Confirmation',
        });
    } catch (error) {
        console.log('Email send error:', error);
    }
};