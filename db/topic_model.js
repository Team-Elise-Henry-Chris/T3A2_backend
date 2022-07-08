const mongoose = require("./connection");

const TopicModel = mongoose.model("Topic", {
    topic_name: {
        type: String,
        required: true,
    },
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	],
});

module.exports = PostModel;
