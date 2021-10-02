const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Specie extends Model {
    // relaciones:
    static associate({ Pet }) {
        this.hasOne(Pet, { as: 'pet', foreignKey: 'specie_id' })
    }
}
Specie.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Specie',
    }
);

module.exports = { Specie };