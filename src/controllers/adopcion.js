const { ActivityLevel, Gender, Size, Specie, UserType } = require('../models');
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
    catch {}
}
};