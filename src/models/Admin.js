const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Admin extends Model {
    // relaciones:
    static associate({ UserAdmin }) {
        this.hasOne(UserAdmin, { as: 'useradmin', foreignKey: 'admin_id' });
    }
}
Admin.init(
    {
        // atributos:

    },
    {
        sequelize,
        modelName: 'Admin',
    }
);

module.exports = { Admin };