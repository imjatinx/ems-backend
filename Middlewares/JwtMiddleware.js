function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (typeof (authHeader) !== 'undefined') {
        const bearer = authHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next()
    } else {
        return res.json({ message: "Authentication parameter missing" })
    }
}

module.exports = { verifyJWT }