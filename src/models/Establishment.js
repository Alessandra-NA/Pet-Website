const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Establishment extends Model{
    // relaciones:
    static associate({ Location, Comment, Suggestion }) {
        this.belongsTo(Location, { as: 'location', foreignKey: 'location_id' });
        this.hasMany(Comment, { as: 'comment', foreignKey: 'establishment_id', onDelete: 'cascade' });
        this.hasMany(Suggestion, { as: 'suggestions', foreignKey: 'establishment_id', onDelete: 'cascade' });
    }
}
Establishment.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        photo1: {
            type: DataTypes.ARRAY(DataTypes.BLOB),
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        link : {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Establishment',
    }
);

module.exports = { Establishment };