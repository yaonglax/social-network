const User = require("../models/User");

class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error: "Ошибка!"});
        }
    };

    async getUserById(req, res) {
        const {id} = req.params;
        try {
            const user = await User.findByPk(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: "Ошибка!"});
        }
    };
}

module.exports = new UserController;
