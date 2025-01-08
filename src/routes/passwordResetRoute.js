import express from 'express';
import { sendResetEmail } from '../controllers/passwordResetController.js'; // Ensure the correct path

const router = express.Router();

router.post('/send-reset-email', sendResetEmail); // Ensure the correct route path

export default router;
