import express from 'express';
import { login } from '../controllers/loginController.js'; // Ensure the correct path

const router = express.Router();

router.post('/login', login); // Ensure the correct route path

export default router;
