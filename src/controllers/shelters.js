const {  UserShelter } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getShelters: (req, res) => {
    try{
        UserShelter.findAll().then((result) => {
        console.log(result);
        res.render('shelters',{title:'Refugios', refugios: result})
      });
    }
    catch{}
  }
};