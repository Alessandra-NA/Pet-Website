const express = require('express');

const { mainPage } = require('../controllers');
const userRoutes = require('./user');
const adopcionRoutes = require('./adopcion')
<<<<<<< Updated upstream
const matchRoutes = require('./match')
=======
>>>>>>> Stashed changes
const anunciosRouter = require('./anuncios')

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {

  app.use('^/$', mainPage);
  app.use('/user', userRoutes);
  app.use('/adopcion', adopcionRoutes);
<<<<<<< Updated upstream
  app.use('/match', matchRoutes);
=======
>>>>>>> Stashed changes
  app.use('/anuncios', anunciosRouter);

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
