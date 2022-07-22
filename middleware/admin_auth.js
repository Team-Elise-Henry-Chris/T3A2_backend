// only allows access if user has the role 'admin'
// must be called after jwt_authorize middleware
const authorizeAdmin = (req, res, next) => {
    if (!req?.role) {
        return res.status(401).send({ error: "user role not present" })
    }

    if (req.role !== "admin") {
        return res.status(401).send({ error: "must be an admin" })
    }
    next()
}

module.exports = authorizeAdmin
