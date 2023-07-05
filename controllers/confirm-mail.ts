import { createTransport } from 'nodemailer';

export default function sendConfirmMail(receiver: string, token: string) {
  const transporter = createTransport({
    service: 'Gmail',
    auth: {
      user: 'minh.chau@beehexa.com',
      pass: 'nehoqewycbgqplnz',
    },
  });

  const activationURL = `$/api/activate/${token}`;


  console.log("Activation URL", activationURL);

  // const mailOptions = {
  //   from: 'minh.chau@beehexa.com',
  //   to: receiver,
  //   subject: 'Activate your Scrum Assistant account',
  //   text: `Please click on ${activationURL} to activate your Scrum Assistant account`,
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error('Error sending email:', error);
  //   } else {
  //     console.log('Email sent:', info.response);
  //   }
  // });
}
