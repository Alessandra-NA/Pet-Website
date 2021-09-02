const { Router } = require('express');
const {} = require("../middlewares/auth")
const { crearUsuario } = require('../controllers/user');
const router = Router();

/*
  EXAMPLE:
  router.get('/', nameAuth, getProfile)
*/

router.get('/', crearUsuario)

module.exports = router;
