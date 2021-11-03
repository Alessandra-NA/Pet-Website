const { Establishment , Location, Suggestion} = require('../models');


module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   */


  getEstablishment: async(req,res)=> {
    var id =req.query.id;
    try{
      const establecimiento = await Establishment.findOne( {include: [
        {
          model: Location,
          as: 'location',
        },          
      ],        
      where:{id:id}})
      return res.render('establecimiento_detalle',{establecimiento:imagesToBase64ForEstablishmentDetails(establecimiento)});
    }
    catch{

    }
  },

  crearSugerencia: async(req,res)=>{
    var id = req.query.id;
    var name = req.query.name;
    var type = req.query.type;
    var link = req.query.link;
    var address = req.query.address;
    var district = req.query.district;


    var f = new Date();
    var fecha = f.getFullYear() + "-" + f.getMonth() + "-" + f.getDate()
    console.log(fecha)

    console.log(name)
    console.log(type)
    console.log(link)
    console.log(address)
    console.log(district)

    await Suggestion.create({
      name: name,
      fecha: fecha,
      type: type,
      link: link, 
      address: address,
      district: district,
      establishment_id: id,
    });


    try{
      const establecimiento = await Establishment.findOne( {include: [
        {
          model: Location,
          as: 'location',
        },          
      ],        
      where:{id:id}})
      res.redirect('/establecimiento_detalle?id='+id);
    }
    catch{

    }
    
  }
};


imagesToBase64ForEstablishmentDetails = function (establishment) {

  if (establishment.photo) {
      for(var i=0; i<establishment.photo.length; i++) {
          establishment.photo[i] = Buffer.from(establishment.photo[i]).toString('base64');
      }
  }
  return establishment
  
}

