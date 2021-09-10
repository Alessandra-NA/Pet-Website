const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getEditarUsuario } = require('../controllers/user');
const router = Router();

/*
  EXAMPLE:
  router.get('/', nameAuth, getProfile)
*/
router.get('/editar/', getEditarUsuario)

module.exports = router;
