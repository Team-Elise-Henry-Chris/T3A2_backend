const express = require("express")
const { refreshUserToken } = require("../controllers/user_controller")
const router = express.Router()
const userController = require("../controllers/user_controller")

router
    .route("/")
    .post(userController.createNewUser)
    .put(userController.loginUser)

router.route("/refresh").get(userController.refreshUserToken)

module.exports = router
