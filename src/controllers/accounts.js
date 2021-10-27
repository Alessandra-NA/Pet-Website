const { Post, Pet, User, UserPerson, UserShelter, Establishment, Suggestion } = require('../models');

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
      const sugerencias = await Suggestion.findAll({include : {all: true}, where : {establishment_id : estId}})

      res.render('verSugerenciasEstablecimiento', {
        title : 'Ver sugerencias de establecimiento',
        sugerencias : sugerencias,
        estId : estId
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

      //Datos de sugerencia a confirmar
      const nombreS = req.body.nombreS
      const tipoS = req.body.tipoS
      const distritoS = req.body.distritoS
      const direccionS = req.body.direccionS
      const linkS = req.body.linkS
      if (nombreS == undefined)
      {
        nombreS = establecimiento.name
      }
      if (tipoS == undefined)
      {
        tipoS = establecimiento.type
      }
      /*
      if (distritoS == undefined) 
      {
        distritoS = establecimiento.district
      }
      if (direccionS == undefined) 
      {
        direccionS = establecimiento.address
      }
      */
      if (linkS == undefined) 
      {
        linkS = establecimiento.link
      }

      Establishment.update({
        name : nombreS,
        type : tipoS,
        link : linkS
      }, {where : {id : estId}})
      res.redirect('/accounts/verSugerencias/' + estId)
    } 
    catch (err) {
      console.log(err);
    }
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