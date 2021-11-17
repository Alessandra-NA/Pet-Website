const { Router } = require('express');
const {authLoged } = require("../middlewares/auth")
const { getSignIn, iniciarSesion } = require('../controllers/signin');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/',authLoged, getSignIn)

router.post('/iniciar', iniciarSesion)

module.exports = router;