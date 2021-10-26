const {  Suggestion, Location } = require('../models');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */

  getSuggestions: async(req, res) => {
    try{ 
      const Suggestions = await Suggestion.findAll({ include: [
        {
          model: Location,
          as: 'location',                 
        }
      ]})
      return res.render('suggestions',{sugerencias :Suggestions});
    }
    catch(err){
        console.log(err);
    }
  }
};

// imagesToBase642 = function (shelterArray) {
//   let array = shelterArray.map((shelter) => {
//     if(shelter.photo){
//       shelter.photo = Buffer.from(shelter.photo).toString('base64');
//     }
//     return shelter
//   })
//   return array
// }