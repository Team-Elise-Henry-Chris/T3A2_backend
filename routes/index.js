const express = require("express")
const router = express.Router()
const topicRoutes = require("./topic_routes")
const userRoutes = require("./user_routes")
const postRoutes = require("./post_routes")
const ratingRoutes = require("./rating_routes")

// These routes are prefixed with /api/v1/ (from app.js)
router.use("/topic", topicRoutes)
router.use("/user", userRoutes)
router.use("/post", postRoutes)
router.use("/rating", ratingRoutes)

module.exports = router
