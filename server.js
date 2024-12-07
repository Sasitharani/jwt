import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

app.use(bodyParser.json());

let users = [];

// Signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword });
    res.status(201).send({ message: 'User registered successfully!' });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check for hardcoded admin credentials
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ id: username }, SECRET_KEY, { expiresIn: 86400 });
        return res.status(200).send({ auth: true, token });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).send({ message: 'User not found!' });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password!' });
    }
    const token = jwt.sign({ id: user.username }, SECRET_KEY, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
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