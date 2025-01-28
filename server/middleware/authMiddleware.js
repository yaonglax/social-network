const jwt = require('jsonwebtoken');
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.status(401).json({message: 'Нет токена, доступ запрещён!'});
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(403).json({message: 'Неверный или истёкший токен!'});
    }
};

module.exports = authMiddleware;