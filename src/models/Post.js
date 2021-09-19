const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Post extends Model {
    // relaciones:
    static associate({ User, Pet }) {
        this.belongsTo(User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE' });
        this.belongsTo(Pet, { as: 'pet', foreignKey: 'pet_id' });
    }
}
Post.init(
    {
        // atributos:
    },
    {
        sequelize,
        modelName: 'Post',
    }
);

module.exports = { Post };