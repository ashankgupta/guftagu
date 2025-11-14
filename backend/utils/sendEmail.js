import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SENDGRID_API_KEY) {
    console.error("SENDGRID_API_KEY is not set in environment variables!");
} else {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const sendEmail = async (to, subject, text, html) => {
  const senderEmail = process.env.SENDGRID_VERIFIED_SENDER;
  console.log('Sender Email:', senderEmail);
    const msg = {
        to: to,
        from: {
            email: senderEmail,
            name: 'Guftagu', 
        },
        subject: subject,
        text: text, 
        html: html, 
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully via SendGrid to:', to);
    } catch (error) {
        console.error('Error sending email via SendGrid:', error);
        if (error.response) {
            console.error(error.response.body);
        }
        throw error;  
    }
};

export default sendEmail;