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
      const actividades = ActivityLevel.findAll({ include: { all: true } })
      const generos = Gender.findAll({ where: { [Op.or]: [{ id: 1 }, { id: 2 }] } })
      const tamanhos = Size.findAll({ include: { all: true } })
      const especies = Specie.findAll({ include: { all: true } })
      return res.render('adopcion', { title: 'Dar en adopcion', actividades: actividades, generos: generos, tamanhos: tamanhos, especies: especies });
    }
    catch { }
  }
};