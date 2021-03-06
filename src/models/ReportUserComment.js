const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class ReportUserComment extends Model {
    // relaciones:
    static associate({ Comment }) {
        this.belongsTo(Comment, { as: 'comment', foreignKey: 'comment_id' });
    }
}
ReportUserComment.init(
    {
        // atributos:
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'ReportUserComment',
    }
);

module.exports = { ReportUserComment };