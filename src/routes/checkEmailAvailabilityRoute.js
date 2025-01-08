import express from 'express';
import { checkEmailAvailability } from '../controllers/checkEmailAvailabilityController.js'; // Ensure the correct path

const router = express.Router();

router.post('/check-email', checkEmailAvailability); // Ensure the correct route path

export default router;
