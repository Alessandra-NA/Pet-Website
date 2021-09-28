const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getSignUp, chooseTypeAccount } = require('../controllers/signup');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.post('/', getSignUp)

router.get('/chooseTypeAccount', chooseTypeAccount)

module.exports = router;