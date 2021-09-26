

const { User, Pet } = require('../models');

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     *
     */

    saveData: async (req, res) => {
        try {
            console.log("Saving data...")
            const newPet = Pet.build({name: req.body.petName, photo: Buffer.from(req.body.petPhoto), vacunado:true, desparasitado:true, sano:true, esteril:true, microchip:true, weight:10, esterilizado: true})
            newPet.save().then((success) => console.log("Pet saved succesfully ", success), (err) => console.log(err))
            res.redirect('/')
        }
        catch { }
    },
};