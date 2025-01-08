import express from 'express';
import { deleteImage } from '../controllers/deleteImageController.js'; // Ensure the correct path

const router = express.Router();

router.post('/api/delete-image', deleteImage);

export default router;
