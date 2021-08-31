module.exports = {

  mainPage: (req, res) => {
    if (!req.session.userType || req.session.userType.length === 0) {
      return res.render('index');
    }
    if (req.session.userType === 'shelter') {
      return res.render('index');
    }
    return res.redirect('/');
  },
};
