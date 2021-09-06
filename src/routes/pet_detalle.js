const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getInicioPetDetalle } = require('../controllers/pet_detalle');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getInicioPetDetalle)

module.exports = router;
