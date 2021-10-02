const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Gender extends Model {
    // relaciones:
    
}
Gender.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Gender',
    }
);

module.exports = { Gender };