const RatingModel = require("../db/rating_model")
const UserModel = require("../db/user_model")
const PostModel = require("../db/post_model")
const helper = require("./helpers")

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
            duplicateRating = true
        }
    })

    if (!duplicateRating) {
        await RatingModel.create(
            { rating: req.body.rating, user: foundUser._id },
            (err, rating) => {
                if (err) {
                    return res.status(400).send({ error: err.message })
                }
                foundPost.ratings.push(rating._id)
                foundPost.save()
                res.status(201).send(rating)
            }
        )
    } else {
        res.status(400).send({ error: "duplicate review" })
    }
}

const deleteRating = async (req, res) => {
    const ratingId = req.params.id

    // check the rating exists
    const foundRating = await RatingModel.findById(ratingId)
    if (!foundRating) {
        return res.status(400).send({ error: "rating does not exist" })
    }

    // check the post exists
    const foundPost = await PostModel.findOne({
        ratings: ratingObjectId,
    })
    if (!foundPost) {
        return res.status(400).send({ error: "post does not exist" })
    }

    // check the user has authority to delete
    if (
        (await helper.belongsToUser(req.email, foundRating.user)) ||
        req.role == "admin"
    ) {
        // delete the rating reference id from post ratings array
        foundPost.update({ $pull: { ratings: ratingId } }, (err, data) => {
            console.log(data)
            if (err)
                return res.status(500).send({error: "error in deleting rating"})
        })
        // remove the rating
        foundRating.remove()
        res.sendStatus(204)
    }
}

module.exports = {
    createRating,
    deleteRating,
}
