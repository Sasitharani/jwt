import express from 'express';
import { deleteImage } from './controllers/deleteImageController';

const router = express.Router();

router.post('/api/delete-image', deleteImage);

export default router;
