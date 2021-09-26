const { UserShelter } = require('../models');

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
  },

  getRatingUserShelter: async(req,res)=> {
    var id =req.params.id;
    try{
      const usuario = await UserShelter.findOne({where:{id:id}})
      return res.render('rating',{rating :usuario.rating});
    }
    catch{

    }
  }
};