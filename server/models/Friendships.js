const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Friendships = sequelize.define(
    "friendships",
    {
        user1_id: {type: DataTypes.INTEGER, primaryKey: true},
        user2_id: {type: DataTypes.INTEGER, primaryKey: true},
        status: {type: DataTypes.ENUM('pending', 'accepted', 'rejected'), allowNull: false, defaultValue: 'pending'}
    },
    {
        timestamps: true,
        indexes: [{
            unique: true,
            fields: ['user1_id', 'user2_id'],

        }],
        validate: {
            user1LessThanUser2() {
                if (this.user1_id >= this.user2_id) {
                    throw new Error('user1 must be less than user2')
                }
            }
        }
    }
);

module.exports = Friendships