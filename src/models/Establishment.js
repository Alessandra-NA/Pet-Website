const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Establishment extends Model{
    // relaciones:
    static associate({ Location, Comment, Suggestion }) {
        this.belongsTo(Location, { as: 'location', foreignKey: 'location_id' });
        this.hasMany(Comment, { as: 'comments', foreignKey: 'establishment_id', onDelete: 'cascade' });
        this.hasMany(Suggestion, { as: 'suggestions', foreignKey: 'establishment_id', onDelete: 'cascade' });
    }
}
Establishment.init(
    {
        // atributos:
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        photo: {
            type: DataTypes.ARRAY(DataTypes.BLOB),
            allowNull: true,
            /*validate: {
                maxPhoto(value) {
                  if (value.length >= 4) {
                    throw new Error('Ya se ha insertado más de 4 imágenes')
                  }
                }  
            }*/
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ofPets:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        link : {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Establishment',
    }
);

module.exports = { Establishment };