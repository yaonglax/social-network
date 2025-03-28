const sequelize = require("../config/db");
const Friendships = require("../models/Friendships");
const User = require("../models/User");
const { Op } = require("sequelize");

class FriendsController {
  async sendFriendRequest(req, res) {
    try {
      const { id1, id2 } = req.body;
      console.log("Received request with body:", req.body);
      // const user1_id = Math.min(id1, id2);
      // const user2_id = Math.max(id1, id2);
      if (typeof id1 !== "number" || typeof id2 !== "number") {
        return res
          .status(400)
          .json({ message: "id1 и id2 должны быть числами!" });
      }
      const existingFriendship = await Friendships.findOne({
        where: { id1, id2 },
      });
      if (existingFriendship) {
        return res
          .status(400)
          .json({ message: "Запрос на дружбу уже существует!" });
      }

      const friendship = await Friendships.create({ id1, id2 });

      return res.status(200).json({ message: "Запрос отправлен!", friendship });
    } catch (e) {
      console.error("Ошибка в sendFriendRequest:", e);
      return res.status(500).json({ message: "Ошибка при отправке запроса!" });
    }
  }

  async checkFriends(req, res) {
    try {
      const { id1, id2 } = req.query;

      if (!id1 || !id2 || isNaN(id1) || isNaN(id2)) {
        return res.status(400).json({ message: "Неверные параметры запроса" });
      }

      const friendship = await Friendships.findOne({
        where: {
          [Op.or]: [
            { user1_id: id1, user2_id: id2 },
            { user1_id: id2, user2_id: id1 },
          ],
        },
      });

      if (!friendship) {
        return res.status(200).json({ status: "not_found" });
      }

      res.status(200).json({
        status: friendship.status,
        direction: friendship.user1_id == id1 ? "direct" : "reverse",
      });
    } catch (e) {
      console.error("Ошибка при проверке дружбы:", e);
      res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }

  async fetchFriendsRequests(req, res) {
    try {
      const userId = req.query.id;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      const friendship = await Friendships.findAll({
        where: {
          user2_id: userId,
          status: "pending",
        },
        attributes: ["user1_id", "createdAt"],
      });
      res.status(200).json({
        count: friendship.length,
        requests: friendship,
      });
    } catch (e) {
      console.error("Error fetching friend requests:", e);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async acceptRequest(req, res) {
    try {
      const { id1, id2 } = req.body;

      if (!id1 || !id2 || isNaN(id1) || isNaN(id2)) {
        return res.status(400).json({ message: "Неверные параметры запроса" });
      }

      const user1_id = Math.min(id1, id2);
      const user2_id = Math.max(id1, id2);
      console.log("Received request with body:", req.body);
      const result = await sequelize.transaction(async (t) => {
        const [updatedCount] = await Friendships.update(
          { status: "accepted", user1_id, user2_id },
          {
            where: {
              [Op.or]: [
                { user1_id: id1, user2_id: id2 },
                { user1_id: id2, user2_id: id1 },
              ],
              status: "pending",
            },
            transaction: t,
          }
        );
        if (updatedCount === 0) {
          return res
            .status(404)
            .json({ message: "Запрос на дружбу не найден или уже обработан" });
        }

        await User.increment("friendsCount", {
          where: { user_id: id1 },
          transaction: t,
        });

        await User.increment("friendsCount", {
          where: { user_id: id2 },
          transaction: t,
        });
        return updatedCount;
      });
      res
        .status(200)
        .json({ message: "Статус успешно обновлён!", updatedCount: result });
    } catch (e) {
      console.error("Ошибка при принятии запроса на дружбу:", e.message);
      const status = e.message.includes("не найден") ? 404 : 500;
      res.status(status).json({
        message: e.message || "Ошибка сервера",
      });
    }
  }
}

module.exports = new FriendsController();
