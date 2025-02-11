import express from 'express';
import db from '../../db.js';

const router = express.Router();

router.get('/logs', (req, res) => {
  db.query('SELECT * FROM logs ORDER BY timestamp DESC', (err, results) => {
    if (err) {
      console.error('Error fetching logs:', err);
      res.status(500).send('Error fetching logs');
    } else {
      res.status(200).json(results);
    }
  });
});

export default router;
