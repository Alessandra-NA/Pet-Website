const { Router } = require('express');
const {} = require("../middlewares/auth")
const { crearUsuario, editarUsuario } = require('../controllers/user');
const router = Router();

/*
  EXAMPLE:
  router.get('/', nameAuth, getProfile)
*/



router.get('/', crearUsuario)

router.get('/', editarUsuario)



module.exports = router;
