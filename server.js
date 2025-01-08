import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import db from './db.js'; // Import the connection pool
import nodemailer from 'nodemailer';
import multer from 'multer'; // Import multer
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ftp from 'ftp';
import deleteImageRoute from './src/routes/deleteImageRoute.js'; // Import deleteImageRoute
import getAllImagesRoute from './src/routes/getAllImagesRoute.js'; // Import getAllImagesRoute
import loginRoute from './src/routes/loginRoute.js'; // Import loginRoute
import googleLoginRoute from './src/routes/googleLoginRoute.js'; // Ensure the correct path
import signupRoute from './src/routes/signupRoute.js'; // Import signupRoute
import checkEmailAvailabilityRoute from './src/routes/checkEmailAvailabilityRoute.js'; // Import checkEmailAvailabilityRoute
import fileUploadSendEmailRoute from './src/routes/fileUploadSendEmailRoute.js'; // Import fileUploadSendEmailRoute
import passwordResetRoute from './src/routes/passwordResetRoute.js'; // Import passwordResetRoute
import hashThePasswordRoute from './src/routes/hashThePasswordRoute.js'; // Import hashThePasswordRoute
import comparePasswordRoute from './src/routes/comparePaswswordRoute.js'; // Import comparePasswordRoute
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Use the imported deleteImageRoute
app.use('/api', deleteImageRoute);

// Use the imported getAllImagesRoute
app.use('/api', getAllImagesRoute);

// Use the imported loginRoute
app.use('/api', loginRoute);

// Use the imported googleLoginRoute
app.use('/api', googleLoginRoute); // Ensure the correct route

// Use the imported signupRoute
app.use('/api', signupRoute);

// Use the imported checkEmailAvailabilityRoute
app.use('/api', checkEmailAvailabilityRoute);

// Use the imported fileUploadSendEmailRoute
app.use('/api', fileUploadSendEmailRoute);

// Use the imported passwordResetRoute
app.use('/api', passwordResetRoute);

// Use the imported hashThePasswordRoute
app.use('/api', hashThePasswordRoute);

// Use the imported comparePasswordRoute
app.use('/api', comparePasswordRoute);

//console.log("DirName:", __dirname);

// Set up multer for file uploads
// const storage = multer.memoryStorage(); // Use memory storage to avoid saving to disk
// const upload = multer({ storage });

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'sasitharani@gmail.com',
//     pass: 'zfikzmnxyuicssim',
//   },
// });

// Password reset route
// app.post('/send-reset-email', async (req, res) => {
//     console.log("send-reser-email hit");
//     const { email, code } = req.body;

//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         auth: {
//             user: 'sasitharani@gmail.com',
//             pass: 'zcyjkhdknezjzkrg',
//         },
//     });

//     const resetLink = `http://www.contests4all.com/forgot-password?code=${code}`;

//     const htmlContent = `
//         <h2>Password Reset Request</h2>
//         <p>Click the link below to reset your password:</p>
//         <a href="${resetLink}">${resetLink}</a>
//     `;

//     try {
//         await transporter.sendMail({
//             from: '"Support" <sasitharani@gmail.com>',
//             to: [email, 'sasitharani@gmail.com'],
//             subject: "Password Reset",
//             html: htmlContent,
//         });
//         res.status(200).send({ message: 'Reset email sent successfully' });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Error sending email. Please try again.');
//     }
// });

// app.post('/reset-password', (req, res) => {
//     const { email, newPassword } = req.body;
//     const hashedPassword = bcrypt.hashSync(newPassword, 10);

//     const query = 'UPDATE userdb SET password = ? WHERE email = ?';
//     db.query(query, [hashedPassword, email], (err, results) => {
//         console.log('Results password change:', results);
//         console.log('Results password affectedRows:', results.affectedRows);
//         if (results.affectedRows) {
//             res.status(200).send({ message: 'Password reset successfully' });
//         }
       
//     });
// });
// Hash password route
// app.post('/hash', (req, res) => {
//     console.log('Hashing');
//     const { username, email, password, hpassword } = req.body;

//     console.log('Hashed Password during Pass:', hpassword);

//     const query = `
//         INSERT INTO userdb (username, password, email, Pass)
//         VALUES (?, ?, ?, ?)
//     `;
//     const values = [username, password, email, hpassword];

//     db.query(query, values, (err, results) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//             res.status(500).send('Signup failed. Please try again.');
//             return;
//         }
//         const result = results[0];
//         res.status(201).send({ message: 'User registered successfully!', result });
//     });
// });

// Compare password route
app.post('/compare', (req, res) => {
    const { password } = req.body;

    console.log('Received password :-', password);

    const query = 'SELECT * FROM userdb WHERE password = ?';

    db.query(query, [password], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Login failed. Please try again.');
            return;
        }

        // Access the retrieved values
        const retrievedValue = results[0]; // Assuming you want the first row
        console.log('Retrieved Value:', retrievedValue);

        // Extract only the password field
        const retrievedPassword = retrievedValue.Pass;
        console.log('Retrieved Password:', retrievedPassword);

        // Compare passwords
        const isMatch = bcrypt.compareSync(password, retrievedPassword);
        console.log('Password match:', isMatch);

        // Send the retrieved password and comparison result in the response
        res.status(200).send({ retrievedPassword, isMatch });
    });
});

app.post('/api/img-for-vote1', (req, res) => {
  const { checkedImages, email } = req.body; // Get email from req.body

  if (!checkedImages || !Array.isArray(checkedImages)) {
    return res.status(400).send('Invalid data');
  }

  const query = 'INSERT INTO vote1 (path, email) VALUES ?';
  const values = checkedImages.map(image => [image, email]); // Include email in the values

  db.query(query, [values], (err, results) => {
    if (err) {
      console.error('Error saving votes:', err);
      return res.status(500).send('Error saving votes');
    }
    res.status(200).send('Votes saved successfully');
  });
});

app.post('/api/voting', (req, res) => {
  const { path } = req.body;

  if (!path) {
    return res.status(400).send('Invalid data');
  }

  const query = 'UPDATE vote1 SET votes = votes + 1 WHERE path = ?';

  db.query(query, [path], (err, results) => {
    if (err) {
      console.error('Error updating votes:', err);
      return res.status(500).send('Error updating votes');
    }
    res.status(200).send('Votes updated successfully');
  });
});

app.get('/api/get-images-vote1', (req, res) => {
  const query = 'SELECT path, votes FROM vote1';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching images:', err);
      return res.status(500).send('Error fetching images');
    }
    res.status(200).json(results);
  });
});




app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

