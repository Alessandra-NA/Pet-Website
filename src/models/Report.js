const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Report extends Model {
    // relaciones:
    static associate({ User }) {
        this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
    }
}
Report.init(
    {
        // atributos:
        reason: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        commet: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Report',
    }
);

module.exports = { Report };