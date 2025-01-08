import express from 'express';
import { getAllImages } from '../controllers/getAllImagesController.js'; // Ensure the correct path

const router = express.Router();

//router.post('/delete-image', deleteImage); // Ensure the correct route path
router.get('/images', getAllImages); // Ensure the correct route path

export default router;