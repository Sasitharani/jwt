import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import upload from './upload.js'; // Import the upload middleware
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sasitharani@gmail.com',
    pass: 'zfikzmnxyuicssim',
  },
});

app.post('/api/send-email', upload.single('file'), (req, res) => {
  const { name, email, phone, message } = req.body;
  const file = req.file;

  console.log('File:', file); // Debugging information

  const mailOptions = {
    from: 'sasitharani@gmail.com',
    to: ['sasitharani@gmail.com', 'hrd@insphile.in'], // add the recipient's email addresses
    subject: 'Insphile-New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    attachments: file ? [{ filename: file.originalname, path: file.path }] : [],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email', details: error.message });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully.' });

    // Delete the file after sending the email
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
