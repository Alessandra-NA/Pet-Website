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
      return res.render('shelters',{refugios :imagesToBase64(shelters)});
    }
    catch{

    }
  }
};

imagesToBase64 = function (shelterArray) {
  let array = shelterArray.map((shelter) => {
    if(shelter.photo){
      shelter.photo = Buffer.from(shelter.photo).toString('base64');
    }
    return shelter
  })
  return array
}