const sequelize = require('../db');

const db = {
  Sequelize: sequelize,
  sequelize,
  ...require('./User'),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = {
  ...db,
};
