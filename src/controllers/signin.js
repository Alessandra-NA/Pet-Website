
const md5 = require('md5');
const { User, UserPerson, Location, UserShelter } = require('../models');

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
                    break
                }
            }
            

            if (aux)
            {
                //Si inicia sesion
                res.redirect('/adopcion')
            }

            else{
                //Username o contraseña incorrecto
                
                res.redirect('/')
                
            }
            console.log(usuarios)
            
            
        }
        catch{

        }
    }

};
    
