const express = require('express');
const { mainPage } = require('../controllers');
const userRoutes = require('./user');
const adopcionRoutes = require('./adopcion')

const matchRoutes = require('./match')
const anunciosRouter = require('./anuncios')
const signupRouter = require('./signup')
const signinRouter = require('./signin')
const postRouter = require('./post')
const accountsRouter = require('./accounts')

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {
  app.use('^/$', mainPage);
  app.use('/user', userRoutes);
  app.use('/adopcion', adopcionRoutes);

  app.use('/match', matchRoutes);
  app.use('/anuncios', anunciosRouter);
  app.use('/signup', signupRouter);
  app.use('/signin', signinRouter);
  app.use('/post', postRouter);
  app.use('/accounts', accountsRouter);

  app.use((_, res) => {
    res.render('notFound');
  });
}
module.exports = {
  routerConnection,
}
