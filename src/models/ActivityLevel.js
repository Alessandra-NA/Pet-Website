const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class ActivityLevel extends Model {
    // relaciones:
    static associate({ Pet }) {
        this.hasOne(Pet, { as: 'pet', foreignKey: 'activitylevel_id' })
    }
}
ActivityLevel.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'ActivityLevel',
    }
);

module.exports = { ActivityLevel };