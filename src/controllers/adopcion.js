const {  /* los modelos que vayas a usar */ } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getInicioAdopcion: async (req, res) => {
    try{
        return res.render('adopcion',{title:'Dar en adopcion'});
    }
    catch{}
  }
};