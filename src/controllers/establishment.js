const { Establishment, Location } = require('../models')

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
    */

    getEstablishments: async (req, res) => {
        try {
            if (req.query.type) {
                switch (req.query.type) {
                    case 'spa':
                        var filter = 'Spa mascotas'
                        break;
                    case 'vet':
                        var filter = 'Veterinarias'
                        break;
                    case 'tiendas':
                        var filter = 'Tienda mascotas'
                        break;
                }
                var establishments = await Establishment.findAll({
                    include: [
                        {
                            model: Location,
                            as: 'location',
                            
                        }
                    ],
                    where: {
                        type: filter
                    }
                })
            } else {
                var establishments = await Establishment.findAll({
                    include: [
                        {
                            model: Location,
                            as: 'location',
                        }
                    ]
                })
            }
            //console.log(establishments)
            return res.render('establecimientos', { title: 'Establecimientos', establecimientos: imagesToBase64ForEstablishment(establishments), listado: req.query.tab != 'mapa' });
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
            const { name, type, address, mapLat, mapLng, district, ofPets, link } = req.body
            const photo1 = req.files[0]?.buffer
            const photo2 = req.files[1]?.buffer
            const photo3 = req.files[2]?.buffer
            const photo4 = req.files[3]?.buffer
            const newLocation = Location.create({
                country: 'Perú',
                province: 'Lima',
                district: district,
                address: address
            })

            newLocation.then(data => {
                Establishment.create({
                    name: name,
                    photo1: photo1,
                    photo2: photo2,
                    photo3: photo3,
                    photo4: photo4,
                    rating: 0,
                    ofPets: ofPets ? true : false,
                    type: type,
                    link: link,
                    latitude: parseFloat(mapLat),
                    longitude: parseFloat(mapLng),
                    location_id: data.id,
                })
                    .then(data => console.log("Establecimiento creado correctamente"),
                        err => console.error(err)).then(res.redirect('/establishments?tab=mapa'))
            })
        } catch (error) {
            console.error(error)
        }
    },

    postSaveNewComment: async (req, res) => {
        var id = req.session.userId;
        console.log(id)
        try {
            const gass = String
            return res.redirect('/establecimiento_detalle?id=' + id);
            //return res.render('establecimiento_detalle', { establecimiento: imagesToBase64ForEstablishmentDetails(establecimiento), comentarios: imagesToBase64UserComments(comentarios) });
        }
        catch (error) {
            console.error(error)
        }
    },
}

imagesToBase64ForEstablishment = function (establishmentArray) {
    let array = establishmentArray.map((establishment) => {
        for (i = 1; i < 5; i++) {
            if (establishment['photo' + i]) {
                establishment['photo' + i] = establishment['photo' + i].toString('base64')
            }
        }
        return establishment
    })
    return array
}
