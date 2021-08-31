const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class UserPerson extends Model {
    // relaciones:
    static associate({ User, Gender }) {
        this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
        this.belongsTo(Gender, { as: 'gender', foreignKey: 'gender_id' });
    }
}
UserPerson.init(
    {
        // atributos:
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        document_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'UserPerson',
    }
);

module.exports = { UserPerson };