const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    try {
        if (!token) return res.status(200).json({ error: 'Token misssing, Please logout & login again' })
        const decode = jwt.verify(token, process.env.secretJWT)
        req.user = decode
    } catch (error) {
       return res.json({ error: 'invalid token' });
    }
    return next();
}

module.exports = {
    verifyToken
}