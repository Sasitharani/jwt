import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

const uri = 'mongodb+srv://sasitharani:crgYTglszwwKFgOv@contest.iwtzy.mongodb.net/?retryWrites=true&w=majority&appName=contest';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

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
  const { username, email,password, hpassword} = req.body;

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
     const result=results[0]
      res.status(201).send({ message: 'User registered successfully!',result });
  });
});

// Compare password route
app.post('/compare', (req, res) => {


  const { password} = req.body;

  console.log(' Received password :-', password) ;
 

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
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received login data:', { email, password }); // Log the received data
  const query = 'SELECT * FROM userdb WHERE email = ?';
  db.query(query, [email], (err, results) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});