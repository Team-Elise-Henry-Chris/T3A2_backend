const mongoose = require("./connection")

const RatingModel = mongoose.model("Rating", {
    rating: { type: Number, min: 1, max: 5, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

module.exports = RatingModel
