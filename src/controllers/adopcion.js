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
      ActivityLevel.findAll({ include: { all: true } }).then((actividades) => {
        Gender.findAll({ where: { [Op.or]: [{ id: 1 }, { id: 2 }] } }).then((generos) => {
          Size.findAll({ include: { all: true } }).then((tamanhos) => {
            Specie.findAll({ include: { all: true } }).then((especies) => {
                return res.render('adopcion', { title: 'Dar en adopcion', actividades: actividades, generos: generos, tamanhos: tamanhos, especies: especies });
              })
            })
          })
        })
    }
    catch { }
  }
};