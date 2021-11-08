const { Post, Pet, User, UserPerson, UserShelter, Establishment, Suggestion, Location } = require('../models');
const { SESSION_NAME, SALT_ROUNDS, DB_DATABASE } = require('../config/env');
const md5 = require('md5');
const { Op } = require('sequelize');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  chooseTypeAccountToManage : (req, res) => {
    try{
      res.render('chooseTypeAccountToManage', {
        title : 'Elegir cuenta a administrar',
      })
    }
    catch{}
  },

  getAccounts : async (req, res) => {
    try {
      const tipoCuenta = parseInt(req.body.tipo_cuenta)

      if (tipoCuenta == 0) {
        User.findAll({include: {all: true}, where : {type : 'person'}}).then(response => {
          res.render('accountManager', {
            title: 'Administrar cuentas de personas', 
            users: response.filter(user => user.type != 'admin'),
            type : "personas"
          })
        })
      } 

      else if (tipoCuenta == 1){
        User.findAll({include: {all: true}, where : {type : 'shelter'}}).then(response => {
          res.render('accountManager', {
            title: 'Administrar cuentas de albergue', 
            users: response.filter(user => user.type != 'admin'),
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

      if (req.body.img1 != undefined){
        photoS[0] = sugerencia.photo1
      }
      if (req.body.img2 != undefined){
        photoS[1] = sugerencia.photo2
      } 
      if (req.body.img3 != undefined){
        photoS[2] = sugerencia.photo3
      } 

      for (var i=0; i<photoS.length; i++){
        if (establecimiento.photo1!=null && establecimiento.photo2!=null && establecimiento.photo3!=null && establecimiento.photo4!=null){
          //Todos los slots de fotos estan llenos
          break
        }
        else{
          if (establecimiento.photo1 == null){
            Establishment.update({
              photo1 : photoS[i]
            }, {where : {id : estId}})
          }
          else if(establecimiento.photo2 == null){
            Establishment.update({
              photo2 : photoS[i]
            }, {where : {id : estId}})
          }
          else if(establecimiento.photo3 == null){
            Establishment.update({
              photo3 : photoS[i]
            }, {where : {id : estId}})
          }
          else if(establecimiento.photo4 == null){
            Establishment.update({
              photo4 : photoS[i]
            }, {where : {id : estId}})
          }
        }
      }

      Location.update({
        district : distritoS,
        address : direccionS
      }, {where : {id : establecimiento.location_id}})

      Establishment.update({
        name : nombreS,
        type : tipoS,
        link : linkS
      }, {where : {id : estId}})

      
      //Borramos la sugerencia
      Suggestion.findByPk(req.body.sugid).then(response => {
        response.destroy();
      })


      res.redirect('/accounts/verSugerencias/' + estId)
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

