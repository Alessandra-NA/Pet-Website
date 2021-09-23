const sequelize = require('../db');

const db = {
  Sequelize: sequelize,
  sequelize,
  ...require('./ActivityLevel'),
  ...require('./Gender'),
  ...require('./Location'),
  ...require('./Pet'),
  ...require('./Post'),
  ...require('./Size'),
  ...require('./Specie'),
  ...require('./User'),
  ...require('./UserPerson'),
  ...require('./UserShelter'),
  ...require('./UserAdmin'),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = {
  ...db,
};
