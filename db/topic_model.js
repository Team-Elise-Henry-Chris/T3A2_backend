const mongoose = require("./connection");

const TopicModel = mongoose.model("Topic", {
    topic_name: {
        type: String,
        required: true,
    },
    // TODO: image
});

module.exports = TopicModel;
