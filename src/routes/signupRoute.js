import express from 'express';
import { signup } from '../controllers/signUpController.js'; // Ensure the correct path

const router = express.Router();

router.post('/signup', signup); // Ensure the correct route path

export default router;
