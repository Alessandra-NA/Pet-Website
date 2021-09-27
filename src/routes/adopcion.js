const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getInicioAdopcion, postAdopcion } = require('../controllers/adopcion');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getInicioAdopcion)
router.post('/postAdopcion', postAdopcion);

module.exports = router;
