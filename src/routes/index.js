const express = require('express');
const { mainPage } = require('../controllers');
const userRoutes = require('./user');
const adopcionRoutes = require('./adopcion')

const matchRoutes = require('./match')
const anunciosRouter = require('./anuncios')
<<<<<<< HEAD
const petDetalleRouter = require('./pet_detalle')
const SheltersRouter = require('./shelters')
=======
const crearUsuarioRouter = require('./user')
const signupRouter = require('./signup')
const signinRouter = require('./signin')
const postRouter = require('./post')
const accountsRouter = require('./accounts')
const submitRouter = require('./submit')
>>>>>>> 52d4697233013d307dbc0b519b6a9fb58a2d95b3

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {
  app.use('^/$', mainPage);
  app.use('/user', userRoutes);
  app.use('/adopcion', adopcionRoutes);

  app.use('/match', matchRoutes);
  app.use('/anuncios', anunciosRouter);
<<<<<<< HEAD
  app.use('/pet_detalle', petDetalleRouter);
  app.use('/shelters', SheltersRouter);
=======
  app.use('/signup', signupRouter);
  app.use('/signin', signinRouter);
  app.use('/crear_usuario', crearUsuarioRouter);
  app.use('/post', postRouter);
  app.use('/accounts', accountsRouter);
  app.use('/submit', submitRouter);
>>>>>>> 52d4697233013d307dbc0b519b6a9fb58a2d95b3

  app.use((_, res) => {
    res.render('notFound');
  });
}
module.exports = {
  routerConnection,
}
