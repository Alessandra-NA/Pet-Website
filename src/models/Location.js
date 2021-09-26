const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Location extends Model {
    // relaciones:
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