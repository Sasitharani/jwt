import express from 'express';
import { imgForVote1Controller } from '../controllers/imgForVote1Controller.js';

const router = express.Router();

router.post('/img-for-vote1', imgForVote1Controller);

export default router;
