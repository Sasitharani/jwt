const express = require('express');
const router = express.Router();
const fetchVotesDetailsController = require('../controllers/fetchVotesDetailsController');

router.get('/fetchVotesDetails', fetchVotesDetailsController.fetchVotesDetails);

module.exports = router;
