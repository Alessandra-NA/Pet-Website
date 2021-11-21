const { Router } = require('express');
const { authUser } = require("../middlewares/auth")
const { getAnuncios, getReportarAnuncios, postAnuncioReportado } = require('../controllers/anuncios');
const router = Router();
const multer = require('multer');

upload = multer();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getAnuncios)
router.get('/reportar', getReportarAnuncios)
router.post('/reportar/done', upload.single('image'), postAnuncioReportado)

module.exports = router;
