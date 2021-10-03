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

      //Obtenemos el id de usuario de acuerdo al username
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

      if (userType == 1)
      {
        //En caso de UserPerson
        
        const usuarioP = await UserPerson.findOne({where : {user_id : idUsuario}})
        const locations = await Location.findOne({where : {id : usuarioP.location_id}}) 
        
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
        const usuarioS = await UserShelter.findOne({where : {user_id : idUsuario}})
        const locations = await Location.findOne({where : {id : usuarioS.location_id}})
        
        res.render('editar_usuario_shelter', {
          usuario : usuarioS,
          location : locations,
          username : username,
          genders : genders
          })
      }
      
    }
    catch{
    }
  },


  realizarEdicion : async (req,res) => {
    //Variables comunes
    const tipoUsuario = req.body.tipo
    const idABuscar = req.body.id
    const idLocation = req.body.idLocation

    const district = req.body.distrito
    const address = req.body.direccion
    //const photo = req.file.buffer
    const email = req.body.correo
    console.log(idABuscar)
    
    if (tipoUsuario == "people")
    {
      //Editamos datos de UserPerson
      //Parametros a editar
      const first_name = req.body.nombres
      const last_name = req.body.apellidos
      const document_number = req.body.gender_id
      const gender_id = req.body.sexo
      const phone_number = req.body.celular

      UserPerson.update({
        first_name : first_name,
        last_name : last_name,
        document_number : document_number,
        gender_id : gender_id,
        //photo : photo,
        address : address,
        email : email,
        phone_number : phone_number
      }, {where : {user_id : idABuscar}})

      //Editamos datos de ubicación
      Location.update({
        district : district,
        address : address
      }, {where : {id : idLocation}})
      
    }

    else if (tipoUsuario == "shelter")
    {
      //Editamos datos de UserShelter
      const name = req.body.nombre
      const ruc = req.body.ruc
      const phone_number = req.body.telefono

      UserShelter.update({
        name : name,
        ruc : ruc,
        email : email,
        //photo : photo,
        phone_number : phone_number
      }, {where : {user_id : idABuscar}})

      //Editamos datos de ubicación
      Location.update({
        district : district,
        address : address
      }, {where : {id : idLocation}})
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
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */
  
  logoutUser: async (req, res) => {
    req.session.destroy();
    console.log('saliendo')
    return res.redirect('/anuncios');
  }

  

};
