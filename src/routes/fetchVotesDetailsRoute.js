import express from 'express';
const router = express.Router();
import { fetchVotesDetails } from '../controllers/fetchVotesDetailsController.js';

router.get('/fetchVotesDetails', fetchVotesDetails);

export default router;
router.use((req, res, next) => {
    console.log(`Request received at ${req.originalUrl}`);
    next();
});