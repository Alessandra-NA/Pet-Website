const { User } = require('../models');

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     *
     */

    getSignIn: async (req, res) => {
        try {
            return res.render('signin', { title: 'Iniciar sesión' })
        }
        catch { }
    },
};