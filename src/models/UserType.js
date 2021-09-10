const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class UserType extends Model {
    // relaciones:
    static associate({ User }) {
        this.hasOne(User, { as: 'user', foreignKey: 'type_id' })
    }
}
UserType.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserType',
    }
);

module.exports = { UserType };