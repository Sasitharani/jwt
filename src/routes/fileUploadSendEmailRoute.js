import express from 'express';
import multer from 'multer';
import { fileUploadSendEmail } from '../controllers/fileUploadSendEmailController.js'; // Ensure the correct path

const router = express.Router();
const storage = multer.memoryStorage(); // Use memory storage to avoid saving to disk
const upload = multer({ storage });

router.post('/send-email', upload.single('file'), fileUploadSendEmail); // Ensure the correct route path

export default router;
