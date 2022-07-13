const mongoose = require("./connection");

const UserModel = mongoose.model("User", {
	username: {
		type: String,
		required: [true, "is required"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "is required"],
	}, // this shouldn't be plaintext
});

module.exports = UserModel;
