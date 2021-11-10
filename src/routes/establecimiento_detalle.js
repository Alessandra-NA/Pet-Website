const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getEstablishment, crearSugerencia } = require('../controllers/establecimiento_detalle');
const router = Router();
const multer = require('multer');
upload = multer();


router.get('/', getEstablishment)
router.post('/ds', upload.array('image'), crearSugerencia)
module.exports = router;