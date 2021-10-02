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
        flagReportado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        reason:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        comment:{
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        photo:{
            type: DataTypes.BLOB,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Post',
    }
);

module.exports = { Post };
