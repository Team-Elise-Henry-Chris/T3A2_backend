const express = require("express")
const router = express.Router()
const postController = require("../controllers/post_controller")
const jwtAuthorize = require("../middleware/jwt_auth")
const adminAuth = require("../middleware/admin_auth")

router
    .route("/")
    .get(postController.getAllPosts)
    .post(jwtAuthorize, postController.createPost)

router
    .route("/:id")
    .get(postController.getPost)
    .patch(jwtAuthorize, postController.editPost)
    .delete(jwtAuthorize, postController.deletePost)

module.exports = router
