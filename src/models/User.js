const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {
    // relaciones:
    static associate({ Post }) {
        this.hasMany(Post, { as: 'posts', foreignKey: 'user_id' })
    }
}
User.init(
    {
        // atributos:
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('person', 'shelter', 'admin'),
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'User',
    }
);

module.exports = { User };