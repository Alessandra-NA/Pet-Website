const express = require('express');

const { mainPage } = require('../controllers');
const userRoutes = require('./user');
const adopcionRoutes = require('./adopcion')
const matchRoutes = require('./match')
const anunciosRouter = require('./anuncios')
const signupRouter = require('./signup')

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
  app.use('/signup', signupRouter);
=======
>>>>>>> cdc8861e4f1950eca9083ff1831b87fa7948836d

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
