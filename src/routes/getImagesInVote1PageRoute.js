import express from 'express';
import { getImagesInVote1PageController } from '../controllers/getImagesInVote1PageRouteController.js';

const router = express.Router();

router.get('/get-images-vote1', getImagesInVote1PageController);

export default router;
