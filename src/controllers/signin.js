
const md5 = require('md5');
const { User, UserPerson, UserAdmin, Location, UserShelter } = require('../models');

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
    
    /**
   * @param {import('express').Request} req
   * @param {import('express').Response & import('express-session').SessionData} res
   *
   */
    iniciarSesion : async (req,res) => {
        try
        {
            let aux = false

            const username = req.body.username
            const password = md5(req.body.password)

            const usuarios = await User.findAll()
            let usuarioCurrent = null

            for (let usuario of usuarios) 
            {
                if (usuario.username == username && usuario.password == password)
                {
                    usuarioCurrent = usuario
                    aux = true
                    console.log('ingresó')
                    if (usuario.type == 'person')
                        await UserPerson.findOne({
                            attributes: ['id'],
                            raw: true,
                            where: {
                                user_id: usuario.id
                            }
                        }).then(us => {
                            req.session.userId = us.id
                        })
                    else if (usuario.type == 'shelter')
                        await UserShelter.findOne({
                            attributes: ['id'],
                            raw: true,
                            where: {
                                user_id: usuario.id
                            }
                        }).then(us => {
                            req.session.userId = us.id
                        })
                    else if (usuario.type == 'admin')
                        await UserAdmin.findOne({
                            attributes: ['id'],
                            raw: true,
                            where: {
                                user_id: usuario.id
                            }
                        }).then(us => {
                            req.session.userId = us.id
                        })
                    req.session.userType = usuario.type
                    break
                }
            }
            if (aux)
            {
                //Si inicia sesion
                res.redirect('/anuncios')
            }
            else{
                //Username o contraseña incorrecto               
                res.redirect('/')
            }     
        }
        catch{

        }
    }

};
    
