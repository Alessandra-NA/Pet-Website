const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class UserAdmin extends Model {
    // relaciones:
    static associate({ User, Admin }) {
        this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
        this.belongsTo(Admin, { as: 'admin', foreignKey: 'admin_id' });
    }
}
UserAdmin.init(
    {
        // atributos:
        
    },
    {
        sequelize,
        modelName: 'UserAdmin',
    }
);

module.exports = { UserAdmin };