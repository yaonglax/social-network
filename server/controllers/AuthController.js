const User = require("../models/User");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator');

require("dotenv").config();

const generateAccessToken = (id, username) => {
    const payload = {
        id, username
    }

    return jwt.sign(payload, process.env.SERCRET_KEY, {expiresIn: "24h"})
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Имя или пароль пользователя не могут быть пустыми'});
            }

            const {username, password} = req.body;

            if (!username || !password) {
                return res.status(400).json({message: "Имя или пароль не могут быть пустыми"});
            }

            const candidate = await User.findOne({where: {username}});

            if (candidate) {
                return res.status(403).json({message: 'Такой пользователь уже существует!'});
            }

            const hashedPass = bcrypt.hashSync(password, 7);

            const user = await User.create({username: username, user_pass: hashedPass});

            console.log(req.body);
            return res.json({message: 'Пользователь зарегистрирован!'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Ошибка при регистрации!'});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({where: {username}})

            if (!user) {
                res.status(400).json({message: 'Такого пользователя не существует!'})
            }
            const validPass = bcrypt.compareSync(password, user.user_pass)

            if (!validPass) {
                res.status(400).json({message: 'Пароль неверный!'})
            }
            const token = generateAccessToken(user.user_id, username)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка!'})
        }
    }
}

module.exports = new AuthController()