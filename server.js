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

app.use(cors());
app.use(bodyParser.json());

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const [result] = await db.promise().execute(
            'INSERT INTO userdb (username, password, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email]
        );
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Signup failed. Please try again.' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check for hardcoded admin credentials
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ id: username }, SECRET_KEY, { expiresIn: 86400 });
        return res.status(200).send({ auth: true, token });
    }

    try {
        const [rows] = await db.promise().execute('SELECT * FROM userdb WHERE username = ?', [username]);
        const user = rows[0];
        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid password!' });
        }
        const token = jwt.sign({ id: user.username }, SECRET_KEY, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    } catch (error) {
        res.status(500).send({ message: 'Login failed. Please try again.' });
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});