const express = require('express');
const router = express.Router();
const updateVotesController = require('../controllers/updateVotesController');

router.post('/updateVotes', updateVotesController.updateVotes);

module.exports = router;
