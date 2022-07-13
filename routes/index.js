const express = require("express");
const router = express.Router();
const topicRoutes = require("./topic_routes");
const userRoutes = require("./user_routes")

router.use("/topic", topicRoutes);
router.use("/user", userRoutes)
// combine with user, rating, post routes

module.exports = router;
