const { Post, Pet, Report, User, ReportUserPost, UserPerson, UserShelter } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getAnuncios: (req, res) => {
    try {
      if (req.query.type) {
        Post.findAll({
          include: [
            {
              model: Pet,
              as: 'pet',
              where: {
                specie_id: req.query.type
              }
            }
          ]
        }).then((response) => {
          //let image64 = Buffer.from(response[0].pet.photo).toString('base64')
          res.render('anuncios', { title: 'Anuncios', posts: imagesToBase64(response), match: false })
        });
      } else {
        Post.findAll({ include: { all: true } }).then((response) => {
          res.render('anuncios', { title: 'Anuncios', posts: imagesToBase64(response), match: false  })
        });
      }
    }
    catch (err) {
      console.log(err);
    }
  },
  
  getReportarAnuncios : async (req,res) =>{
    var id =req.query.id;
    console.log("================== "+id)
    if(req.session.userType !== 'person'){
      res.redirect('/anuncios')
    }
    try
    {    
      const post = await Post.findByPk(id,{include: { all: true }})

      console.log(post.user.type)

      if(post.user.type=="person"){
        //get userperson
        var user = await UserPerson.findOne({where:{user_id: post.user_id}})
        var username = user.first_name + " " + user.last_name
      }else if(post.user.type=="shelter"){
        //get usershelter
        var user = await UserShelter.findOne({where:{user_id: post.user_id}})
        var username = user.name
      }

      return res.render('reportar_anunciante' , {
        title : 'Reportar un anuncio', 
        post:post,
        username:username
      })
    }
    catch (err) {
      console.log(err);
    }
  },
  
  postAnuncioReportado : async (req, res) =>{
    var id =req.query.id;
    
    console.log("================== "+id)
    try
    {
      const {comment, username_reportado, id_reported_user} = req.body;
      const photo = req.file? req.file.buffer : null;

      console.log(username_reportado)
      const reporteCreado = await ReportUserPost.create(
        {
          desc : comment,
          //photo
          user_id: id_reported_user,
          userAdoptante_id: req.session.userId,
          fecha: new Date(),
          photo : photo
        }
      ).then(function(_){
        //Cambiamos flag de usuario reportado
        const reportedUser = User.findOne({where : {id : id_reported_user}}).then(function(reportedUser){
          reportedUser.status = 'reported';
          reportedUser.save();
        })
      })

      //get reported user by id

      /*
      const post = await Post.findByPk(id)

      Post.update({
        reason: reason, 
        comment: comment, 
        flagReportado: true},{where: {id:id}})

      */

      res.redirect('/anuncios')
    }
    catch (err) {
      console.log(err);
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
