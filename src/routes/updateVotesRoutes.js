import express from 'express';
const router = express.Router();
import updateVotesController from '../controllers/updateVotesController';

router.post('/updateVotes', updateVotesController.updateVotes);

module.exports = router;
