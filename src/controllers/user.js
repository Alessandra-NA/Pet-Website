const { Op } = require('sequelize');
const {  User, } = require('../models');
const { SESSION_NAME, SALT_ROUNDS } = require('../config/env');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  crearUsuario: async (req, res) => {
    try{
      return res.render('crear_usuario', {title : 'Crear nuevo usuario'})
    }
    catch{}
  },

  editarUsuario: async(req,res) => {
    try{
      return res.render('editar_usuario', {title : 'Editar usuario'})
    }
    catch{}
  }

  

};
