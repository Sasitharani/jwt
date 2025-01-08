import express from 'express';
import { comparePasswordController } from '../controllers/comparePaswswordController.js';

const router = express.Router();

router.post('/compare', comparePasswordController);

export default router;
