const { Op } = require('sequelize');
const {  User, } = require('../models');
const { SESSION_NAME, SALT_ROUNDS } = require('../config/env');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getEditarTipoUsuario : async(req, res) => {
    try {
      return res.render('FORMULARIO_TEMPORAL_EDITAR_USUARIO', {title : 'Editar usuario TEMPORAL'})
      
    } catch{
      
    }
  },

  redireccionarTipoUsuarioEditar : async (req, res) => {
    try{
      const userType = req.body.tipo
      const username = req.body.username

      if (userType == 1)
      {
        res.redirect('/editar_usuario/people')
      }

      else if (userType == 2)
      {
        res.redirect('/editar_usuario/shelter')
      }


    }
    catch{

    }
  },

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
