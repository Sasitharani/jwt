import express from 'express';

const router = express.Router();

router.post('/spinWheel', (req, res) => {
  const { email, result } = req.body;

  // Handle the request and send a response
  console.log('Received spinWheel request:', { email, result });

  // Example response
  res.status(200).json({ message: 'spinWheel result updated successfully', email, result });
});

export default router;
