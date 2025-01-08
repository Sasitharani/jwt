import express from 'express';
import { deleteImage } from '../controllers/deleteImageController.js'; // Ensure the correct path

const router = express.Router();

router.post('/delete-image', deleteImage); // Ensure the correct route path

export default router;
