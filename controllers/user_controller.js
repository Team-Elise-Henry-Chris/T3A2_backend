const UserModel = require("../db/user_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createNewUser = async (req, res) => {
    // encrypt password with bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = req.body.username
    const user_email = req.body.email

    // create the user account
    UserModel.create(
        { username: user, email: user_email, password: hashedPassword },
        (err, user) => {
            if (err) {
                res.status(422).send(err.message)
            } else {
                res.status(201).send({
                    success: `User ${user.username} created successfully`,
                })
            }
        }
    )
}

const loginUser = async (req, res) => {
    // handles email OR username for login
    let query
    if (req.body.email) {
        query = { email: req.body.email }
    } else if (req.body.username) {
        query = { username: req.body.username }
    } else {
        return res.status(422).send({ error: "email or username required" })
    }

    // find the user associated with email/username
    foundUser = await UserModel.findOne(query)
    if (!foundUser) {
        return res.status(422).send({ error: "user not found" })
    }

    // check password is correct
    const passwordMatch = await bcrypt.compare(
        req.body.password,
        foundUser.password
    )

    if (passwordMatch) {
        // create access and refresh tokens
        const accessToken = jwt.sign(
            {
                id: foundUser._id,
                role: foundUser.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2h" }
        )
        const refreshToken = jwt.sign(
            {
                id: foundUser._id,
                role: foundUser.role,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        )

        // save refresh token to database
        foundUser.refresh_token = refreshToken
        await foundUser.save()

        // send refresh cookie and access token in response
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(200)
            .send({
                success: "successfully logged in",
                accessToken,
            })
    } else {
        res.status(401).send({ error: "invalid password" })
    }
}

const giveNewAccessToken = async (req, res) => {
    // checks for refresh token in cookie, and matches it to a user
    if (!req.cookies?.jwt) {
        return res.status(401).send({ error: "request missing refresh token" })
    }
    const refreshToken = req.cookies.jwt

    const foundUser = await UserModel.findOne({ refresh_token: refreshToken })
    if (!foundUser) {
        return res.status(403).send({ error: "refresh token invalid" })
    }

    // decode the jwt token and if valid, grant a new access token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .send({ error: "refresh token could not be decoded" })
            } else if (!foundUser._id.equals(decoded.id)) {
                return res.status(403).send({ error: "refresh token invalid" })
            } else {
                const accessToken = jwt.sign(
                    {
                        id: foundUser._id,
                        role: foundUser.role,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "2h" }
                )
                res.status(200).send({
                    success: "new access token granted",
                    accessToken,
                })
            }
        }
    )
}

const logoutUser = async (req, res) => {
    // check for a refresh token cookie
    if (!req.cookies?.jwt) {
        return res
            .status(400)
            .send({ error: "no cookies found, you are already logged out" })
    }

    // match the refresh token to a user
    const refreshToken = req.cookies.jwt
    const foundUser = await UserModel.findOne({ refresh_token: refreshToken })
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true })
        return res.sendStatus(204)
    }

    // and delete it from the database
    foundUser.refresh_token = ""
    await foundUser.save()
    res.clearCookie("jwt", { httpOnly: true }).sendStatus(204)
}

const getUser = (req, res) => {
    // find the user and strip sensitive information out
    UserModel.findById(
        req.params.id,
        "-refresh_token -password -__v",
        (err, user) => {
            if (err) {
                res.status(422).send({
                    error: `Could not find user: ${req.params.id}`,
                })
            } else {
                // returns full user details to admins or if it is the current
                // users profile
                if (req.id == user._id || req.role == "admin") {
                    return res.status(200).send(user)
                } else {
                    return res.status(200).send({ username: user.username })
                }
            }
        }
    )
}

module.exports = {
    createNewUser,
    loginUser,
    giveNewAccessToken,
    logoutUser,
    getUser,
}
