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
      var sameUser = false;
      if (post.user.type == "shelter"){
        const dueño = await UserShelter.findOne({where:{user_id:post.user_id}})
        post.pet = imagesToBase645(post.pet)
        if(req.session && req.session.userId == dueño.user_id){
          sameUser = true;
        }
        return res.render('pet_detalle',{post:post,dueño:imagesToBase645(dueño),sameUser:sameUser});
      } else {
        const dueño = await UserPerson.findOne({where:{user_id:post.user_id}})
        post.pet = imagesToBase645(post.pet)
        if(req.session && dueño.user_id == req.session.userId){
          sameUser = true;
        }
        return res.render('pet_detalle',{post:post,dueño:imagesToBase645(dueño), sameUser:sameUser});
      };
         
    }
    catch (err) {
      console.log(err);
    }
  },
};


imagesToBase645 = function (usuario) {
  if(usuario.photo){
    usuario.photo = Buffer.from(usuario.photo).toString('base64');
  }  
  return usuario      
}   