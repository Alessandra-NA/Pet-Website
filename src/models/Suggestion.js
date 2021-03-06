const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Suggestion extends Model{
    // relaciones:
    static associate({ Establishment, UserPerson }) {
        this.belongsTo(UserPerson, { as: 'user', foreignKey: {allowNull: false, name: 'userPerson_id'}, onDelete: 'cascade'});
        this.belongsTo(Establishment, { as: 'establishment', foreignKey: 'establishment_id' });
    }
}
Suggestion.init(
    {
        // atributos:
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        photo1: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        photo2: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        photo3: {
            type: DataTypes.BLOB,
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
        district: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Suggestion',
    }
);

module.exports = { Suggestion };