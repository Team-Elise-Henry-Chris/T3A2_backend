const mongoose = require("./connection")

const PostModel = mongoose.model("Post", {
    title: { type: String, required: true },
    link: { type: String, required: true },
    resource_type: {
        type: String,
        enum: {
            values: [
                "Blog",
                "Video",
                "Article",
                "Podcast",
                "Book",
                "Course",
                "Other",
            ],
        },
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rating",
        },
    ],
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
    },
})

module.exports = PostModel
