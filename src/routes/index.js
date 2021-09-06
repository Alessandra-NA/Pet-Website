const express = require('express');

const { mainPage } = require('../controllers');
const userRoutes = require('./user');
const adopcionRoutes = require('./adopcion')
const anunciosRouter = require('./anuncios')
const crearUsuarioRouter = require('./user')

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {

  app.use('^/$', mainPage);
  app.use('/user', userRoutes);
  app.use('/adopcion', adopcionRoutes);
  app.use('/anuncios', anunciosRouter);
  app.use('/crear_usuario', crearUsuarioRouter);

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
