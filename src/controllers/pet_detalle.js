const {  /* los modelos que vayas a usar */ } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getInicioPetDetalle: async (req, res) => {
    try{
      return res.render('pet_detalle',{title:'Detalle de mascota'});
    }
    catch{}
  }
};