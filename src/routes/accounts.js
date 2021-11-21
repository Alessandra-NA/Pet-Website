const { Router } = require('express');
const { authAdmin } = require("../middlewares/auth")
const { showAccounts, deleteAccount, showAccountDetails, chooseTypeAccountToManage, confirmarReporteComment, getAccounts, deleteEstablecimiento, getSugerencias, confirmarSugerencia, eliminarSugerengia, getReportesAdopcion, confirmarReporte, getReportesComentarios } = require('../controllers/accounts');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/

router.get('/', authAdmin, getAccounts)
router.get('/verSugerencias/:estid', authAdmin, getSugerencias)
router.post('/confirmarSugerencia', confirmarSugerencia)
router.get('/eliminarSugerencia/:sugid', authAdmin,eliminarSugerengia)
//router.get('/', authAdmin, showAccounts) --> reemplazado por getAccounts
router.get('/reporteAdopcion', authAdmin, getReportesAdopcion)
router.get('/reporteComentario', authAdmin, getReportesComentarios)
router.post('/cambiarStatus', confirmarReporte)
router.post('/cambiarStatus2', confirmarReporteComment)
router.get('/deleteEstablecimiento/:estid', authAdmin, deleteEstablecimiento)
router.get('/delete/:userid', authAdmin, deleteAccount)

module.exports = router;
