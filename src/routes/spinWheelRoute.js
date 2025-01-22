import express from 'express';
import { spinWheelLike } from '../controllers/spinWheelController.js';

const router = express.Router();

router.post('/spinWheelLike', spinWheelLike);

export default router;
