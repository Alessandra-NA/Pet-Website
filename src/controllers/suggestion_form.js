const { Establishment , Location} = require('../models');


module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */


  getEstablishment: async(req,res)=> {
    var id =req.query.id;
    try{
      const establecimiento = await Establishment.findOne( {include: [
        {
          model: Location,
          as: 'location',          
          
        },          
      ],        
      where:{id:id}})
      
      return res.render('suggestion_form',{establecimiento:imagesToBase644(establecimiento)});
    }
    catch{

    }
  }
};

imagesToBase644 = function (usuario) {
  if(usuario.photo){
    usuario.photo = Buffer.from(usuario.photo).toString('base64');
  }  
  return usuario

}
