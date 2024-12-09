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
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password with a salt of 8 rounds
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
    const isMatch = bcrypt.compareSync(password, hashedPassword1);
    isMatch? res.status(200).send({ message: 'Passwords match!' }): res.status(401).send({ message: 'Passwords do not match!' });
});


// Hash password route
app.post('/hash', (req, res) => {
    console.log('Hashing');

    const { username, email, password, password1 } = req.body;
    console.log('hpass',password);
    if (!password) {
        return res.status(400).send({ message: 'Password to hash (hpass) is required.' });
    }
console.log('hpass',password);
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password with a salt of 10 rounds
    console.log('Hashed Password during Pass:', hashedPassword);

    const query = `
        INSERT INTO userdb (username, password, email, Pass)
        VALUES (?, ?, ?, ?)
    `;
    const values = [username, password, email, hashedPassword];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Signup failed. Please try again.');
            return;
        }
       const result=results[0]
        res.status(201).send({ message: 'User registered successfully!',result });
    });
});

// Compare password route
app.post('/compare', (req, res) => {
   
    const { password} = req.body;

    console.log(' Received password:-', password);
   
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'SELECT * FROM userdb WHERE Pass = ?';
    
        db.query(query, [hashedPassword], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Login failed. Please try again.');
            return;
        }
        
        // Access the retrieved values
        const retrievedValue = results[0]; // Assuming you want the first row
        console.log('Retrieved Value:', retrievedValue);
        
        // Send the retrieved value in the response
        res.status(200).send({ retrievedValue });
    });
    const isMatch = bcrypt.compareSync(password, hashedPassword1);
    isMatch? res.status(200).send({ message: 'Passwords match!' }): res.status(401).send({ message: 'Passwords do not match!' });
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

        let hashedloginpassword = bcrypt.hashSync(password, 10);

        console.log('hashedloginpassword:', hashedloginpassword);

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        console.log('bcrypt.compareSync:', passwordIsValid);    
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid password!' });
        }
        res.status(200).send({ auth: true, hashedPassword: user.password, message: 'Login successful!' });
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