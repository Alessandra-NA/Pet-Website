const { Router } = require('express');
const { } = require("../middlewares/auth")
const { getFormularioMatch } = require('../controllers/match');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getFormularioMatch )

module.exports = router;