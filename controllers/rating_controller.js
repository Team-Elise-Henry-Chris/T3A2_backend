const RatingModel = require("../db/rating_model")
const UserModel = require("../db/user_model")
const PostModel = require("../db/post_model")

const createRating = async (req, res) => {
    const foundUser = await UserModel.findById(req.id)
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

const editRating = async (req, res) => {
    // check the rating exists
    const foundRating = await RatingModel.findById(req.params.id)
    if (!foundRating) {
        return res.status(400).send({ error: "rating does not exist" })
    }

    // check the user has authority to update, and proceed accordingly
    if (req.id == foundRating.user || req.role == "admin") {
        foundRating.rating = req.body.rating
        foundRating.save((err, rating) => {
            if (err) {
                return res.status(500).send({ error: "error updating rating" })
            } else {
                return res.status(200).send(rating)
            }
        })
    } else {
        return res.status(401).send({
            error: "you dont have permission to edit this rating",
        })
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
        ratings: ratingId,
    })
    if (!foundPost) {
        return res.status(400).send({ error: "post does not exist" })
    }

    // check the user has authority to delete
    if (req.id == foundRating.user || req.role == "admin") {
        // delete the rating reference id from post ratings array
        foundPost.update({ $pull: { ratings: ratingId } }, (err, data) => {
            if (err)
                return res
                    .status(500)
                    .send({ error: "error in deleting rating" })
        })
        // remove the rating
        foundRating.remove()
        res.sendStatus(204)
    } else {
    }
}

module.exports = {
    createRating,
    editRating,
    deleteRating,
}
