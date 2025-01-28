const jwt = require('jsonwebtoken')
require("dotenv").config();

function verifyTokenMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
        } catch (e) {
            console.error(e.message)
            return res.status(403).json({message: 'Неверный или истёкший токен!'});
        }
    } else {
        return res.status(401).json({message: 'Нет токена'})
    }
}

module.exports = verifyTokenMiddleware
