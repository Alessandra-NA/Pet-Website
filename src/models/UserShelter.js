const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class UserShelter extends Model {
    // relaciones:
    static associate({ User }) {
        this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
    }
}
UserShelter.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ruc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'UserShelter',
    }
);

module.exports = { UserShelter };