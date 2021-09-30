const { Op } = require('sequelize');
const {  User, } = require('../models');
const { SESSION_NAME, SALT_ROUNDS } = require('../config/env');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  editarUsuarioPeople: async (req, res) => {
    try{
      return res.render('editar_usuario_people', {title : 'Editar usuario personal'})
    }
    catch{}
  },

  editarUsuarioShelter: async(req, res) => {
    try{
      return res.render('editar_usuario_shelter', {title : 'Editar usuario corporativo'})
    }
    catch{}
  }

  

};
