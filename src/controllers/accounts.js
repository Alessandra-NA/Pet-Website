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
      const establecimiento = await Establishment.findByPk(estId)
      const sugerencias = await Suggestion.findAll({include : {all: true}, where : {establishment_id : estId}})

      const UsuariosPeople = await UserPerson.findAll({include : {all : true}})
      const UsuariosShelter = await UserShelter.findAll({include : {all : true}})

      return res.render('verSugerenciasEstablecimiento', {
        title : 'Ver sugerencias de establecimiento',
        sugerencias : sugerencias,
        estId : estId,
        estName : establecimiento.name,
        usuariosPeople : imagesToBase645(UsuariosPeople),
        usuariosShelter : imagesToBase645(UsuariosShelter)
      })
    }
    catch (err) {
      console.log(err);
    }
  },

  confirmarSugerencia : async(req,res) => {
    try{
      const estId = req.body.estid
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


      Location.update({
        district : distritoS,
        address : direccionS
      }, {where : {id : establecimiento.location_id}})

      Establishment.update({
        name : nombreS,
        type : tipoS,
        link : linkS
      }, {where : {id : estId}})

      /*
      //Borramos la sugerencia
      Suggestion.findByPk(req.body.sugid).then(response => {
        response.destroy();
      })*/


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

imagesToBase645 = function (usuario) {

  for (var i = 0; i < usuario.length; i++)
  {
    if(usuario[i].photo){
      usuario[i].photo = Buffer.from(usuario[i].photo).toString('base64');
    }  
  }
  return usuario      
}   
