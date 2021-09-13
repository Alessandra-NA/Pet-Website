const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getSignIn } = require('../controllers/signin');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getSignIn)

module.exports = router;