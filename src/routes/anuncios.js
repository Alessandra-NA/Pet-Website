const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getAnuncios, getReportarAnuncios, postAnuncioReportado } = require('../controllers/anuncios');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getAnuncios)
router.get('/reportar', getReportarAnuncios)
router.post('/reportar/done', postAnuncioReportado)

module.exports = router;
