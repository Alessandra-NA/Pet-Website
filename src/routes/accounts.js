const { Router } = require('express');
const { authAdmin } = require("../middlewares/auth")
const { showAccounts, deleteAccount, showAccountDetails, chooseTypeAccountToManage, getAccounts, deleteEstablecimiento, getSugerencias, confirmarSugerencia, eliminarSugerengia, getReportesAdopcion, confirmarReporte } = require('../controllers/accounts');
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
router.post('/cambiarStatus', confirmarReporte)
router.get('/deleteEstablecimiento/:estid', authAdmin, deleteEstablecimiento)
router.get('/delete/:userid', authAdmin, deleteAccount)

module.exports = router;
