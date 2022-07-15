const mongoose = require("./connection")

const UserModel = mongoose.model("User", {
    username: {
        type: String,
        required: [true, "a username required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "an email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "a password is required"],
    },
    refresh_token: {
        type: String,
    },
    role: {
        type: String,
        enum: { values: ["user", "admin"] },
        default: "user",
        required: true,
    },
})

module.exports = UserModel
