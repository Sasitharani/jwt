import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import db from './db.js'; // Import the connection pool

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

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
            res.status(201).send({ message: 'User registered successfully!' });
        });
    } catch (error) {
        res.status(500).send('Error registering user');
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
            res.status(200).json({ token });
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});