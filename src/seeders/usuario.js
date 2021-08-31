const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/env');


module.exports = async () => {
  await require('../mongo/db')();
  const users = 
    [
    /*{
      atrib1 : '',
      atrib2: '',
      atribPwd: bcrypt.hashSync('example', SALT_ROUNDS),
      ...
    },*/
  ]
  await Usuario.bulkCreate(users);
};
