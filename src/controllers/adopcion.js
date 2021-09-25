const { ActivityLevel, Gender, Size, Specie, UserType, Pet, Post } = require('../models');
const { Op } = require("sequelize");
const fs = require('fs');
const { Buffer } = require('buffer');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * 
   */

  getInicioAdopcion: async (_, res) => {
    try {
      const listActivityLevel = await ActivityLevel.findAll()
      const listGender = await Gender.findAll({ where: { [Op.or]: [{ id: 1 }, { id: 2 }] } })
      const listSize = await Size.findAll()
      const listSpecie = await Specie.findAll()

      return res.render('adopcion', { title: 'Dar en adopcion', actividades: listActivityLevel, generos: listGender, tamanhos: listSize, especies: listSpecie });
    }
    catch { }
  },

  postAdopcion: async (req, res) => {
    const { name, birthdate, weight, story, activitylevel, size, specie, gender } = req.body;
    var { vacunado, desparasitado, sano, esterilizado, microchip } = req.body
    try {
      // Intenté por horas y días pasar el "image" a BLOB para que se reemplace por el null,
      // no tuve éxito.
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
        photo: null,
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
      const post = await Post.create({
        pet_id: pet.id,
        user_id: 1
      })
      //error ya que está pasando la photo null
      res.status(201).redirect('/post/' + pet.id)
    } catch { }
  }
};