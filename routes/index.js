const express = require("express")
const router = express.Router()
const topicRoutes = require("./topic_routes")
const userRoutes = require("./user_routes")
const postRoutes = require("./post_routes")
const ratingRoutes = require("./rating_routes")

router.use("/topic", topicRoutes)
router.use("/user", userRoutes)
router.use("/post", postRoutes)
router.use("/rating", ratingRoutes)
// combine with user, rating, post routes

module.exports = router
