const { Pet, Post } = require('../models');
const { Op } = require("sequelize");

const filtrarIds = (mascotas, ids) => {
    ids = []
    mascotas.forEach(m => {
        ids.push(m.id)
    });
    return ids
};

const imagesToBase64 = (postsArray) => {
    let array = postsArray.map((post) => {
        if (post.pet.photo) {
            post.pet.photo = Buffer.from(post.pet.photo).toString('base64');
        }
        return post
    })
    return array
}

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
    },

    getResultados: async (req, res) => {
        /* BODY:
            tipos: perros / gatos
            tamañocasa: 1 / 2 / 3
            gastos: si / no
            cambiohogar: si / no
            masanimales: si / no
            disponibilidadtiempo: 1 / 2 / 3
            cbTamMin: on / null
            cbTamPeq: on / null
            cbTamMed: on / null
            cbTamGra: on / null
        */
        try {
            var idsFiltrados = []
            var flagAlertaAbandono = false
            var flagMasAnimales = false
            var cbTamMin = ''
            var cbTamPeq = ''
            var cbTamMed = ''
            var cbTamGra = ''
            if (req.body.cbTamMin == 'on') cbTamMin = '1'
            if (req.body.cbTamPeq == 'on') cbTamPeq = '2'
            if (req.body.cbTamMed == 'on') cbTamMed = '3'
            if (req.body.cbTamGra == 'on') cbTamGra = '4'
            //var mascotas = await 
            var mascotas = await Pet.findAll({
                attributes: ['id'],
                raw: true
            })
            idsFiltrados = filtrarIds(mascotas, idsFiltrados)
            // primera pregunta
            if (req.body.tipos == 'perros')
                mascotas = await Pet.findAll({
                    attributes: ['id'],
                    where: {
                        id: idsFiltrados,
                        specie_id: 1
                    },
                    raw: true
                })
            else
                mascotas = await Pet.findAll({
                    attributes: ['id'],
                    where: {
                        id: idsFiltrados,
                        specie_id: 2
                    },
                    raw: true
                })
            idsFiltrados = filtrarIds(mascotas, idsFiltrados)
            // segunda pregunta
            /* si son gatos, no importa el tamaño de la casa porque 
            todos los gatos son del mismo tamaño, el filtro solo aplica
            para los perros */
            if (req.body.tipos == 'perros') {
                if (req.body.tamañocasa == '1')
                    mascotas = await Pet.findAll({
                        attributes: ['id'],
                        where: {
                            id: idsFiltrados,
                            [Op.or]: [
                                { size_id: 1 },
                                { size_id: 2 },
                                {
                                    [Op.and]: [
                                        { size_id: 3 },
                                        { activitylevel_id: { [Op.lte]: 3 } }
                                    ]
                                },
                                {
                                    [Op.and]: [
                                        { size_id: 4 },
                                        { activitylevel_id: { [Op.lte]: 2 } }
                                    ]
                                }
                            ]
                        },
                        raw: true
                    })
                else if (req.body.tamañocasa == '2')
                    mascotas = await Pet.findAll({
                        attributes: ['id'],
                        where: {
                            id: idsFiltrados,
                            [Op.or]: [
                                { size_id: 1 },
                                { size_id: 2 },
                                { size_id: 3 },
                                {
                                    [Op.and]: [
                                        { size_id: 4 }, 
                                        { activitylevel_id: { [Op.lte]: 2 } }
                                    ]
                                }
                            ]
                        },
                        raw: true
                    })
                idsFiltrados = filtrarIds(mascotas, idsFiltrados)
            }
            console.log(mascotas)
            // tercera pregunta
            /* si no tiene mucho dinero para cubrir gastos grandes, se recomienda
                una mascota menor a 5 años, vacunado, sano, esterilizado y desparasitado */
            if (req.body.gastos == 'no') {
                const fiveYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 5))
                mascotas = await Pet.findAll({
                    attributes: ['id'],
                    raw: true,
                    where: {
                        birthdate: { [Op.gte]: fiveYearsAgo },
                        vacunado: true,
                        desparasitado: true,
                        sano: true,
                        esterilizado: true,
                        id: idsFiltrados
                    }
                })
                idsFiltrados = filtrarIds(mascotas, idsFiltrados)
            }
            console.log(mascotas)
            // cuarta pregunta
            /* se muestra una alerta con respecto al abandono */
            if (req.body.cambiohogar == 'si') flagAlertaAbandono = true
            // quinta pregunta
            /* se muestra una alerta con respecto a más animales en casa */
            if (req.body.masanimales == 'si') flagMasAnimales = true
            // sexta pregunta
            /* una persona sin tiempo no puede tener a una mascota activa, 
                se toma en cuenta tambien el tamaño de la casa */
            if (req.body.disponibilidadtiempo == '2')
                mascotas = await Pet.findAll({
                    attributes: ['id'],
                    raw: true,
                    where: {
                        id: idsFiltrados,
                        [Op.or]: [
                            { size_id: 1 },
                            { size_id: 2, activitylevel_id: { [Op.lte]: 3 } },
                            { size_id: 3, activitylevel_id: { [Op.lte]: 3 } },
                            { size_id: 4, activitylevel_id: { [Op.lte]: 2 } },
                        ]
                    }
                })
            else if (req.body.disponibilidadtiempo == '3' && (req.body.tamañocasa == '2' || req.body.tamañocasa == '3'))
                mascotas = await Pet.findAll({
                    attributes: ['id'],
                    raw: true,
                    where: {
                        id: idsFiltrados,
                        [Op.or]: [
                            { size_id: 1 },
                            { size_id: 2 },
                            { size_id: 3, activitylevel_id: { [Op.lte]: 3 } },
                            { size_id: 4, activitylevel_id: { [Op.lte]: 2 } },
                        ]
                    }
                })
            else if (req.body.disponibilidadtiempo == '3' && req.body.tamañocasa == '1')
                mascotas = await Pet.findAll({
                    attributes: ['id'],
                    raw: true,
                    where: {
                        id: idsFiltrados,
                        [Op.or]: [
                            { size_id: 1 },
                            { size_id: 2, activitylevel_id: { [Op.lte]: 3 } },
                            { size_id: 3, activitylevel_id: { [Op.lte]: 2 } },
                        ]
                    }
                })
            idsFiltrados = filtrarIds(mascotas, idsFiltrados)
            console.log(mascotas)
            // séptima pregunta
            mascotas = await Pet.findAll({
                attributes: ['id'],
                raw: true,
                where: {
                    id: idsFiltrados,
                    size_id: { [Op.or]: [cbTamMin, cbTamPeq, cbTamMed, cbTamGra].filter(e => e != '') }
                }
            })
            idsFiltrados = filtrarIds(mascotas, idsFiltrados)
            console.log(mascotas)
            // enviar al view de posts
            Post.findAll({
                include: { all: true },
                where: {
                    pet_id: idsFiltrados
                }
            }).then((response) => {
                console.log(response)
                res.render('anuncios', { title: 'Resultados', posts: imagesToBase64(response), match: true, alerta1: flagAlertaAbandono, alerta2: flagMasAnimales })
            });
            //res.send(req.body)
        } catch (error) {
            console.log(error)
        }
    }
};

