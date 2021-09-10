const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getInicioAdopcion } = require('../controllers/adopcion');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getInicioAdopcion)

module.exports = router;
