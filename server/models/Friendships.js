const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Friendships = sequelize.define(
  "friendships",
  {
    user1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user1_id", "user2_id"],
        where: {
          status: "accepted",
        },
      },
      {
        fields: ["user2_id", "user1_id"],
      },
    ],
    validate: {
      checkIdsForAccepted() {
        if (this.status === "accepted" && this.user1_id >= this.user2_id) {
          throw new Error("user1_id must be less than user2_id");
        }
      },
    },
  }
);

module.exports = Friendships;
