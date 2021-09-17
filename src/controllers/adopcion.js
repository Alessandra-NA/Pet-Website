const { ActivityLevel, Gender, Size, Specie, UserType, Pet } = require('../models');
const { Op } = require("sequelize");

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getInicioAdopcion: async (req, res) => {
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
    try {
      const pet = await Pet.create({
        name: name,
        photo: null,
        birthdate: birthdate,
        weight: weight,
        story: story,
        activitylevel_id: activitylevel,
        size_id: size,
        specie_id: specie,
        gender_id: gender
      })
      println("========")
      return pet
    } catch { }
  }
};