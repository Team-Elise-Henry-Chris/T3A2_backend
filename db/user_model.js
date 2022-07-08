const mongoose = require("./connection");

const UserModel = mongoose.model("User", {
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true }, // this shouldn't be plaintext
});

module.exports = UserModel;
