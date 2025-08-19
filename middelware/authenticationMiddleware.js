const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send();
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send();
        }
        req.user = decoded;
        next();
    });
}

module.exports = authenticationMiddleware;