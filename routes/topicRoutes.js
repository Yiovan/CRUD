const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Home route: lists all topics
router.get('/', topicController.getTopics);

module.exports = router;
