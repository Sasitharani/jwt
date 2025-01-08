import express from 'express';
import { voteForVote1Controller } from '../controllers/voteForVote1Controller.js';

const router = express.Router();

router.post('/voting', voteForVote1Controller);

export default router;
