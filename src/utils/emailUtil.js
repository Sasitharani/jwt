import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'error@contests4all.com', // Replace with your email
    pass: 'SasiJaga09$' // Replace with your email password
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'error@contests4all.com', // Replace with your email
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export { sendEmail };
