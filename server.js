import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import db from './db.js'; // Import the connection pool
import nodemailer from 'nodemailer';
import upload from './upload.js'; // Import the upload middleware
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Ensure the uploads directory exists with the current date as the name
const currentDate = new Date().toISOString().split('T')[0];
const uploadsDir = path.join(__dirname, currentDate);
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

  // Move the file to the current date folder
  const newFilePath = path.join(uploadsDir, file.originalname);
  fs.renameSync(file.path, newFilePath);

  const mailOptions = {
    from: 'sasitharani@gmail.com',
    to: ['sasitharani@gmail.com', 'hrd@insphile.in'], // add the recipient's email addresses
    subject: 'Insphile-New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    attachments: file ? [{ filename: file.originalname, path: newFilePath }] : [],
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
      fs.unlink(newFilePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
  });
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO userdb (username, password, email)
            VALUES (?, ?, ?)
        `;
        const values = [username, hashedPassword, email];
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Signup failed. Please try again.');
                return;
            }
            res.status(200).send({ message: 'User registered successfully!' });
        });
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Google login route
app.post('/google-login', async (req, res) => {
  console.log("Google Login hit");
    const { email, name } = req.body;
    try {
        const query = 'SELECT * FROM userdb WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Google login failed. Please try again.');
                return;
            }
            let user = results[0];

            if (!user) {
                // If user does not exist, create a new user
                const query = `
                    INSERT INTO userdb (username, email)
                    VALUES (?, ?)
                `;
                const values = [name, email];
                db.query(query, values, (err, results) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        res.status(500).send('Google login failed. Please try again.');
                        return;
                    }
                    user = { id: results.insertId, username: name, email };
                });
            }

            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        });
    } catch (error) {
        res.status(500).send('Error logging in with Google');
    }
});

// Check email availability route
app.post('/check-email', (req, res) => {
    const { email } = req.body;

    const query = 'SELECT * FROM userdb WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error checking email. Please try again.');
            return;
        }
        if (results.length > 0) {
            res.status(200).send({ available: false });
        } else {
            res.status(200).send({ available: true });
        }
    });
});
app.post('/send-reset-email', async (req, res) => {
    console.log("send-reser-email hit");
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
});

app.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    const query = 'UPDATE userdb SET password = ? WHERE email = ?';
    db.query(query, [hashedPassword, email], (err, results) => {
        console.log('Results password change:', results);
        console.log('Results password affectedRows:', results.affectedRows);
        if (results.affectedRows) {
            res.status(200).send({ message: 'Password reset successfully' });
        }
       
    });
});
// Hash password route
app.post('/hash', (req, res) => {
    console.log('Hashing');
    const { username, email, password, hpassword } = req.body;

    console.log('Hashed Password during Pass:', hpassword);

    const query = `
        INSERT INTO userdb (username, password, email, Pass)
        VALUES (?, ?, ?, ?)
    `;
    const values = [username, password, email, hpassword];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Signup failed. Please try again.');
            return;
        }
        const result = results[0];
        res.status(201).send({ message: 'User registered successfully!', result });
    });
});

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

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = 'SELECT * FROM userdb WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Login failed. Please try again.');
                return;
            }
            const user = results[0];

            if (!user) {
                return res.status(404).send({ message: 'User not found!' });
            }

            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ message: 'Invalid password!' });
            }

            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ token, message: 'Login Successfully', hashedPassword: user.password });
        });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

// Protected route
app.get('/me', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ message: 'No token provided!' });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        res.status(200).send(decoded);
    });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});