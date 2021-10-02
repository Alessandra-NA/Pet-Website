const { Post, Pet } = require('../models');

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
    catch { }
  },
  
  getReportarAnuncios : async (req,res) =>{
    var id =req.query.id;
    console.log("================== "+id)
    try
    {    
      const post = await Post.findByPk(id,{include: { all: true }})
      return res.render('reportar_anunciante' , {title : 'Reportar un anuncio', post:post})
    }
    catch{}
  },
  
  postAnuncioReportado : async (req, res) =>{
    var id =req.query.id;
    console.log("================== "+id)
    try
    {
      const {reason, comment} = req.body;
      const post = await Post.findByPk(id)
      Post.update({reason: reason, comment: comment, flagReportado: true},{where: {id:id}})
      res.redirect('/anuncios')
    }
    catch{}
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
