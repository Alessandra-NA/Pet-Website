const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class ReportUserPost extends Model {
    // relaciones:
    static associate({ User, UserPerson }) {
        this.belongsTo(User, { as: 'user', foreignKey: 'user_id' }); // El que es reportado
        this.belongsTo(UserPerson, {as: 'userAdoptante', foreignKey: 'userAdoptante_id'}) // El que reporta
    }
}
ReportUserPost.init(
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
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'ReportUserPost',
    }
);

module.exports = { ReportUserPost };