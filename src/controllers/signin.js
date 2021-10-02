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

    postSignIn: async (req, res) => {
        try {
            
            const email = req.body.email;
            const password = md5(req.body.password)
    
            let usuarioAIngresar = null;
            let existe = false;
            let valido = false;

            const listaUsuarios = await getUsers();
            for(let usuario of listaUsuarios){
                if(usuario.email === email){
                    existe = true;
                    if(usuario.password == password){
                        valido = true;
                        usuarioAIngresar = usuario
                        break;
                    }
                }
            }

            if(existe && valido){
                switch(usuarioAIngresar.rol.id){
                    case 1:
                        req.session.usuario=usuarioAIngresar;
                        res.redirect('/src/views/anuncios');
                        break;
                    case 2:
                        req.session.usuario=usuarioAIngresar;
                        res.redirect('/src/views/anuncios');
                        break;
                    case 3:
                        req.session.usuario=usuarioAIngresar;
                        res.redirect('/src/views/anuncios');
                        break;
                }
            }
            else{
                req.session.message = {
                    type: 'danger',
                    intro: 'ERROR',
                    message: ' - El correo o la contraseña ingresados no son válidos, intente denuevo.'
                }
                res.redirect('/src/views/login')
            }

        }

        catch { }

    }

};
