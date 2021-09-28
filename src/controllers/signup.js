

const { User } = require('../models');

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     *
     */

    getSignUp: async (req, res) => {
        try {
            const tipoCuenta = parseInt(req.body.tipo_cuenta)

            if (tipoCuenta == 0){
                return res.render('crear_usuario_people', { title: 'Crear nuevo usuario' })
            }
            else if (tipoCuenta == 1){
                return res.render('crear_usuario_shelter', { title: 'Crear nuevo usuario' })
            }

        }
        catch { }
    },

    chooseTypeAccount : async (req, res) => {
        try{
            return res.render('chooseTypeAccount', {title : 'Elegir tipo de cuenta'})
        }
        catch{}
    }
};