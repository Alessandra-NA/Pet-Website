const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getFormularioMatch, getResultados } = require('../controllers/match');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getFormularioMatch)
router.post('/', getResultados)

module.exports = router;