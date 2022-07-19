const RatingModel = require("../db/rating_model")
const UserModel = require("../db/user_model")
const PostModel = require("../db/post_model")
const helper = require("./helpers")
const mongoose = require("mongoose")

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
            return (duplicateRating = true)
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

// const deleteRating = async (req, res) => {
//     const ratingId = req.params.id
//     const ratingObjectId = mongoose.Types.ObjectId(ratingId)

//     console.log(ratingId)
//     console.log(ratingObjectId)

//     const foundRating = await RatingModel.findById(ratingId)
//     console.log(foundRating)
//     if (!foundRating) {
//         return res.status(400).send({ error: "rating does not exist" })
//     }

//     const foundPost = await PostModel.find({
//         ratings: ratingObjectId,
//     })

//     if (!foundPost) {
//         return res.status(400).send({ error: "post does not exist" })
//     }

//     if (
//         (await helper.belongsToUser(req.email, foundRating.user)) ||
//         req.role == "admin"
//     ) {
//         foundPost.update({ ratings: { _id: ratingObjectId } })
//         foundPost.update(
//             { ratings: ratingObjectId },
//             { $set: "" },
//             function (err, rating) {}
//         )
//         foundRating.remove()
//         res.sendStatus(204)
//     }
// }

module.exports = {
    createRating,
    // deleteRating,
}
