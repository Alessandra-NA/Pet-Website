const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getSignUp, chooseTypeAccount, crearPeople, crearShelter, getCuentaDuplicada } = require('../controllers/signup');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.post('/', getSignUp)

router.post('/crearPeople', crearPeople)

router.post('/crearShelter', crearShelter)

router.get('/chooseTypeAccount', chooseTypeAccount)

router.get('/cuentaDuplicada', getCuentaDuplicada)

module.exports = router;