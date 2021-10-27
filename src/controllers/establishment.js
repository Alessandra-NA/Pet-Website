const { Establishment, Location } = require('../models')

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
    */

    getEstablishments: async (req, res) => {
        try {
            const establishments = await Establishment.findAll({
                include: [
                    {
                        model: Location,
                        as: 'location',
                    }
                ]
            })
            console.log(establishments)
            return res.render('establecimientos', { title: 'Establecimientos', establecimientos: imagesToBase64ForEstablishment(establishments), listado: req.query.tab!='mapa'});
        }
        catch (err) {
            console.log(err);
        }
    },
    showFormNew: async (req, res) => {
        try {
            return res.render('new_establishment', { lat: req.query.lat, long: req.query.long });
        }
        catch (err) {
            console.log(err);
        }
    },
    saveNewEstablishment: async (req, res) => {
        try {
            const { name, type, address, mapLat, mapLng, province, district, ofPets, link } = req.body
            const photo = req.file ? req.file.buffer : null

            const newLocation = Location.create({
                country: 'Perú',
                province: province,
                district: district,
                address: address
            })

            newLocation.then(data => {
                Establishment.create({
                    name: name,
                    photo: [photo],
                    rating: 0,
                    ofPets: ofPets ? true : false,
                    type: type,
                    link: link,
                    latitude: parseFloat(mapLat),
                    longitude: parseFloat(mapLng),
                    location_id: data.id,
                })
                .then(data => console.log("Establecimiento creado correctamente"), 
                err => console.error(err))
            })
            res.redirect('/establishments?tab=mapa')
        } catch (error) {
            console.error(error)
        }
    },
}

imagesToBase64ForEstablishment = function (establishmentArray) {
    let array = establishmentArray.map((establishment) => {
        if (establishment.photo) {
            for(var i=0; i<establishment.photo.length; i++) {
                establishment.photo[i] = Buffer.from(establishment.photo[i]).toString('base64');
            }
        }
        return establishment
    })
    return array
}
