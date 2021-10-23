const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getEstablishments, showFormNew, saveNewEstablishment } = require('../controllers/establishment');
const router = Router();
const multer = require('multer');

upload = multer();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getEstablishments)
router.get('/new', showFormNew)
router.post('/new/save', upload.single('image'), saveNewEstablishment)

module.exports = router;
