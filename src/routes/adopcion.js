const { Router } = require('express');
const {authUser} = require("../middlewares/auth")
const { getInicioAdopcion, postAdopcion } = require('../controllers/adopcion');
const router = Router();
const multer = require('multer');
const {Pet, Post} = require('../models');

upload = multer();

/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/',authUser, getInicioAdopcion)
router.post('/postAdopcion', upload.single('image'), postAdopcion);

module.exports = router;
