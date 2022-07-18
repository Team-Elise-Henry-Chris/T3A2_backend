const PostModel = require("../db/post_model")

const getAllPosts = async (req, res) => {
    res.send(await PostModel.find())
}

const createPost = (req, res) => {
    PostModel.create(req.body, (err, post) => {
        if (err) {
            res.status(422).send({ error: err.message })
        } else {
            res.status(201).send(post)
        }
    })
}

const getPost = (req, res) => {
    PostModel.findById(req.params.id, (err, post) => {
        if (err || post == null) {
            res.status(404).send({
                error: `Could not find post: ${req.params.id}`,
            })
        } else {
            res.send(post)
        }
    })
}

const deletePost = (req, res) => {
    PostModel.findByIdAndDelete(req.params.id, (err, post) => {
        if (err || post == null) {
            res.status(422).send({
                error: `Could not find topic: ${req.params.id}`,
            })
        } else {
            res.sendStatus(204)
        }
    })
}

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    deletePost
 }
