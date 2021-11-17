const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Post extends Model {
    // relaciones:
    static associate({ User, Pet }) {
        this.belongsTo(User, { as: 'user', foreignKey: {allowNull: false, name: 'user_id'}, onDelete: 'cascade'});
        this.belongsTo(Pet, { as: 'pet', foreignKey: 'pet_id' });
    }
}
Post.init(
    {
        // atributos:
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Post',
    }
);

module.exports = { Post };
