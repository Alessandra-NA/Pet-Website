const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {
    // relaciones:
    static associate({ Post, ReportUserPost, Comment, Suggestion}) {
        this.hasMany(Post, { as: 'posts', foreignKey: 'user_id' , onDelete: 'cascade'});
        this.hasMany(ReportUserPost, { as: 'reportPosts', foreignKey: 'user_id' , onDelete: 'cascade'});

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