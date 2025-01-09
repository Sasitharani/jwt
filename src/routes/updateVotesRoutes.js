import express from 'express';
const router = express.Router();
import { updateVotes } from '../controllers/updateVotesController.js';

router.post('/updateVotes', (req, res, next) => {
    console.log('updateVotes route hit');
    next();
}, updateVotes);

export default router;
