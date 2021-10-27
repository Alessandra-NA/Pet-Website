const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getEstablishment, crearSugerencia } = require('../controllers/establecimiento_detalle');
const router = Router();


router.get('/', getEstablishment)
router.get('/ds', crearSugerencia)
module.exports = router;