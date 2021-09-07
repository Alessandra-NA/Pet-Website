const express = require('express');

const { mainPage } = require('../controllers');
const userRoutes = require('./user');
const adopcionRoutes = require('./adopcion')
<<<<<<< HEAD
const matchRoutes = require('./match')
=======
>>>>>>> 1a217647ee468f7f9b3e815fc833124a02f433be
const anunciosRouter = require('./anuncios')

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {

  app.use('^/$', mainPage);
  app.use('/user', userRoutes);
  app.use('/adopcion', adopcionRoutes);
<<<<<<< HEAD
  app.use('/match', matchRoutes);
=======
>>>>>>> 1a217647ee468f7f9b3e815fc833124a02f433be
  app.use('/anuncios', anunciosRouter);

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
