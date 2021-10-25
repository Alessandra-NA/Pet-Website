const { Post, Pet, User, UserPerson, UserShelter, Establishment } = require('../models');

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
    catch{}
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

  deleteAccount:(req, res) => {
    try {
      User.findByPk(req.params.userid).then(response => {
        response.destroy();
        Post.findAll({where: {'user_id': req.params.userid}}).then(posts => posts.forEach(post => post.destroy()))
        res.redirect('/accounts')
      })
      
    }
    catch(err) {console.log(err) }
  }
};