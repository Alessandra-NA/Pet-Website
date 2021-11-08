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
    var id = req.body.id;
    var name = req.body.name;
    var type = req.body.type;
    var link = req.body.link;
    var address = req.body.address;
    var district = req.body.district;

    var fotos =  req.files



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
      photo: fotos,
      link: link, 
      address: address,
      district: district,
      establishment_id: id,
    });


    try{
      res.redirect('/establecimiento_detalle?id='+id);
    }
    catch{

    }
    
  }
};


imagesToBase64ForEstablishmentDetails = function (establishment) {

  if (establishment.photo1) {
    establishment.photo1 = Buffer.from(establishment.photo1).toString('base64');
  }
  if (establishment.photo2) {
    establishment.photo2 = Buffer.from(establishment.photo2).toString('base64');
  }
  if (establishment.photo3) {
    establishment.photo3 = Buffer.from(establishment.photo3).toString('base64');
  }
  if (establishment.photo4) {
    establishment.photo4 = Buffer.from(establishment.photo4).toString('base64');
  }
  return establishment
  
}

