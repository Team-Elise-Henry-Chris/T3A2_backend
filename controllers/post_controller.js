const PostModel = require("../db/post_model")
const UserModel = require("../db/user_model")
const RatingModel = require("../db/rating_model")
const helper = require("./helpers")

const getAllPosts = async (req, res) => {
    res.send(await PostModel.find().populate("ratings"))
}

// need to change to get user as user email
const createPost = async (req, res) => {
    const postTitle = req.body.title
    const postLink = req.body.link
    const postType = req.body.resource_type
    const postTopicId = req.body.topic
    const postUser = await UserModel.findOne({ email: req.email })
    PostModel.create(
        {
            title: postTitle,
            link: postLink,
            resource_type: postType,
            topic: postTopicId,
            user: postUser._id,
        },
        (err, post) => {
            if (err) {
                res.status(422).send({ error: err.message })
            } else {
                res.status(201).send(post)
            }
        }
    )
}

const getPost = (req, res) => {
    PostModel.findById(req.params.id, async (err, post) => {
        if (err || post == null) {
            res.status(404).send({
                error: `Could not find post: ${req.params.id}`,
            })
        } else {
            const populatedPost = await post.populate("ratings")
            res.send(populatedPost)
        }
    })
}

const editPost = async (req, res) => {
    const foundPost = await PostModel.findById(req.params.id)
    if (!foundPost) {
        return res.status(422).send({ error: "post not found" })
    }

    if (!req.body.title || !req.body.resource_type) {
        return res
            .status(422)
            .send({ error: "request must contain new title and resource type" })
    }
    if (
        (await helper.belongsToUser(req.email, foundPost.user)) ||
        req.role == "admin"
    ) {
        foundPost.title = req.body.title
        foundPost.resource_type = req.body.resource_type
        await foundPost.save()
        res.status(200).send({ success: "post edited" })
    } else {
        return res.status(401).send({
            error: "you dont have permission to edit this",
        })
    }
}

const deletePost = async (req, res) => {
    const foundPost = await PostModel.findById(req.params.id)
    if (!foundPost) {
        return res.status(422).send({ error: "post not found" })
    }
    if (
        (await helper.belongsToUser(req.email, foundPost.user)) ||
        req.role == "admin"
    ) {
        foundPost.remove()
        res.status(200).send({ success: "post deleted" })
    } else {
        return res.status(401).send({
            error: "you dont have permission to delete this",
        })
    }
}

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    editPost,
    deletePost,
}
