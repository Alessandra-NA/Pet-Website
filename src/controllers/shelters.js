const {  UserShelter, Location } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getShelters: async(req, res) => {
    try{ 
      const shelters = await UserShelter.findAll({ include: [
        {
          model: Location,
          as: 'location',
                    
          
        }
      ]})
      return res.render('shelters',{refugios :shelters});
    }
    catch{

    }
  }
};