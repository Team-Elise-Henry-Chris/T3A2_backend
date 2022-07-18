const RatingModel = require("../db/rating_model")
const UserModel = require("../db/user_model")
const PostModel = require("../db/post_model")

const createRating = async (req, res) => {
    // validate that the userId and postId is valid
    const foundUser = await UserModel.findOne({ email: req.email })
    const foundPost = await PostModel.findById(req.body.postId)

    // validate that the user hasn't already rated this post
    const populatedPost = foundPost.populate("ratings")
    try {
        populatedPost.ratings.forEach((rating) => {
            if (rating._id == foundUser._id) {
                return res.status(400).send({ error: "duplicate review" })
            }
        })
    } catch {}
    await RatingModel.create(
        { rating: req.body.rating, user: foundUser._id },
        (err, rating) => {
            if (err) {
                return res.status(400).send({ error: err.message })
            }
            foundPost.ratings.push(foundUser._id)
            foundPost.save()
            res.status(201).send(rating)
        }
    )
}

module.exports = {
    createRating,
}
