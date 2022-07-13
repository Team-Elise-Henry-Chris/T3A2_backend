const TopicModel = require("../db/topic_model");

const getAllTopics = async (req, res) => {
	res.send(await TopicModel.find());
};

const getTopic = (req, res) => {
	TopicModel.findById(req.params.id, (err, topic) => {
		if (err) {
			res.status(404).send({ error: `Could not find topic: ${req.params.id}` });
		} else {
			res.send(topic);
		}
	});
};

const createNewTopic = (req, res) => {
	TopicModel.create(req.body, (err, topic) => {
		if (err) {
			res.status(422).send({ error: err.message });
		} else {
			res.status(201).send(topic);
		}
	});
};

const deleteTopic = (req, res) => {
	TopicModel.findByIdAndDelete(req.params.id, (err, topic) => {
		if (err || topic == null) {
			res.status(422).send({ error: `Could not find topic: ${req.params.id}` });
		} else {
			res.sendStatus(204);
		}
	});
};

module.exports = {
    getAllTopics,
    getTopic,
    createNewTopic,
    deleteTopic
}