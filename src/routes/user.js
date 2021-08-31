const { Router } = require('express');
const {} = require("../middlewares/auth")
const { /*getProfile*/ } = require('../controllers/user');
const router = Router();

/*
  EXAMPLE:
  router.get('/', nameAuth, getProfile)
*/

module.exports = router;
