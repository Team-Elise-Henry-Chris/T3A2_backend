const express = require("express")
const router = express.Router()
const topicController = require("../controllers/topic_controller")
const jwtAuthorize = require("../middleware/jwt_authorize")

router
    .route("/")
    .get(topicController.getAllTopics)
    .post(jwtAuthorize, topicController.createNewTopic)

router
    .route("/:id")
    .get(topicController.getTopic)
    .delete(jwtAuthorize, topicController.deleteTopic)

module.exports = router
