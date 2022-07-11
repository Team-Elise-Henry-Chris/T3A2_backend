const express = require("express");
const router = express.Router();
const topicRoutes = require("../routes/topic_routes");

router.use("/topic", topicRoutes);
// combine with user, rating, post routes

module.exports = router;
