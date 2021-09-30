const { UserShelter,Post, Pet} = require('../models');


module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */


  getUserShelter: async(req,res)=> {
    var id =req.query.id;
    try{
      const usuario = await UserShelter.findOne({where:{id:id}})
      const posts = await Post.findAll({ include: [
        {
          model: Pet,
          as: 'pet',          
          
        }
      ],
      where:{user_id: usuario.user_id}})
      return res.render('shelter_detalle',{usuario :usuario, posts:posts});
    }
    catch{

    }
  }
};