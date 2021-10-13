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
            return res.render('establecimientos', { title: 'Establecimientos', establecimientos: imagesToBase64ForEstablishment(establishments) });
        }
        catch (err) {
            console.log(err);
        }
    }
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
