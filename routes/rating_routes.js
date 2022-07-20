const express = require("express")
const router = express.Router()
const ratingController = require("../controllers/rating_controller")
const jwtAuthorize = require("../middleware/jwt_auth")
const adminAuth = require("../middleware/admin_auth")

router
    .route("/")
    .post(jwtAuthorize, ratingController.createRating)

router
    .route("/:id")
    .delete(jwtAuthorize, ratingController.deleteRating)
    
module.exports = router
