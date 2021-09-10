const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getSignUp } = require('../controllers/signup');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getSignUp)

module.exports = router;