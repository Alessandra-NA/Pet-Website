const { Router } = require('express');
const {} = require("../middlewares/auth")
const { logoutUser, redireccionarTipoUsuarioEditar, realizarEdicion, getPerfilUsuario, getCambiarContraseña, cambiarContraseña } = require('../controllers/user');
const router = Router();
const multer = require('multer');
upload = multer();

/*
  EXAMPLE:
  router.get('/', nameAuth, getProfile)
*/


router.get('/logout', logoutUser)
router.get('/elegirTipo', redireccionarTipoUsuarioEditar)
router.post('/done', upload.single('image'), realizarEdicion)
router.get('/perfil', getPerfilUsuario)
router.get('/cambiarContrasena', getCambiarContraseña)
router.post('/cambiarContrasena', cambiarContraseña)




module.exports = router;
