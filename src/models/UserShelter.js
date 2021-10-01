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
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING(9),
            allowNull: false,
            unique: true,
        },
        ruc: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
        },
        rating: {
            type: DataTypes.INTEGER(5),
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