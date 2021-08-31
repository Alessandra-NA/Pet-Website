
module.exports = {
  roleRequestMiddleware: (req, res, next) => {
    res.locals.globalRol = req.session.userType ? req.session.userType : '';
    next();
  },

};
