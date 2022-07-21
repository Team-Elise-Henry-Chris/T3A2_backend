const express = require("express")
const router = express.Router()
const userController = require("../controllers/user_controller")
const jwtAuthorize = require("../middleware/jwt_auth")


router
    .route("/")
    .post(userController.createNewUser)
    .put(userController.loginUser)

router.get("/refresh", userController.giveNewAccessToken)

router.get("/logout", userController.logoutUser)

router.get("/:id", jwtAuthorize, userController.getUser)

module.exports = router
