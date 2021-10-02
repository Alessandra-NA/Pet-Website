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
        
        const genders = await Gender.findAll()
        const usuariosP = await UserPerson.findAll()
        const usuariosPeople = []
        for (let usuarioP of usuariosP)
        {
          if (usuarioP.user_id == idUsuario)
          {
            usuariosPeople.push({
              first_name : usuarioP.first_name,
              last_name : usuarioP.last_name,
              photo : usuarioP.photo,
              phone_number : usuarioP.phone_number,
              document_number : usuarioP.document_number,
              email : usuarioP.email,
              location_id : usuarioP.location_id,
              gender_id : usuarioP.gender_id,
              user_id : usuarioP.user_id
            })
          }
        }
        
        const locations = await Location.findAll()
        const location1 = []
        
        

        for (let location of locations) 
        {
          if (location.id == usuariosPeople[0].location_id)
          { 
            location1.push({
              district : location.district,
              address : location.address
            })
          }
        }
        

        res.render('editar_usuario_people', {
          usuario : usuariosPeople[0],
          location : location1[0],
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
    const id = req.body.id

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
      //Obtenemos UsuarioPeople por id
      const usuarios = await UserPerson.findAll()
      const usuarioEncontrado = []

      for (let usuario of usuarios){
        if (usuario.user_id == id)
        {
          usuarioEncontrado.push({
            first_name : usuario.first_name,
            last_name : usuario.last_name,
            photo : usuario.photo,
            phone_number : usuario.phone_number,
            document_number : usuario.document_number,
            email : usuario.email,
            location_id : usuario.location_id,
            gender_id : usuario.gender_id,
            user_id : usuario.user_id
          })
        }
      }

      usuarioEncontrado[0].first_name = first_name
      usuarioEncontrado[0].last_name = last_name
      usuarioEncontrado[0].document_number = document_number
      usuarioEncontrado[0].gender_id = gender_id
      usuarioEncontrado[0].address = address
      usuarioEncontrado[0].email = email
      usuarioEncontrado[0].phone_number = phone_number

      await usuarioEncontrado.save()
    }

    else if (tipoUsuario = "shelter")
    {

    }

    redirect('/')
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
