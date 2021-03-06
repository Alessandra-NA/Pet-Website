const { Establishment, Location, Suggestion, User, UserPerson, UserShelter, Comment, ReportEstablishment, ReportUserComment } = require('../models');


module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */


  getEstablishment: async (req, res) => {
    var id = req.query.id;
    try {
      const establecimiento = await Establishment.findOne({
        include: [
          {
            model: Location,
            as: 'location',
          },
        ],
        where: { id: id }
      })
      const idEstablecimiento = establecimiento.id
      const comentarios = await Comment.findAll({
        include: {
          model: UserPerson,
          as: 'user',
        },
        where: { establishment_id: idEstablecimiento },
      })
      return res.render('establecimiento_detalle', { establecimiento: imagesToBase64ForEstablishmentDetails(establecimiento), comentarios: imagesToBase64UserComments(comentarios) });
    }
    catch {

    }
  },

  crearSugerencia: async (req, res) => {
    try {
      var id = req.body.id;
      var name = req.body.name;
      var type = req.body.type;
      var link = req.body.link;
      var address = req.body.address;
      var district = req.body.district;

      const photo1 = req.files[0]?.buffer
      const photo2 = req.files[1]?.buffer
      const photo3 = req.files[2]?.buffer

      const userType = req.session.userType
      const idUser = req.session.userId
      var userID = 0
      console.log("==========>"+idUser)
      if (userType == "person") {
        currentUser = await UserPerson.findOne({ where: { id: idUser } })
        userID = currentUser.user_id
      } else if (userType == "shelter") {
        currentUser = await UserShelter.findOne({ where: { id: idUser } })
        userID = currentUser.user_id
      }


      var f = new Date();
      var fecha = f.getFullYear() + "-" + f.getMonth() + "-" + f.getDate()
      console.log("==========>"+userID)
      await Suggestion.create({
        name: name,
        photo1: photo1,
        photo2: photo2,
        photo3: photo3,
        fecha: fecha,
        type: type,
        link: link,
        address: address,
        district: district,
        establishment_id: id,
        userPerson_id: userID
      });
      console.log("==========> fin")
      res.redirect('/establecimiento_detalle?id=' + id);
    }
    catch(error) {
      console.log(error)
    }

  },

  postSaveNewComment1: async (req, res) => {
    var idUsuario = req.session.userId;
    const idEstablecimiento = req.query.id;
    const { desc, score} = req.body;

    try {
      const fecha = new Date();
      await Comment.create({
        fecha: fecha,
        desc: desc,
        score: score,
        userPerson_id: idUsuario,
        establishment_id: idEstablecimiento
      })
      const establecimiento = await Establishment.findOne({
        include: [
          {
            model: Location,
            as: 'location',
          },
        ],
        where: { id: idEstablecimiento }
      })
      var newRating = 0
      if(establecimiento.rating == 0 ){
        newRating = parseInt(score)
      }else {
        newRating = Math.round((parseInt(establecimiento.rating) + parseInt(score))/2)
      }
      establecimiento.update({
        rating: newRating
      })

      return res.redirect('/establecimiento_detalle?id='+ idEstablecimiento);
    }
    catch  (error) {
        console.error(error)
    }
  },

  postNewReportComment: async (req, res) => {
    var idComentario = req.body.idComment;
    const idEstablecimiento = req.query.id;
    try {
      const fecha = new Date();
      const comentario = await Comment.findByPk(idComentario)
      const usuarioPerson = await UserPerson.findByPk(comentario.userPerson_id)
      const usuario = await User.findByPk(usuarioPerson.user_id)
      await ReportUserComment.create({
        fecha: fecha,
        comment_id: idComentario
      })
      usuario.update({
        status: 'reported'
      })

      return res.redirect('/establecimiento_detalle?id='+ idEstablecimiento);
    } catch (error) {
      console.error(error)
    }
   
  },

  crearReportar: async (req, res) => {
    var reporte = req.body.reporte;
    var id = req.body.id;
    var f = new Date();
    var fecha = f.getFullYear() + "-" + f.getMonth() + "-" + f.getDate()
    console.log(reporte)
    if(reporte == ""){
      console.log(reporte)
    }
    if (req.file){
      var photo = req.file.buffer;
      await ReportEstablishment.create({
        fecha: fecha,
        desc: reporte, 
        photo: photo, 
        establishment_id: id,
      });
      
    }
    else{
      await ReportEstablishment.create({
        fecha: fecha,
        desc: reporte,
        establishment_id: id,
      });
    }

    try {
      res.redirect('/establecimiento_detalle?id=' + id);
    }
    catch {

    }

  },
};

imagesToBase64ForEstablishmentDetails = function (establishment) {

  if (establishment.photo1) {
    establishment.photo1 = Buffer.from(establishment.photo1).toString('base64');
  }
  if (establishment.photo2) {
    establishment.photo2 = Buffer.from(establishment.photo2).toString('base64');
  }
  if (establishment.photo3) {
    establishment.photo3 = Buffer.from(establishment.photo3).toString('base64');
  }
  if (establishment.photo4) {
    establishment.photo4 = Buffer.from(establishment.photo4).toString('base64');
  }
  return establishment

}

imagesToBase64UserComments = function (commentsArray) {
  let array = commentsArray.map((comment) => {
    if (comment.user.photo) {
      comment.user.photo = comment.user.photo.toString('base64')
    }
    return comment
  })
  return array
}
