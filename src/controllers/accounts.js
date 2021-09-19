const { Post, Pet, User } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  showAccounts: (req, res) => {
    try {
      User.findAll({include: {all: true}}).then(response => {
        //console.log(response)
        res.render('accountManager', {title: 'Accounts', users: response})
        
      })
      
    }
    catch { }
  },

  deleteAccount:(req, res) => {
    try {
      User.findByPk(req.params.userid).then(response => {
        console.log(response);
        response.destroy();
        res.redirect('/accounts')
      })
      
    }
    catch { }
  }
};