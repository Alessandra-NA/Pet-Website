const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getInicioAdopcion, postAdopcion } = require('../controllers/adopcion');
const router = Router();
const multer = require('multer');
const {Pet, Post} = require('../models');

upload = multer();

/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getInicioAdopcion)
router.post('/postAdopcion', upload.single('image'), postAdopcion);

module.exports = router;
