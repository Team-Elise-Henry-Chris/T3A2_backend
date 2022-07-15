const express = require("express")
const router = express.Router()
const topicController = require("../controllers/topic_controller")
const jwtAuthorize = require("../middleware/jwt_auth")
const adminAuth = require("../middleware/admin_auth")

router
    .route("/")
    .get(topicController.getAllTopics)
    .post(jwtAuthorize, adminAuth, topicController.createNewTopic)

router
    .route("/:id")
    .get(topicController.getTopic)
    .delete(jwtAuthorize, topicController.deleteTopic)

module.exports = router
