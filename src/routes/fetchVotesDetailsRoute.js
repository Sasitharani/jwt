import express from 'express';
const router = express.Router();
import { fetchVotesDetails } from '../controllers/fetchVotesDetailsController.js';

router.get('/fetchVotesDetails', fetchVotesDetails);

export default router;
