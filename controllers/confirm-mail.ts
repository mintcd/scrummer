import { createTransport } from 'nodemailer';

export default async function sendConfirmMail(host: string, receiver: string, token: string) {
  const transporter = createTransport({
    service: 'Gmail',
    auth: {
      user: 'minh.chau@beehexa.com',
      pass: 'nehoqewycbgqplnz',
    },
  });

  const activationURL = `${host}/activate/${token}`;

  const mailOptions = {
    from: 'minh.chau@beehexa.com',
    to: receiver,
    subject: 'Activate your Scrum Assistant account',
    text: `Please visit ${activationURL} to activate your Scrum Assistant account`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
