const { Post, Pet, User, UserPerson, UserShelter } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

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
  }
};