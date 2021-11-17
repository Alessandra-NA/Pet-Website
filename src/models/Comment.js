const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Comment extends Model {
    // relaciones:
    static associate({ UserPerson, Establishment, ReportUserComment }) {
        this.belongsTo(UserPerson, { as: 'user', foreignKey: {allowNull: false, name: 'userPerson_id'}, onDelete: 'cascade'});
        this.belongsTo(Establishment, { as: 'establishment', foreignKey: 'establishment_id' });
        this.hasMany(ReportUserComment, { as: 'reportComment', foreignKey: 'comment_id' });
    }
}
Comment.init(
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
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Comment',
    }
);

module.exports = { Comment };
