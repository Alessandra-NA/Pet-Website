const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getFormularioMatch, getResultados } = require('../controllers/match');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getFormularioMatch)
router.post('/resultados', getResultados)
router.get

module.exports = router;