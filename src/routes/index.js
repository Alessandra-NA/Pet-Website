const express = require('express');

const { mainPage } = require('../controllers');
const userRoutes = require('./user');
const adopcionRoutes = require('./adopcion')
const matchRoutes = require('./match')
const anunciosRouter = require('./anuncios')
<<<<<<< HEAD
const crearUsuarioRouter = require('./user')
=======
>>>>>>> Issue2

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {

  app.use('^/$', mainPage);
  app.use('/user', userRoutes);
  app.use('/adopcion', adopcionRoutes);
  app.use('/match', matchRoutes);
  app.use('/anuncios', anunciosRouter);

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
