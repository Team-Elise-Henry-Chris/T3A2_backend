const express = require("express");
const router = express.Router();
const TopicModel = require("../db/topic_model");

router.get("/", async (req, res) => {
	res.send(await TopicModel.find());
});

router.get("/:id", async (req, res) => {
	TopicModel.findByID(await req.params.id, (err, topic) => {
		if (err) {
			res.status(404).send({ error: `Could not find topic: ${req.params.id}` });
		} else {
			res.send(topic);
		}
	});
});

router.post("/", async (req, res) => {
	await TopicModel.create(req.body, (err, post) => {
		if (err) {
			res.status(422).send({ error: err.message });
		} else {
			res.status(201).send(post);
		}
	});
});

module.exports = router;
