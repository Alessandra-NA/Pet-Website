const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Pet extends Model {
    // relaciones:
    static associate({ ActivityLevel, Size, Specie, Gender, Post }) {
        this.belongsTo(ActivityLevel, { as: 'activitylevel', foreignKey: 'activitylevel_id' });
        this.belongsTo(Size, { as: 'size', foreignKey: 'size_id' });
        this.belongsTo(Specie, { as: 'specie', foreignKey: 'specie_id' });
        this.belongsTo(Gender, { as: 'gender', foreignKey: 'gender_id' });
        this.hasOne(Post, { as: 'post', foreignKey: 'user_id' });
    }
}
Pet.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        story: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vacunado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        desparasitado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        sano: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        esterilizado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        microchip: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Pet',
    }
);

module.exports = { Pet };