const { Router } = require('express');
const { authAdmin } = require("../middlewares/auth")
const { showAccounts, deleteAccount, showAccountDetails, chooseTypeAccountToManage, getAccounts } = require('../controllers/accounts');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', authAdmin, chooseTypeAccountToManage)
router.post('/', authAdmin, getAccounts)
//router.get('/', authAdmin, showAccounts) --> reemplazado por getAccounts
router.get('/delete/:userid', deleteAccount)

module.exports = router;
