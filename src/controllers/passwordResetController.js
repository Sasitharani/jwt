import nodemailer from 'nodemailer';

const sendResetEmail = async (req, res) => {
  //console.log("send-reset-email hit");
  const { email, code } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'sasitharani@gmail.com',
      pass: 'zcyjkhdknezjzkrg',
    },
  });

  const resetLink = `http://localhost:3000/forgot-password?code=${code}`;

  const htmlContent = `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
  `;

  try {
    await transporter.sendMail({
      from: '"Support" <sasitharani@gmail.com>',
      to: [email, 'sasitharani@gmail.com'],
      subject: "Password Reset",
      html: htmlContent,
    });
    res.status(200).send({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email. Please try again.');
  }
};

export { sendResetEmail };
