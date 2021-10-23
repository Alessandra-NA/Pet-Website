const { Pet, Specie, Gender,Size,ActivityLevel, Post, User, UserShelter, UserPerson} = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getInicioPetDetalle: async (req, res) => {
    var id =req.query.id;
    try{
      const post = await Post.findByPk(id,
            {
              include:[
                {
                  model: Pet,
                  as: 'pet',
                  include:[
                    {
                      model: Specie,
                      as: 'specie',   
                    },
                    {
                      model: Gender,
                      as: 'gender',
                    },
                    {
                      model: Size,
                      as: 'size',
                    },
                    {     
                      model: ActivityLevel,
                      as: 'activitylevel',
                    },
                  ],
                },
                {
                  model: User,
                  as: 'user', 
                },
              ]
            }
        ) 
      if (post.user.type == "shelter"){
        const dueño = await UserShelter.findOne({where:{user_id:post.user_id}})
        post.pet = imagesToBase645(post.pet)
        return res.render('pet_detalle',{post:post,dueño:imagesToBase645(dueño)});
      } else {
        const dueño = await UserPerson.findOne({where:{user_id:post.user_id}})
        post.pet = imagesToBase645(post.pet)
        return res.render('pet_detalle',{post:post,dueño:imagesToBase645(dueño)});
      };
         
    }
    catch{}
  },
};


imagesToBase645 = function (usuario) {
  if(usuario.photo){
    usuario.photo = Buffer.from(usuario.photo).toString('base64');
  }  
  return usuario      
}   