const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Size extends Model {
    // relaciones:
    static associate({ Pet }) {
        this.hasOne(Pet, { as: 'pet', foreignKey: 'size_id' })
    }
}
Size.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Size',
    }
);

module.exports = { Size };