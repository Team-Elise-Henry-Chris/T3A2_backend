const express = require("express")
const { refreshUserToken } = require("../controllers/user_controller")
const router = express.Router()
const userController = require("../controllers/user_controller")

router
    .route("/")
    .post(userController.createNewUser)
    .put(userController.loginUser)

router.get("/refresh", userController.refreshUserToken)

router.get("/logout", userController.logoutUser)

module.exports = router
