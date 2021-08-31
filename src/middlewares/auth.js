module.exports = {

  authSession: (req, res, next) => { // Verifica si se logueó
    if (!req.session.userId || !req.session.userType) {
      res.status(401).redirect('/login');
    } else {
      next();
    }
  },

  /* AUTH EXAMPLE 
  authAdmin: (req, res, next) => {
    if (req.session.userType !== 'exampleType') {
      res.status(401).redirect('/login');
    } else {
      next();
    }
  }, 
  */
  
}
