import express from 'express';
import { googleLogin } from '../controllers/googleLoginController.js'; // Ensure the correct path

const router = express.Router();

router.post('/google-login', googleLogin); // Ensure the correct route path

export default router;
