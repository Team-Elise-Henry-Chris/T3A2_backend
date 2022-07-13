const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic_controller");

router.route("/")
	.get(topicController.getAllTopics)
	.post(topicController.createNewTopic);

router.route("/:id")
	.get(topicController.getTopic)
	.delete(topicController.deleteTopic);

module.exports = router;
