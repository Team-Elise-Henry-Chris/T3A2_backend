const RatingModel = require("../db/rating_model")
const UserModel = require("../db/user_model")
const PostModel = require("../db/post_model")

const createRating = async (req, res) => {
    const foundUser = await UserModel.findOne({ email: req.email })
    const foundPost = await PostModel.findById(req.body.postId)

    if (!foundUser || !foundPost) {
        return res.status(400).send({ error: "user or post not found" })
    }

    const populatedPost = await foundPost.populate("ratings")
    let duplicateRating = false

    populatedPost.ratings.forEach((rating) => {
        if (rating.user.equals(foundUser._id)) {
            return duplicateRating = true
        }
    })
    if (!duplicateRating) {
        await RatingModel.create(
            { rating_num: req.body.rating, user: foundUser._id },
            (err, rating) => {
                if (err) {
                    return res.status(400).send({ error: err.message })
                }
                foundPost.ratings.push(rating._id).save()
                res.status(201).send(rating)
            }
        )
    } else {
        res.status(400).send({ error: "duplicate review" })
    }
}

const deleteRating = async (req, res) => {
    const foundPost = await PostModel.findById(req.params.id)
    if (!foundPost) {
        return res.status(422).send({ error: "post not found" })
    }
    if (
        (await helper.belongsToUser(req.email, foundPost.user)) ||
        req.role == "admin"
    ) {
        foundPost.remove()
        res.status(200).send({ success: "post deleted" })
    } else {
        return res.status(401).send({
            error: "you dont have permission to delete this",
        })
    }
}

module.exports = {
    createRating,
}
