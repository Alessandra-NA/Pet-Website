const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getSignUp, chooseTypeAccount, crearPeople } = require('../controllers/signup');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.post('/', getSignUp)

router.post('/crearPeople', crearPeople)

router.get('/chooseTypeAccount', chooseTypeAccount)

module.exports = router;