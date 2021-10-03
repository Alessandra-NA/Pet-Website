const { Router } = require('express');
<<<<<<< HEAD
const {} = require("../middlewares/auth")
const { showAccounts, deleteAccount, showAccountDetails } = require('../controllers/accounts');
=======
const { authAdmin } = require("../middlewares/auth")
const { showAccounts, deleteAccount } = require('../controllers/accounts');
>>>>>>> main
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', authAdmin, showAccounts)
router.get('/delete/:userid', deleteAccount)

module.exports = router;
