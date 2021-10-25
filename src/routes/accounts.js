const { Router } = require('express');
const { authAdmin } = require("../middlewares/auth")
const { showAccounts, deleteAccount, showAccountDetails, chooseTypeAccountToManage, getAccounts, deleteEstablecimiento, getSugerencias } = require('../controllers/accounts');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', authAdmin, chooseTypeAccountToManage)
router.post('/', authAdmin, getAccounts)
router.get('/verSugerencias/:estid', getSugerencias)
//router.get('/', authAdmin, showAccounts) --> reemplazado por getAccounts
router.get('/deleteEstablecimiento/:estid', deleteEstablecimiento)
router.get('/delete/:userid', deleteAccount)

module.exports = router;
