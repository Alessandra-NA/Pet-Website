module.exports = {

  /* AUTH EXAMPLE 
  authSession: (req, res, next) => { // Verifica si se logueó
    if (!req.session.userId || !req.session.userType) {
      res.status(401).redirect('/login');
    } else {
      next();
    }
  },
  authAdmin: (req, res, next) => {
    if (req.session.userType !== 'exampleType') {
      res.status(401).redirect('/login');
    } else {
      next();
    }
  }, 
  */
  
  /**
  * Middleware para la atenticacion del Admin
  *
  * @param {import('express').Request & import('express-session').SessionData} req
  * @param {import('express').Response} res
  * @param {import('express').NextFunction} next
  */
  authAdmin: (req, res, next) => {
    if (req.session.userType !== 'admin') {
      res.status(401).redirect('/anuncios');
    } else {
      next();
    }
  },

  authUser: (req, res, next) => {
    if (req.session.userType !== 'person' && req.session.userType !== 'shelter') {
      res.status(401).redirect('/anuncios');
    } else {
      next();
    }
  },

  authLoged: (req, res, next) => {
    if (req.session.userType === 'person' || req.session.userType === 'shelter' || req.session.userType === 'admin') {
      res.status(401).redirect('/anuncios');
    } else {
      next();
    }
  },
  authAdmin: (req, res, next) => {
    if (req.session.userType === 'admin') {
      next();
    } else {
      res.status(401).redirect('/anuncios');
    }
  }

  
}
