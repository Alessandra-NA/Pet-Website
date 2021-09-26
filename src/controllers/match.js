const {  /* los modelos que vayas a usar */ } = require('../models');

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     *
     */

    getFormularioMatch: async (req, res) => {
        try {
            return res.render('matchForm', { title: 'Tu mascota ideal' });
        }
        catch { }
    }
};