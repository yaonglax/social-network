const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
    "users",
    {
        // user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        // user_name: { type: DataTypes.STRING, allowNull: false },
        // user_surname: { type: DataTypes.STRING, allowNull: false },
        // userage: { type: DataTypes.INTEGER, allowNull: false },
        // usernickname: { type: DataTypes.STRING, allowNull: false, unique: true },
        // userlikes: { type: DataTypes.STRING, allowNull: false },
        // userdislikes: { type: DataTypes.STRING, allowNull: false },
        // user_prns: { type: DataTypes.STRING, allowNull: false },
        // user_pass: { type: DataTypes.STRING, unique: true },
        user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: DataTypes.STRING, allowNull: false},
        user_pass: {type: DataTypes.STRING, unique: true},
    },
    {
        timestamps: true,
    }
);

module.exports = User;
