const {  Post } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getAnuncios: (req, res) => {
    try{
      Post.findAll({ include: { all: true }}).then((response) => {
        //let image64 = Buffer.from(response[0].pet.photo).toString('base64')
        res.render('anuncios',{title:'Anuncios', posts: imagesToBase64(response)})
      });
    }
    catch{}
  }

};

imagesToBase64 = function(postsArray){
  let array = postsArray.map((post) =>{
    post.pet.photo = Buffer.from(post.pet.photo).toString('base64');
    return post
  })
  return array
}