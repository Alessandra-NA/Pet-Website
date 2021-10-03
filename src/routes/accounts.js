const { Router } = require('express');
const {} = require("../middlewares/auth")
const { showAccounts, deleteAccount, showAccountDetails } = require('../controllers/accounts');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', showAccounts)
router.get('/delete/:userid', deleteAccount)

module.exports = router;
