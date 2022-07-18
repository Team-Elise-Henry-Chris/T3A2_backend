const PostModel = require("../db/post_model")

const getAllPosts = async (req, res) => {
    res.send(await PostModel.find())
}

const createPost = (req, res) => {
    PostModel.create(req.body, (err, topic) => {
        if (err) {
            res.status(422).send({ error: err.message })
        } else {
            res.status(201).send(topic)
        }
    })
}


const getAllPostsFromTopic = (topicId) => {

}

module.exports = {
    getAllPosts,
    createPost
 }
