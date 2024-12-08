import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import db from './db.js'; // Import the connection pool

dotenv.config();

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Signup route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8); // Hash the password with a salt of 8 rounds
    console.log('Hashed Password during signup:', hashedPassword);

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
        res.status(201).send({ message: 'User registered successfully!' });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login data:', { username, password }); // Log the received data
    const query = 'SELECT * FROM userdb WHERE username = ? OR email = ?';
    db.query(query, [username, username], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Login failed. Please try again.');
            return;
        }
        const user = results[0];
       
        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        }
        console.log('The Password is:', password);
        console.log('The user Password:', user.password);

        // Use bcrypt.compare for asynchronous password comparison
        bcrypt.compare(password, user.password, (err, passwordIsValid) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                res.status(500).send('Login failed. Please try again.');
                return;
            }
            console.log('bcrypt.compare:', passwordIsValid); // Log the comparison result
            if (!passwordIsValid) {
                return res.status(401).send({ message: 'Invalid password!' });
            }
            res.status(200).send({ auth: true, hashedPassword: user.password, message: 'Login successful!' });
        });
    });
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});