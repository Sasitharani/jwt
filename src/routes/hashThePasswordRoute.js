import express from 'express';
import { hashThePasswordController } from '../controllers/hashThePasswordController.js';

const router = express.Router();

router.post('/hash', hashThePasswordController);

export default router;
