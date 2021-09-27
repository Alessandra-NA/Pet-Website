const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class UserAdmin extends Model{
    // relaciones:
    static associate({ User }) {
        this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
    }
}
UserAdmin.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserAdmin',
    }
);

module.exports = { UserAdmin };