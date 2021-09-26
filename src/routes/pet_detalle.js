const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getInicioPetDetalle,getRatingUserShelter } = require('../controllers/pet_detalle');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getInicioPetDetalle)
router.get('/:id', getRatingUserShelter)
module.exports = router;
