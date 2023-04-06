const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        console.log(authHeader)
        const token = authHeader.split(' ')[1];
        console.log(token)
        if (token == null) return res.sendStatus(401);

        try {
            const verifyUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = verifyUser
            console.log(req.user)
            next()
        } catch (error) {
            res.sendStatus(401)
        }
    },
    checkRole: (req, res, next) => {
        if (req.user.isAdmin) return next()
        res.json({ status: 403, message: 'You are not admin' })
    }
}