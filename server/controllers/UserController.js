const User = require("../models/User");

class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error: "Ошибка при получении пользователей!"});
        }
    };

    async getUserById(req, res) {
        const {id} = req.params;
        try {
            const user = await User.findByPk(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: "Ошибка! Такого пользователя нет"});
        }
    };


    async getProfile(req, res) {

        const userId = req.user.id
        try {
            const user = await User.findByPk(userId)
            console.log(req.user)

            if (!user) {
                return res.status(404).json({message: "Такой профиль не найден!"})
            }

            res.status(200).json({
                id: user.user_id,
                username: user.username
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({message: 'Ошибка получения профиля!'})
        }
    }
}


module.exports = new UserController;
