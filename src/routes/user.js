const { Router } = require('express');
const {} = require("../middlewares/auth")
const { crearUsuario, editarUsuarioPeople, editarUsuarioShelter, getEditarTipoUsuario, redireccionarTipoUsuarioEditar } = require('../controllers/user');
const router = Router();

/*
  EXAMPLE:
  router.get('/', nameAuth, getProfile)
*/

router.get('/people', editarUsuarioPeople)
router.get('/shelter', editarUsuarioShelter)

router.get('/elegirTipo', getEditarTipoUsuario)
router.post('/elegirTipo', redireccionarTipoUsuarioEditar)



module.exports = router;
