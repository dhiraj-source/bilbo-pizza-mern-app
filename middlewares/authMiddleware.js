const JWT = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({ eror: "Not Authorized" })

    }
    console.log("header things", authHeader)
    const token = authHeader.split(' ')[1]
    try {
        const payload = JWT.verify(token, process.env.SECRET_KEY)
        req.user = { userId: payload.userId }
        console.log(req.user)
        next()

    } catch (error) {
        return res.status(401).json({ error: "auth failed" })

    }

}

module.exports = authMiddleware;