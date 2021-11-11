const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class ReportEstablishment extends Model {
    // relaciones:
    static associate({ Establishment}) {
        this.belongsTo(Establishment, { as: 'establishment', foreignKey: 'establishment_id' });
    }
}
ReportEstablishment.init(
    {
        // atributos:
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'ReportEstablishment',
    }
);

module.exports = { ReportEstablishment };