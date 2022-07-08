const mongoose = require("./connection");

const PostModel = mongoose.model("Post", {
	title: String,
	link: String,
	resource_type: String,
	date_created: {
		type: Date,
		default: Date.now,
    },
});

module.exports = PostModel;
