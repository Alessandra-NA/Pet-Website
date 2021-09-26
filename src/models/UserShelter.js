const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class UserShelter extends Model {
    // relaciones:
    static associate({ User, Location }) {
        this.belongsTo(Location, { as: 'location', foreignKey: 'location_id' })
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
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ruc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
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