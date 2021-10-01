const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getAnuncios, getReportarAnuncios } = require('../controllers/anuncios');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getAnuncios)
router.get('/reportar', getReportarAnuncios)

module.exports = router;
