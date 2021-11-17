const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getEstablishments, showFormNew, saveNewEstablishment, postSaveNewComment } = require('../controllers/establishment');
const router = Router();
const multer = require('multer');

upload = multer();

/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getEstablishments)
router.get('/new', showFormNew)
router.post('/new/save', upload.array('image'), saveNewEstablishment)
router.post('/establecimiento/nuevo_comentario', postSaveNewComment)

module.exports = router;
