const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Home route: lists all topics
router.get('/', topicController.getTopics);

// Create Topic
router.get('/topics/new', topicController.newTopicForm);
router.post('/topics', topicController.createTopic);

// View Topic Detail
router.get('/topic/:id', topicController.getTopic);

// Edit Topic
router.get('/topic/:id/edit', topicController.editTopicForm);
router.put('/topic/:id', topicController.updateTopic);

// Delete Topic
router.delete('/topic/:id', topicController.deleteTopic);

module.exports = router;
