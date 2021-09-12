

const { User } = require('../models');

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     *
     */

    getSignUp: async (req, res) => {
        try {
            return res.render('crear_usuario', { title: 'Crear nuevo usuario' })
        }
        catch { }
    },
};