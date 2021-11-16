const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class UserPerson extends Model {
    // relaciones:
    static associate({ User, Gender, Location, ReportUserPost, ReportUserComment, Comment, Suggestion}) {
        this.belongsTo(Location, { as: 'location', foreignKey: 'location_id' });
        this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
        this.belongsTo(Gender, { as: 'gender', foreignKey: 'gender_id' });
        this.hasMany(ReportUserPost, { as: 'reportPosts', foreignKey: 'userAdoptante_id' , onDelete: 'cascade'});
        this.hasMany(Comment, { as: 'comments', foreignKey: 'userPerson_id', onDelete: 'cascade' });
        this.hasMany(Suggestion, { as: 'suggestions', foreignKey: 'userPerson_id', onDelete: 'cascade' });
    }
}
UserPerson.init(
    {
        // atributos:
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING(9),
            allowNull: false,
            unique: true,
        },
        document_number: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
        },
        rating: {
            type: DataTypes.INTEGER(5),
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