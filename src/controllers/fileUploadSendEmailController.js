import ftp from 'ftp';
import path from 'path';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sasitharani@gmail.com',
    pass: 'zfikzmnxyuicssim',
  },
});

const fileUploadSendEmail = (req, res) => {
  const { name, email, phone, message } = req.body;
  const file = req.file;

  if (!file) {
    console.error('Please Select a file before Submit.');
    return res.status(400).send('No file uploaded.');
  }

  console.log('File:', file); // Debugging information

  const client = new ftp();
  client.on('ready', () => {
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
    const userEmail = req.body.email;
    console.log('User Email', userEmail);
    const fileExtension = path.extname(file.originalname);
    const remoteFilePath = `/public_html/www.contests4all.com/public/img/uploads/${formattedTime}${formattedDate}${userEmail}${fileExtension}`;
    client.mkdir(path.dirname(remoteFilePath), true, (err) => {
      if (err) {
        console.error('Error creating remote directory:', err);
        res.status(500).send('Error creating remote directory');
        client.end();
        return;
      }
      client.put(file.buffer, remoteFilePath, (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          res.status(500).send('File upload failed');
          client.end();
          return;
        }
        console.log('File uploaded to:', remoteFilePath);

        const mailOptions = {
          from: 'sasitharani@gmail.com',
          to: ['sasitharani@gmail.com'], // add the recipient's email addresses
          subject: 'Contest New Image Submission',
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
          attachments: [{ filename: file.originalname, content: file.buffer }],
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email', details: error.message });
          } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
          }
          client.end();
        });
      });
    });
  });

  client.connect({
    host: "68.178.150.66",
    user: "l3ppzni4r1in",
    password: "SasiJaga09$",
  });
};

export { fileUploadSendEmail };
