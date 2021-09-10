const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Location extends Model {
    // relaciones:
    static associate({ User }) {
        this.hasOne(User, { as: 'user', foreignKey: 'location_id' })
    }
}
Location.init(
    {
        // atributos:
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Location',
    }
);

module.exports = { Location };