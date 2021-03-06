const express = require('express');
const { mainPage } = require('../controllers');
const userRoutes = require('./user');
const adopcionRoutes = require('./adopcion')

const matchRoutes = require('./match')
const anunciosRouter = require('./anuncios')
const petDetalleRouter = require('./pet_detalle')
const SheltersRouter = require('./shelters')
const ShelterDetalleRouter = require('./shelter_detalle')
const crearUsuarioRouter = require('./user')
const editarUsuarioRouter = require('./user')
const perfilUsuarioRouter = require('./user')
const signupRouter = require('./signup')
const signinRouter = require('./signin')
const postRouter = require('./post')
const accountsRouter = require('./accounts')
const establishmentRouter = require('./establishment')
const establcimientoDetalleRouter = require('./establecimiento_detalle')
const suggestionFormRouter = require('./suggestion_form')
/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {
  app.use('^/$', mainPage);
  app.use('/user', userRoutes);
  app.use('/adopcion', adopcionRoutes);

  app.use('/match', matchRoutes);
  app.use('/anuncios', anunciosRouter);
  app.use('/pet_detalle', petDetalleRouter);
  app.use('/shelters', SheltersRouter);
  
  app.use('/shelter_detalle', ShelterDetalleRouter);

  app.use('/signup', signupRouter);
  app.use('/signin', signinRouter);
  app.use('/crear_usuario', crearUsuarioRouter);
  app.use('/editar_usuario', editarUsuarioRouter);
  app.use('/usuario', perfilUsuarioRouter);
  app.use('/post', postRouter);
  app.use('/accounts', accountsRouter);

  app.use('/establishments', establishmentRouter)
  app.use('/establecimiento_detalle', establcimientoDetalleRouter)
  app.use('/establecimiento_detalle/ds', establcimientoDetalleRouter)
  app.use('/suggestion_form', suggestionFormRouter)
  
  app.use((_, res) => {
    res.render('notFound');
  });
}
module.exports = {
  routerConnection,
}
