const jwt = require("jsonwebtoken")

const jwtAuthorize = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader?.startsWith("Bearer ")) {
        return res
            .status(401)
            .send({ error: "authorization header not present" })
    }

    // extract token from bearer token
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decrypted) => {
        if (err) {
            return res.status(403).send({ error: "invalid token" })
        }
        //hand verified user email and role to req body
        req.email = decrypted.email
        req.role = decrypted.role
        next()
    })
}

module.exports = jwtAuthorize
