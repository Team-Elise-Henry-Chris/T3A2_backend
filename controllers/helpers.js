const UserModel = require("../db/user_model")

const belongsToUser = async (requestEmail, comparisonUser) => {
    const foundUser = await UserModel.findOne({ email: requestEmail })
    return (foundUser._id.equals(comparisonUser))
}

module.exports = {
    belongsToUser
}