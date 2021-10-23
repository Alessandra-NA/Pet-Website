const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Suggestion extends Model{
    // relaciones:
    static associate({ Establishment, Location }) {
        this.belongsTo(Location, { as: 'location', foreignKey: 'location_id' });
        this.belongsTo(Establishment,{as: 'establishment', foreignKey: 'establishment_id'});
    }
}
Suggestion.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        photo: {
            type: DataTypes.ARRAY(DataTypes.BLOB),
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        link : {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Suggestion',
    }
);

module.exports = { Suggestion };