const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Comment extends Model {
    // relaciones:
    static associate({ User, Establishment }) {
        this.belongsTo(User, { as: 'user', foreignKey: {allowNull: false, name: 'user_id'}, onDelete: 'cascade'});
        this.belongsTo(Establishment, { as: 'establishment', foreignKey: 'establishment_id' });
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
    },
    {
        sequelize,
        modelName: 'Comment',
    }
);

module.exports = { Comment };
