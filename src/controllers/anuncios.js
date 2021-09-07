const {  Post } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getAnuncios: (req, res) => {
    try{
      Post.findAll().then((result) => {
        console.log(result);
        res.render('anuncios',{title:'Anuncios', posts: result})
      });
    }
    catch{}
  }
};