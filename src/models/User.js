const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {
    // relaciones:
    static associate({ UserType, Location, Post }) {
        this.belongsTo(UserType, { as: 'user_type', foreignKey: 'type_id' });
        this.belongsTo(Location, { as: 'location', foreignKey: 'location_id' })
        this.hasMany(Post, { as: 'posts', foreignKey: 'user_id' })
    }
}
User.init(
    {
        // atributos:
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

module.exports = { User };