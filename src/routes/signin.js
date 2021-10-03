const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getSignIn, iniciarSesion } = require('../controllers/signin');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getSignIn)

router.post('/iniciar', iniciarSesion)

module.exports = router;