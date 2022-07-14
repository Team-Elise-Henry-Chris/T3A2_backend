const express = require("express")
const router = express.Router()
const userController = require("../controllers/user_controller")

router
    .route("/")
    .post(userController.createNewUser)
    .put(userController.loginUser)

module.exports = router