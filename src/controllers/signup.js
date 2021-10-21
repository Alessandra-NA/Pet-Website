
const md5 = require('md5');
const { DB_DATABASE } = require('../config/env');
const { User, UserPerson, Location, UserShelter } = require('../models');

module.exports = {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     *
     */

    getCuentaDuplicada : async (req, res) => {
        return res.render('duplicado', {title : 'Cuenta ya existente'})
    },

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
    },

    crearPeople : async (req, res) => {
        try{
            //Validamos que no hay ninguna cuenta username o dni igual
            let duplicado = false
            
            const usernameIngresado = req.body.nombre_de_usuario
            const dniIngresado = req.body.dni

            const peoples = await UserPerson.findAll()
            const usuarios = await User.findAll()

            for (let people of peoples) {
                if (people.document_number == dniIngresado)
                {
                    duplicado = true
                    break
                }
            }

            for (let usuario of usuarios){
                if (usuario.username == usernameIngresado)
                {
                    duplicado = true
                    break
                }
            }


            if (duplicado)
            {
                res.redirect('/signup/cuentaDuplicada')
            }

            else
            {
                
                //Ingresar Datos en tabla Locations
                const pais = "Perú"
                const provincia = "Lima"
                const distrito = req.body.distrito
                const direccion = req.body.direccion
                
                const location = await Location.create(
                    {
                        country : pais,
                        province : provincia,
                        district : distrito,
                        address : direccion
                    }
                )
    
                //Obtener ID de Location a introducir en UserPerson
    
                const idLoc = location.id;
                
                //Ingresar Datos en tabla Users
                const nombreUsuario = req.body.nombre_de_usuario
                const contraseña = md5(req.body.contraseña)
                console.log("Llegue")
                const userPrincipal = await User.create(
                    {
                        username : nombreUsuario,
                        password : contraseña,
                        type : 'person',
                        status : "actived"
                    }
                )
                console.log("aca ")
                const idUserPrinc = userPrincipal.id;
    
                //Ingresar Datos en tabla UserPeople
                const nombre = req.body.nombres
                const apellido = req.body.apellidos
    
                const photo = req.file.buffer
    
                const celular = req.body.celular
                const dni = req.body.dni
                const correo = req.body.correo
    
                const sexo = req.body.sexo
    
                //Ingreso de datos
                const people = await UserPerson.create(
                    {
                        first_name : nombre,
                        last_name : apellido,
                        photo : photo,
                        phone_number : celular,
                        document_number : dni,
                        email : correo,
                        //Rating no va
                        location_id : idLoc,
                        user_id : idUserPrinc,
                        gender_id : sexo
                    }
                )
    
                res.redirect('/signin')
            }


            

        }   
        catch{}
    },

    crearShelter : async (req, res) => {
        try{

            //Validamos que no hay ninguna cuenta con correo o ruc iguales
            let duplicado = false
            
            const usernameIngresado = req.body.nombre_de_usuario
            const rucIngresado = req.body.RUC

            const shelters = await UserShelter.findAll()
            const usuarios = await User.findAll()

            for (let shelter of shelters) {
                if (shelter.ruc == rucIngresado)
                {
                    duplicado = true
                    break
                }
            }

            for (let usuario of usuarios){
                if (usuario.username == usernameIngresado)
                {
                    duplicado = true
                    break
                }
            }





            if (duplicado)
            {
                console.log("Hay un duplicado")
                res.redirect('/signup/cuentaDuplicada')
            }
            
            else{
                
                //Ingresar Datos en tabla Locations
                const pais = "Perú"
                const provincia = "Lima"
                const distrito = req.body.distrito
                const direccion = req.body.direccion
    
                const location = await Location.create(
                    {
                        country : pais,
                        province : provincia,
                        district : distrito,
                        address : direccion
                    }
                )
    
                //Obtener ID de Location a introducir en UserPerson
    
                const idLoc = location.id;
    
                //Ingresar Datos en tabla Users
                const nombreUsuario = req.body.nombre_de_usuario
                const contraseña = md5(req.body.contraseña)
    
                const userPrincipal = await User.create(
                    {
                        username : nombreUsuario,
                        password : contraseña,
                        type : 'shelter',
                        status : "actived"
                    }
                )
    
                const idUserPrinc = userPrincipal.id;
    
                //Ingresar Datos en tabla UserPeople
                const nombre = req.body.nombre
    
                const photo = req.file.buffer
    
                const telefono = req.body.telefono
                const ruc = req.body.RUC
                const correo = req.body.correo
    
                //Ingreso de datos
                const people = await UserShelter.create(
                    {
                        name : nombre,
                        photo : photo,
                        phone_number : telefono,
                        ruc : ruc,
                        email : correo,
                        //Rating no va
                        location_id : idLoc,
                        user_id : idUserPrinc
                    }
                )
            }

            res.redirect('/signin')
        }   
        catch{}
    }
};