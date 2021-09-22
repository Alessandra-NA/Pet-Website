const { Op } = require('sequelize');
const {  User, } = require('../models');
const { SESSION_NAME, SALT_ROUNDS } = require('../config/env');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  editarUsuario: async (req, res) => {
    try{
      return res.render('editar_usuario', {title : 'Editar usuario'})
    }
    catch{}
  }

  

};
