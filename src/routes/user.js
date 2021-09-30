const { Router } = require('express');
const {} = require("../middlewares/auth")
const { crearUsuario, editarUsuarioPeople, editarUsuarioShelter } = require('../controllers/user');
const router = Router();

/*
  EXAMPLE:
  router.get('/', nameAuth, getProfile)
*/

router.get('/people', editarUsuarioPeople)
router.get('/shelter', editarUsuarioShelter)



module.exports = router;
