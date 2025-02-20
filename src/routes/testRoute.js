import express from 'express';
import { connectToDatabase, showDatabaseTables, connectToVercelDatabase } from '../controllers/testController.js';

const router = express.Router();

router.get('/connect-db', connectToDatabase);
router.get('/show-db', showDatabaseTables);
router.get('/vercel-db', connectToVercelDatabase);

export default router;
