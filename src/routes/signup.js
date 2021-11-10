const { Router } = require('express');
const {authLoged } = require("../middlewares/auth")
const { getSignUp, chooseTypeAccount, crearPeople, crearShelter, getCuentaDuplicada } = require('../controllers/signup');
const router = Router();
const multer = require('multer');
upload = multer();

/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.post('/', getSignUp)

router.post('/crearPeople', upload.single('image'), crearPeople)

router.post('/crearShelter', upload.single('image'), crearShelter)

router.get('/chooseTypeAccount',authLoged, chooseTypeAccount)

router.get('/cuentaDuplicada', getCuentaDuplicada)


module.exports = router;