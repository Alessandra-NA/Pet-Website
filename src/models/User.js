const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {
    // relaciones:
}
User.init(
    {
        // atributos:
    },
    {
        sequelize,
        modelName: 'User',
    }
);

module.exports = { User };