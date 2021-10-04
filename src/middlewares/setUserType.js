module.exports = {
  /**
   * @param {import('express').Request & import('express-session').SessionData} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  roleRequestMiddleware: (req, res, next) => {
    res.locals.globalType = req.session.userType ? req.session.userType : '';
    next();
  },

};
