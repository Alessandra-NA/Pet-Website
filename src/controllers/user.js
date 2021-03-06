const md5 = require('md5');
const { Op } = require('sequelize');
const {  User, UserPerson, UserShelter, Gender, Location, Post, Pet } = require('../models');
const { SESSION_NAME, SALT_ROUNDS, DB_DATABASE } = require('../config/env');


module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  redireccionarTipoUsuarioEditar : async (req, res) => {
    try{
      //const userType = req.body.tipo
      //const username = req.body.username

      let userType = req.session.userType
      let idUser = req.session.userId
      //let idUsuario

      console.log(req.query.user_id)
      console.log(req.query.type)

      if (req.query.user_id!=undefined && req.query.type!=undefined){
        userType = req.query.type
        idUser = req.query.user_id
      }
      

      //Obtenemos el id de usuario de acuerdo al username
      /*const usuarios = await User.findAll()
      for(let usuario of usuarios)
      {
        if (usuario.username == username) 
        {
            idUsuario = usuario.id
            break
        }
      }*/
      const genders = await Gender.findAll({ where: { [Op.or]: [{ id: 3 }, { id: 4 }, {id : 5}] } })

      if (userType == "person")
      {
        //En caso de UserPerson
        
        const usuarioP = await UserPerson.findOne({where : {id : idUser}})
        const locations = await Location.findOne({where : {id : usuarioP.location_id}}) 

        //Hallamos el username
        const usuarioCurrent = await User.findOne({where : {id : usuarioP.user_id}})
        const username = usuarioCurrent.username

        res.render('editar_usuario_people', {
          usuario : usuarioP,
          location : locations,
          username : username,
          genders : genders
        })
      }

      else if (userType == "shelter")
      {
        //En caso de SHELTER
        const usuarioS = await UserShelter.findOne({where : {id : idUser}})
        const locations = await Location.findOne({where : {id : usuarioS.location_id}})

        //Hallamos el username
        const usuarioCurrent = await User.findOne({where : {id : usuarioS.user_id}})
        const username = usuarioCurrent.username
        
        res.render('editar_usuario_shelter', {
          usuario : usuarioS,
          location : locations,
          username : username,
          genders : genders
          })
      }
      
    }
    catch (err) {
      console.log(err);
    }
  },


  realizarEdicion : async (req,res) => {

    try{
      
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
    
        //Editamos datos de ubicaci??n
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
  
        //Editamos datos de ubicaci??n
        Location.update({
          district : district,
          address : address
        }, {where : {id : idLocation}})
      }
  
      res.redirect('/')
    }
    catch (err) {
      console.log(err);
    }
  },

  getPerfilUsuario : async (req, res) => {
    try{
      const userType = req.session.userType
      const idUser = req.session.userId

      const usuario = await User.findOne({where : {}})

      /*//Obtener lista de posts del usuario
      const posts = await Post.findAll({ include: [
        {
            model: Pet,
            as: 'pet',          
        },          
      ],
      where:{user_id: idUser}}) */
      
      if (userType == "person")
      {
        const userPerson = await UserPerson.findOne({where : {id : idUser}})

        //Obtener lista de posts del usuario
        const usuario = await User.findOne({where : {id : userPerson.user_id}})
        const posts = await Post.findAll({ include: [
          {
              model: Pet,
              as: 'pet',          
          },          
        ],
        where:{user_id: usuario.id}})
        
        return res.render('perfil', {
          title : 'Perfil de usuario',
          usuario : imagesToBase645(userPerson),
          userType : userType,
          posts : imagesToBase64(posts)
        })
      }
      else if (userType == "shelter")
      {
        const userShelter = await UserShelter.findOne({where : {id : idUser}})

        //Obtener lista de posts del usuario
        const usuario = await User.findOne({where : {id : userShelter.user_id}})
        const posts = await Post.findAll({ include: [
          {
              model: Pet,
              as: 'pet',          
          },          
        ],
        where:{user_id: usuario.id}}) 

        return res.render('perfil', {
          title : 'Perfil de albergue',
          usuario : imagesToBase645(userShelter),
          userType : userType,
          posts : imagesToBase64(posts)
        })
      }
    }
    catch (err) {
      console.log(err);
    }
  },

  getCambiarContrase??a : async (req,res) => {
    try{
      console.log("llegue")
      return res.render('editar_contrase??a', {title : 'Cambiar contrase??a'})
    }
    catch (err) {
      console.log(err);
    }
  },

  cambiarContrase??a : async (req, res) => {
    try{
      const nuevaContrase??a = md5(req.body.password)
      const userType = req.session.userType
      const idUser = req.session.userId

      console.log(nuevaContrase??a)
      console.log(userType)
      console.log(idUser)

      //Diferenciamos que tipo de usuario es
      if (userType == "person")
      {
        
        const userPerson = await UserPerson.findOne({where : {id : idUser}})
        const user_id = userPerson.user_id

        //Actualizamos contrase??a
        User.update({
          password : nuevaContrase??a
        }, {where : {id : user_id}})

        res.redirect('/usuario/perfil')

      }
      else if (userType == "shelter")
      {
        const userShelter = await UserShelter.findOne({where : {id : idUser}})
        const user_id = userShelter.user_id

        //Actualizamos contrase??a
        User.update({
          password : nuevaContrase??a
        }, {where : {id : user_id}})

        res.redirect('/usuario/perfil')
      }
      
    }
    catch (err) {
      console.log(err);
    }
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */
  
  logoutUser: async (req, res) => {
    try{
      req.session.destroy();
      return res.redirect('/anuncios');
    }
    catch (err) {
      console.log(err);
    }
  },

};

imagesToBase645 = function (usuario) {
  if(usuario.photo){
    usuario.photo = Buffer.from(usuario.photo).toString('base64');
  }  
  return usuario      
}   
