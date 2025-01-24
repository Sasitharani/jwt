import express from 'express';
import { spinWheelLike } from '../controllers/spinWheelController.js'; // Import the spinWheelLike function

const router = express.Router();

router.post('/spinWheel', spinWheelLike); // Use the spinWheelLike function as the route handler

export default router;
