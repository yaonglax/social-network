const Friendships = require("../models/Friendships");

class FriendsController {
  async sendFriendRequest(req, res) {
    try {
      const { id1, id2 } = req.body;
      console.log("Received request with body:", req.body);
      const user1_id = Math.min(id1, id2);
      const user2_id = Math.max(id1, id2);
      if (typeof id1 !== "number" || typeof id2 !== "number") {
        return res
          .status(400)
          .json({ message: "id1 и id2 должны быть числами!" });
      }
      const existingFriendship = await Friendships.findOne({
        where: { user1_id, user2_id },
      });
      if (existingFriendship) {
        return res
          .status(400)
          .json({ message: "Запрос на дружбу уже существует!" });
      }

      const friendship = await Friendships.create({ user1_id, user2_id });

      return res.status(200).json({ message: "Запрос отправлен!", friendship });
    } catch (e) {
      console.error("Ошибка в sendFriendRequest:", e);
      return res.status(500).json({ message: "Ошибка при отправке запроса!" });
    }
  }

  async checkFriends(req, res) {
    try {
      const { id1, id2 } = req.query;
      const user1_id = Math.min(id1, id2);
      const user2_id = Math.max(id1, id2);
      const friendship = await Friendships.findOne({
        where: {
          user1_id,
          user2_id,
        },
      });

      res.status(200).json(friendship.status);
    } catch (e) {
      res.status(400).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new FriendsController();
