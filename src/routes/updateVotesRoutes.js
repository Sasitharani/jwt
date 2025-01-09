import express from 'express';
const router = express.Router();
import updateVotes from '../controllers/updateVotesController';

router.post('/updateVotes', updateVotes);

export default router;
