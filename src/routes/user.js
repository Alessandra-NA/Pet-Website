const { Router } = require('express');
const {} = require("../middlewares/auth")
const { logoutUser, crearUsuario, editarUsuarioPeople, editarUsuarioShelter, getEditarTipoUsuario, redireccionarTipoUsuarioEditar, realizarEdicion } = require('../controllers/user');
const router = Router();
const multer = require('multer');
upload = multer();

/*
  EXAMPLE:
  router.get('/', nameAuth, getProfile)
*/

router.get('/people', editarUsuarioPeople)
router.get('/shelter', editarUsuarioShelter)
router.get('/logout', logoutUser)
router.get('/elegirTipo', getEditarTipoUsuario)
router.post('/elegirTipo', redireccionarTipoUsuarioEditar)
router.post('/done', upload.single('image'), realizarEdicion)



module.exports = router;
