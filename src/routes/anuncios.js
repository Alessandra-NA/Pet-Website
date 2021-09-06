const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getAnuncios } = require('../controllers/anuncios');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getAnuncios)

module.exports = router;
