const {  /* los modelos que vayas a usar */ } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getAnuncios: (req, res) => {
    try{
      return res.render('anuncios',{title:'Anuncios'});
    }
    catch{}
  }
};