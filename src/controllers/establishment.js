const { Op } = require('sequelize')
const { Establishment, Location } = require('../models')

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
    */

    getEstablishments: async (req, res) => {
        try {
            if (Object.keys(req.query).length > 1) {
                var rbByC = ''
                var rbTer = ''
                var rbPla = ''
                var rbHot = ''
                var rbTie = ''
                var rbPar = ''
                var rbCen = ''
                var rbCli = ''
                var rbTra = ''
                var rbSpa = ''
                var rbVet = ''
                var rbTieM = ''
                if (req.query.rbByC == 't') rbByC = 'Bares & cafés'
                if (req.query.rbTer == 't') rbTer = 'Restaurantes'
                if (req.query.rbPla == 't') rbPla = 'Terrazas'
                if (req.query.rbHot == 't') rbHot = 'Hoteles & Alojamientos'
                if (req.query.rbTie == 't') rbTie = 'Tiendas'
                if (req.query.rbPar == 't') rbPar = 'Parques'
                if (req.query.rbCen == 't') rbCen = 'Centros de belleza'
                if (req.query.rbCli == 't') rbCli = 'Clínicas'
                if (req.query.rbTra == 't') rbTra = 'Transportes'
                if (req.query.rbSpa == 't') rbSpa = 'Spa mascotas'
                if (req.query.rbVet == 't') rbVet = 'Veterinarias'
                if (req.query.rbTieM == 't') rbTieM = 'Tienda mascotas'
                var establishments = await Establishment.findAll({
                    include: [
                        {
                            model: Location,
                            as: 'location',
                        }
                    ],
                    where: {
                        type: { [Op.or]: [rbByC, rbTer, rbPla, rbHot, rbTie, rbPar, rbCen, rbCli, rbTra, rbSpa, rbVet, rbTieM].filter(e => e != '') }
                    }
                })


                /*//if req.query.type is array
                if (Array.isArray(req.query.type)) {
                    var selectedTypes = req.query.type.map(type => {
                        switch (type) {
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
                        return {type: filter}
                    })
                    var establishments = await Establishment.findAll({
                        include: [
                            {
                                model: Location,
                                as: 'location',
                                
                            }
                        ],
                        where: {
                            [Op.or] : selectedTypes
                        }
                    })
                }else{
                    switch (req.query.type) {
                        case 'spa':
                            var selectedTypes = 'Spa mascotas'
                            break;
                        case 'vet':
                            var selectedTypes = 'Veterinarias'
                            break;
                        case 'tiendas':
                            var selectedTypes = 'Tienda mascotas'
                            break;
                    }
                    var establishments = await Establishment.findAll({
                        include: [
                            {
                                model: Location,
                                as: 'location',
                            },
                        ],
                        where: {
                            type: selectedTypes
                        }
                    })
                }*/
                
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
            return res.render('establecimientos', { title: 'Establecimientos', establecimientos: imagesToBase64ForEstablishment(establishments), listado: req.query.tab != 'mapa', selectedTypes: req.query.type });
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
