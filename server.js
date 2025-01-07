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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

console.log("DirName:", __dirname);

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage to avoid saving to disk
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sasitharani@gmail.com',
    pass: 'zfikzmnxyuicssim',
  },
});

// // Endpoint to handle file uploads
// app.post('/upload-file', upload.single('file'), (req, res) => {
//   const file = req.file;

//   if (file) {
//     console.log('File:', file); // Debugging information

//     const client = new ftp();
//     client.on('ready', () => {
//       const date = new Date();
//       const formattedDate = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
//       const formattedTime = `${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
//       // const userEmail = req.body.email.slice(0, req.body.email.indexOf('@')).replace(/[^a-zA-Z0-9]/g, '');
//       const userEmail = req.body.email
//       console.log('User Email',userEmail)
//       const fileExtension = path.extname(file.originalname);
//       const remoteFilePath = `/public_html/www.contests4all.com/public/img/uploads/${formattedTime}${formattedDate}${userEmail}${fileExtension}`;
//       client.mkdir(path.dirname(remoteFilePath), true, (err) => {
//         if (err) {
//           console.error('Error creating remote directory:', err);
//           res.status(500).send('Error creating remote directory');
//           client.end();
//           return;
//         }
//         client.put(file.buffer, remoteFilePath, (err) => {
//           if (err) {
//             console.error('Error uploading file:', err);
//             res.status(500).send('File upload failed');
//             client.end();
//             return;
//           }
//           console.log('File uploaded to:', remoteFilePath);
//           res.send('File uploaded successfully');
//           client.end();
//         });
//       });
//     });

//     client.connect({
//       host: "68.178.150.66",
//       user: "l3ppzni4r1in",
//       password: "SasiJaga09$",
//     });
//   } else {
//     res.status(400).send('No file uploaded.');
//   }
// });

app.post('/api/send-email', upload.single('file'), (req, res) => {
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
    const userEmail = req.body.email
    console.log('User Email',userEmail)
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


app.get('/api/images', (req, res) => {
  console.log("Images hit");
  const client = new ftp();
  const images = [];
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

  client.on('ready', () => {
    client.list('/public_html/www.contests4all.com/public/img/uploads', (err, files) => {
      if (err) {
        console.error('Error reading uploads directory:', err);
        res.status(500).send('Error reading uploads directory');
        client.end();
        return;
      }

      files.forEach(file => {
        if (imageExtensions.includes(path.extname(file.name).toLowerCase())) {
          images.push({
            name: file.name,
            url: `/public/img/uploads/${file.name}`
          });
        }
      });

      res.json(images);
      client.end();
    });
  });

  client.connect({
    host: "68.178.150.66",
    user: "l3ppzni4r1in",
    password: "SasiJaga09$",


    });



  });

app.post('/api/img-for-vote1', (req, res) => {
  const { checkedImages } = req.body;

  if (!checkedImages || !Array.isArray(checkedImages)) {
    return res.status(400).send('Invalid data');
  }

  const query = 'INSERT INTO vote1 (path,email) VALUES ?';
  const values = checkedImages.map(image => [image]);

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

app.post('/api/delete-image', (req, res) => {
  const { url } = req.body;

  console.log('URL:', url);
  if (!url) {
    return res.status(400).send('Path does not exist. Inform the technical team');
  }

  const query = 'DELETE FROM vote1 WHERE path = ?';

  db.query(query, [url], (err, results) => {
    if (err) {
      console.error('Error deleting image:', err);
      return res.status(500).send('Error deleting image');
    }
    res.status(200).send('Image deleted successfully');
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

