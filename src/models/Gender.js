const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Gender extends Model {
    // relaciones:
    static associate({ Pet, UserPerson }) {
        this.hasOne(Pet, { as: 'pet', foreignKey: 'gender_id' })
        this.hasOne(UserPerson, { as: 'UserPerson', foreignKey: 'gender_id' })
    }
}
Gender.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Gender',
    }
);

module.exports = { Gender };