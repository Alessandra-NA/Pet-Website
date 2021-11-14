const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getEstablishment, crearSugerencia, postSaveNewComment1, crearReportar } = require('../controllers/establecimiento_detalle');
const router = Router();
const multer = require('multer');
upload = multer();


router.get('/', getEstablishment)
router.post('/ds', upload.array('image'), crearSugerencia)
router.post('/reportar', upload.single('image'), crearReportar)
router.post('/nuevo_comentario', postSaveNewComment1)
module.exports = router;