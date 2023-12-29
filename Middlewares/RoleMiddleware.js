const jwt = require('jsonwebtoken')

function VerifyManagerRole(req, res, next) {
    try {
        jwt.verify(req.token, process.env.JWT_SECRET_KEY, (error, data) => {
            if (error) {
                return res.status(500).json({ message: 'Not a valid token' })
            }

            if (data.user.role !== 'manager') {
                return res.status(403).json({ message: "You're not authorized" })
            }

            req.user = data.user; 

            next()
        });
    } catch (error) {
        console.log('Error finding departments', error);
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { VerifyManagerRole }