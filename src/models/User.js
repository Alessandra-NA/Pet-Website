const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {
    // relaciones:
    static associate({ Post, Comment }) {
        this.hasMany(Post, { as: 'posts', foreignKey: 'user_id' , onDelete: 'cascade'});
        this.hasMany(Comment, { as: 'comments', foreignKey: 'user_id' });
    }
}
User.init(
    {
        // atributos:
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('person', 'shelter', 'admin'),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('actived', 'reported', 'blocked'),
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'User',
    }
);

module.exports = { User };