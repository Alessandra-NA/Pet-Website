const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {
    // relaciones:
    static associate({ Post }) {
        this.hasMany(Post, { as: 'posts', foreignKey: 'user_id' , onDelete: 'cascade'})
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
        flagReportado: {
            type: DataTypes.BOOLEAN(),
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'User',
    }
);

module.exports = { User };