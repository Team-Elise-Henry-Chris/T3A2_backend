const mongoose = require("./connection");

const RatingModel = mongoose.model("Rating", {
	rating: { type: Number, min: 1, max: 5, required: true },
});

module.exports = RatingModel;
