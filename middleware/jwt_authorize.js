const jwt = require("jsonwebtoken")

const jwtAuthorize = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res
            .status(401)
            .send({ error: "authorization header not present" })
    }

    // extract token from bearer token
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decrypted) => {
        if (err) {
            return res.status(403).send({ error: "invalid token"})
        }
        req.email = decrypted.email //hand verified user email to req
        next()
    })
}

module.exports = jwtAuthorize
