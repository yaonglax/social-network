const User = require("../models/User");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Ошибка при получении пользователей!" });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Ошибка! Такого пользователя нет" });
    }
  }
  async getUserName(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      res.status(200).json(user.username);
    } catch (error) {
      res.status(500).json({ error: "Ошибка! Такого пользователя нет" });
    }
  }

  async getUserIdByName(req, res) {
    const { username } = req.query;
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.json({ user_id: user.user_id });
    } catch (e) {
      res.status(500).json({ e: "Ошибка сервера" });
    }
  }

  async getProfile(req, res) {
    const userId = req.user.id;
    const anotherUserId = req.query.anotherUserId || userId;
    try {
      const user = await User.findByPk(anotherUserId);
      console.log(req.user);

      if (!user) {
        return res.status(404).json({ message: "Такой профиль не найден!" });
      }

      res.status(200).json({
        id: user.user_id,
        username: user.username,
        friendsCount: user.friendsCount,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Ошибка получения профиля!" });
    }
  }

  async getUserProfile(req, res) {
    const { username } = req.params;

    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: "Такого пользователя нет!" });
      }

      res.json(user);
    } catch (e) {
      res.status(500).json({ message: "Ошибка сервера!" });
    }
  }
}

module.exports = new UserController();
