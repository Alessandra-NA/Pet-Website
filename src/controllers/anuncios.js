const {  Post } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getAnuncios: (req, res) => {
    try{
      Post.findAll({ include: { all: true }}).then((result) => {
        //console.log(result);
        console.log(result[0].dataValues.user)
        res.render('anuncios',{title:'Anuncios', posts: result})
      });
    }
    catch{}
  }
};