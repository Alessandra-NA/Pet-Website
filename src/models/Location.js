const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Location extends Model {
    // relaciones:
}
Location.init(
    {
        // atributos:
        country: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        province: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        district: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Location',
    }
);

module.exports = { Location };