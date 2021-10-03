const { UserShelter,Post, Pet, Location} = require('../models');


module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */


  getUserShelter: async(req,res)=> {
    var id =req.query.id;
    try{
      const usuario = await UserShelter.findOne( {include: [
        {
          model: Location,
          as: 'location',          
          
        },          
      ],        
      where:{id:id}})
      const posts = await Post.findAll({ include: [
        {
          model: Pet,
          as: 'pet',          
          
        },          
      ],
      where:{user_id: usuario.user_id}})
      usuario.photo = Buffer.from(usuario.photo).toString('base64')
      return res.render('shelter_detalle',{usuario :usuario, posts:imagesToBase64(posts)});
    }
    catch{

    }
  }
};

imagesToBase64 = function (postsArray) {
  let array = postsArray.map((post) => {
    if(post.pet.photo){
      post.pet.photo = Buffer.from(post.pet.photo).toString('base64');
    }
    return post
  })
  return array
}
