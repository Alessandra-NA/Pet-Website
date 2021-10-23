const { Establishment, Location } = require('../models')

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
    */

    showForm: async (req, res) => {
        try {
            return res.render('new_establishment');
        }
        catch (err) {
            console.log(err);
        }
    }
}

