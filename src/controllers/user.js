const { Op } = require('sequelize');
const {  User, UserPerson, UserShelter, Gender, Location } = require('../models');
const { SESSION_NAME, SALT_ROUNDS, DB_DATABASE } = require('../config/env');

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
      let idUsuario

      if (userType == 1)
      {

        //Obtenemos el usuario de acuerdo al username
        
        const usuarios = await User.findAll()
        for(let usuario of usuarios)
        {
          if (usuario.username == username) 
          {
              idUsuario = usuario.id
              break
          }
        }
        
        const genders = await Gender.findAll({ where: { [Op.or]: [{ id: 3 }, { id: 4 }, {id : 5}] } })
        const usuarioP = await UserPerson.findAll({where : {username : username}})
        const locations = await Location.findAll({where : {id : usuarioP.location_id}})

        res.render('editar_usuario_people', {
          usuario : usuarioP,
          location : locations,
          username : username,
          genders : genders
        })
      }

      else if (userType == 2)
      {
        //En caso de SHELTER
        res.redirect('/editar_usuario/shelter')
      }
    }
    catch{
    }
  },


  realizarEdicion : async (req,res) => {
    const tipoUsuario = req.body.tipo
    const idABuscar = req.body.id

    //Parametros a editar
    const first_name = req.body.nombres
    const last_name = req.body.apellidos
    const document_number = req.body.gender_id
    const gender_id = req.body.sexo
    const address = req.body.redireccionarTipoUsuarioEditar
    //foto
    const email = req.body.correo
    const phone_number = req.body.celular
    
    if (tipoUsuario == "people")
    {
      console.log("gozu")
      //Obtenemos UsuarioPeople por id
    
      UserPerson.update({
        first_name : first_name,
        last_name : last_name,
        document_number : document_number,
        gender_id : gender_id,
        address : address,
        email : email,
        phone_number : phone_number
      }, {where : {id : idABuscar}})
      
    }

    else if (tipoUsuario = "shelter")
    {

    }

    res.redirect('/')
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
