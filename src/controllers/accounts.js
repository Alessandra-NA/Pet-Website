const { Post, Pet, User, UserPerson, UserShelter, Establishment, Suggestion, Location } = require('../models');
const { SESSION_NAME, SALT_ROUNDS, DB_DATABASE } = require('../config/env');
const md5 = require('md5');
const { Op } = require('sequelize');
const { ReportUserPost } = require('../models/ReportUserPost');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getAccounts : async (req, res) => {
    try {
      const tipoCuenta = parseInt(req.query.tipo_cuenta)
      const persons = await UserPerson.findAll({include : {all : true}})
      const shelters = await UserShelter.findAll({include : {all : true}})

      if (tipoCuenta == 0) {
        User.findAll({include: {all: true}, where : {type : 'person'}}).then(response => {

          res.render('accountManager', {
            title: 'Administrar cuentas de personas', 
            users: response.filter(user => user.type != 'admin'),
            childUsers : persons,
            type : "personas"
          })
        })
      } 

      else if (tipoCuenta == 1){
        User.findAll({include: {all: true}, where : {type : 'shelter'}}).then(response => {
         
          res.render('accountManager', {
            title: 'Administrar cuentas de albergue', 
            users: response.filter(user => user.type != 'admin'),
            childUsers : shelters,
            type : "albergues"
          })
        })
      }

      else if (tipoCuenta == 2){

        const establecimientos = await Establishment.findAll({include : {all : true}})

        res.render('accountPetFriendlyManager', {
          title : 'Administrar establecimientos Pet Friendly',
          establecimientos : establecimientos
        })
      }
    }
    catch (err) {
      console.log(err);
    }
  },

  /*LO DE ABAJO ESTA SIENDO REEMPLAZADO POR FUNCION getAccounts
  showAccounts: (req, res) => {
    try {
      if(req.session.userType != 'admin'){
        res.redirect('/')
      }else{

        User.findAll({include: {all: true}}).then(response => {
          res.render('accountManager', {
            title: 'Accounts', 
            users: response.filter(user => user.type != 'admin')
          })
        })
      }
    }
    catch { }
  },*/

  getReportesAdopcion : async (req, res) => {
    try{
      const user_id = req.query.user_id
      const reportesAdopcion = await ReportUserPost.findAll({include : {all : true}, where : {user_id : user_id}})

      //Datos del usuario reportado
      let userChild = null
      const user = await User.findOne({include : {all : true}, where : {id : user_id}})
      
      if (user.type == "person"){
        userChild = await UserPerson.findOne({include : {all : true}, where : {user_id : user_id}})
      } else {
        userChild = await UserShelter.findOne({include : {all : true}, where : {user_id : user_id}})
      }

      //Se manda para hallar datos de usuario reportante
      const UsuariosPeople = await UserPerson.findAll({include : {all : true}})

      return res.render('verReportesAdopcion', {
        title : 'Ver reportes adopción',
        reportes : imagesToBase6455(reportesAdopcion),
        user : user,
        userChild : imagesToBase644(userChild),
        usuariosPeople : imagesToBase6455(UsuariosPeople),
      })
    }

    catch(err) {
      console.log(err);
    }
  },



  getSugerencias : async (req,res) => {
    try {
      
      const estId = parseInt(req.params.estid)
      const establecimiento = await Establishment.findByPk(estId, {include : {all : true}})
      const sugerencias = await Suggestion.findAll({include : {all: true}, where : {establishment_id : estId}})

      const UsuariosPeople = await UserPerson.findAll({include : {all : true}})
      const UsuariosShelter = await UserShelter.findAll({include : {all : true}})

      return res.render('verSugerenciasEstablecimiento', {
        title : 'Ver sugerencias de establecimiento',
        sugerencias : imagesToBase6(sugerencias),
        establecimiento : imagesToBase7(establecimiento),
        usuariosPeople : imagesToBase6455(UsuariosPeople),
        usuariosShelter : imagesToBase6455(UsuariosShelter)
      })
    }
    catch (err) {
      console.log(err);
    }
  },

  confirmarSugerencia : async(req,res) => {
    try{
      let cancelar = false
      const estId = req.body.estid
      const sugId = req.body.sugid

      const sugerencia = await Suggestion.findByPk(sugId, {include : {all : true}})
      const establecimiento = await Establishment.findByPk(estId)

      //Buscamos LocationId a actualizar
      const location = await Location.findByPk(establecimiento.location_id)

      //Datos de sugerencia a confirmar
      let nombreS = req.body.nombreS
      let tipoS = req.body.tipoS
      let distritoS = req.body.distritoS
      let direccionS = req.body.direccionS
      let linkS = req.body.linkS

      if (nombreS == undefined)
      {
        nombreS = establecimiento.name
      }
      if (tipoS == undefined)
      {
        tipoS = establecimiento.type
      }
      
      if (distritoS == undefined) 
      {
        distritoS = location.district
      }
      if (direccionS == undefined) 
      {
        direccionS = location.address
      }
      
      if (linkS == undefined) 
      {
        linkS = establecimiento.link
      }

      //Definimos fotos
      let photoS = []

      photoS[0] = req.body.img1
      photoS[1] = req.body.img2
      photoS[2] = req.body.img3

      let photoA = []

      for (var i=0; i<photoS.length; i++){
        if (photoS[i]!=undefined){
          if (photoS[i] == 1){
            photoA.push(sugerencia.photo1)
          }
          else if (photoS[i] == 2){
            photoA.push(sugerencia.photo2)
          }
          else if (photoS[i] == 3){
            photoA.push(sugerencia.photo3)
          }
          
        }
      }

      let photo1 = establecimiento.photo1
      let photo2 = establecimiento.photo2
      let photo3 = establecimiento.photo3
      let photo4 = establecimiento.photo4
      
      for (var i=0; i<photoA.length; i++){
        if (photo1 == null){
          photo1 = photoA[i]
        }
        else if (photo2 == null){
          photo2 = photoA[i]
        }
        else if (photo3 == null){
          photo3 = photoA[i]
        }
        else if (photo4 == null){
          photo4 = photoA[i]
        }
        else{
          console.log('¡¡¡¡¡YA NO HAY ESPACIO PARA MAS FOTOS!!!!!!')
          break
        }
      }

      if (cancelar == true){
        //Se cancela la accion porque no hay espacio en las fotos
        console.log("No hay mas espacio")
        res.redirect('/accounts/verSugerencias/' + estId)
      }
      else{
        Location.update({
          district : distritoS,
          address : direccionS
        }, {where : {id : establecimiento.location_id}})
  
        Establishment.update({
          name : nombreS,
          type : tipoS,
          link : linkS,
          photo1 : photo1,
          photo2 : photo2,
          photo3 : photo3,
          photo4 : photo4
        }, {where : {id : estId}})
  
        
        //Borramos la sugerencia
        Suggestion.findByPk(req.body.sugid).then(response => {
          response.destroy();
        })
        res.redirect('/accounts/verSugerencias/' + estId)
      }

    } 
    catch (err) {
      console.log(err);
    }
  },

  eliminarSugerengia : async (req,res) => {
    try{
      const sugid = req.params.sugid
      const sugerencia = await Suggestion.findByPk(sugid)
      const estId = sugerencia.establishment_id

      //Borramos la sugerencia
      Suggestion.findByPk(sugid).then(response => {
        response.destroy();
      })

      //Redireccionamos
      res.redirect('/accounts/verSugerencias/' + estId)

    }
    catch(err) {console.log(err) }
  },

  deleteAccount:(req, res) => {
    try {
      User.findByPk(req.params.userid).then(response => {
        response.destroy();
        Post.findAll({where: {'user_id': req.params.userid}}).then(posts => posts.forEach(post => post.destroy()))
        res.redirect('/accounts')
      })
      
    }
    catch(err) {console.log(err) }
  },

  deleteEstablecimiento : (req,res) => {
    try{
      Establishment.findByPk(req.params.estid).then(response => {
        response.destroy();
        res.redirect('/accounts')
      })
    }

    catch (err) {
      console.log(err);
    }
  }
};

imagesToBase6455 = function (usuario) {

  for (var i = 0; i < usuario.length; i++)
  {
    if(usuario[i].photo){
      usuario[i].photo = Buffer.from(usuario[i].photo).toString('base64');
    }  
  }
  return usuario      
};

imagesToBase644 = function (user) {
  if (user.photo){
    user.photo = Buffer.from(user.photo).toString('base64');
  }
};

imagesToBase6 = function (array) {

  for (var i=0; i<array.length; i++){

    if (array[i].photo1){
      array[i].photo1 = Buffer.from(array[i].photo1).toString('base64');
    }
    if (array[i].photo2){
      array[i].photo2 = Buffer.from(array[i].photo2).toString('base64');
    }
    if (array[i].photo3){
      array[i].photo3 = Buffer.from(array[i].photo3).toString('base64');
    }
  }
  return array
  
};

imagesToBase7 = function (array) {
  if (array.photo1){
    array.photo1 = Buffer.from(array.photo1).toString('base64');
  }
  if (array.photo2){
    array.photo2 = Buffer.from(array.photo2).toString('base64');
  }
  if (array.photo3){
    array.photo3 = Buffer.from(array.photo3).toString('base64');
  }
  if (array.photo4){
    array.photo4 = Buffer.from(array.photo4).toString('base64');
  }
  return array
};

