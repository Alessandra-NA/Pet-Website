const { ActivityLevel, Gender, Size, Specie, User, Pet, Post, UserPerson, UserShelter } = require('../models');
const { Op } = require("sequelize");

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * 
   */

  getInicioAdopcion: async (req, res) => {
    try {
      const userType = req.session.userType
      if(userType=="person" || userType=="shelter" || userType=="admin"){
        const listActivityLevel = await ActivityLevel.findAll()
        const listGender = await Gender.findAll({ where: { [Op.or]: [{ id: 1 }, { id: 2 }] } })
        const listSize = await Size.findAll()
        const listSpecie = await Specie.findAll()

        return res.render('adopcion', { title: 'Dar en adopcion', actividades: listActivityLevel, generos: listGender, tamanhos: listSize, especies: listSpecie });
      }
    }
    catch(err) {console.log(err)}
  },

  postAdopcion: async (req, res) => {
    const { name, birthdate, weight, story, activitylevel, size, specie, gender } = req.body;
    const photo  = req.file.buffer;
    var { vacunado, desparasitado, sano, esterilizado, microchip } = req.body;
    try {

      if(vacunado===undefined){
        vacunado = false
      }
      if(desparasitado===undefined){
        desparasitado = false
      }
      if(sano===undefined){
        sano = false
      }
      if(esterilizado===undefined){
        esterilizado = false
      }
      if(microchip===undefined){
        microchip = false
      }
      const pet = await Pet.create({
        name: name,
        photo: photo,
        birthdate: birthdate,
        weight: weight,
        story: story,
        activitylevel_id: activitylevel,
        size_id: size,
        specie_id: specie,
        gender_id: gender,
        vacunado: vacunado,
        desparasitado: desparasitado,
        sano: sano,
        esterilizado: esterilizado,
        microchip: microchip
      })
      //Falta mandar el usuario que accedió a la creación de la adopción
      const userType = req.session.userType
      const idUser = req.session.userId
      var userID=0
      if(userType=="person"){
        currentUser = await UserPerson.findOne({where:{id:idUser}})
        userID = currentUser.user_id
      }else if(userType=="shelter"){
        currentUser = await UserShelter.findOne({where:{id:idUser}})
        userID = currentUser.user_id
      }
      console.log("============>"+idUser)
      console.log("============>"+userID)
      const post = await Post.create({
        pet_id: pet.id,
        user_id: userID
      })
      //res.status(201).redirect('/post/' + pet.id)
      res.status(201).redirect('/anuncios')
    } catch (err) {
      console.log(err);
  }
  }
};