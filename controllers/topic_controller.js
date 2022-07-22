const TopicModel = require("../db/topic_model")
const PostModel = require("../db/post_model")
const mongoose = require("mongoose")

const getAllTopics = async (req, res) => {
    res.send(await TopicModel.find())
}

const getTopicPosts = async (req, res) => {
	const foundTopic = await TopicModel.findById(req.params.id)
    PostModel.find(
        {
            topic: mongoose.Types.ObjectId(req.params.id),
        },
        (err, topicPosts) => {
            if (err) {
                res.status(422).send({ error: err.message })
			} else {
                console.log(topicPosts)
                res.status(200).send({topic: foundTopic, posts: topicPosts })
            }
        }
    )
}

const createNewTopic = (req, res) => {
    TopicModel.create(req.body, (err, topic) => {
        if (err) {
            res.status(422).send({ error: err.message })
        } else {
            res.status(201).send(topic)
        }
    })
}

const deleteTopic = (req, res) => {
    TopicModel.findByIdAndDelete(req.params.id, async (err, topic) => {
		if (err || topic == null) {
			res.status(422).send({
				error: `Could not find topic: ${req.params.id}`,
			})
		} else {
			// also deletes any posts associated with the topic
			await PostModel.deleteMany({ topic: req.params.id })
            res.sendStatus(204)
        }
    })
}

module.exports = {
    getAllTopics,
    getTopicPosts,
    createNewTopic,
    deleteTopic,
}
