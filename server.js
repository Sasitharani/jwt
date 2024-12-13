import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import path from 'path';

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

app.use(express.static(path.join(__dirname, 'public')));

// Signup route


// Check email availability route


// Hash password route


// Compare password route


// Login route


// Protected route do know what this is


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});