const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Gender extends Model {
    // relaciones:
    static associate({ Pet, UserPerson }) {
        this.hasOne(Pet, { as: 'pet', foreignKey: 'gender_id' });
        this.hasOne(UserPerson, { as: 'userperson', foreignKey: 'gender_id' })
    }
}
Gender.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Gender',
    }
);

module.exports = { Gender };