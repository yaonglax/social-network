const User = require("../models/User");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator');

require("dotenv").config();

const generateAccessToken = (id, username) => {
    const payload = {
        id, username
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"})
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

                return res.status(400).json({message: 'Такого пользователя не существует!'})

            }
            const validPass = bcrypt.compareSync(password, user.user_pass)

            if (!validPass) {
                return res.status(401).json({message: 'Пароль неверный!'})
            }
            const token = generateAccessToken(user.user_id, username)
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'strict',
            });


            return res.status(200).json({message: 'Успешная авторизация!', user_id: user.user_id, token});
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Ошибка!'})
        }
    }

    async logout(req, res) {
        const token = req.cookies.token
        try {
            if (token) {
                res.clearCookie('token', {
                    httpOnly: true,
                    sameSite: 'strict'
                })
                return res.status(200).json({message: 'Вы вышли из аккаунта!'})
            } else {
                return res.status(401).json({message: 'Ошибка!'})
            }
        } catch (e) {
            return res.status(400).json({message: 'Ошибка сервера'})
        }
    }


}

module.exports = new AuthController()