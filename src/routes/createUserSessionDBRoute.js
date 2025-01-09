import express from 'express';
import { createUserSessionDB } from '../controllers/createUserSessionDBController.js';

const router = express.Router();

router.post('/create-user-session-db', createUserSessionDB);

export default router;
