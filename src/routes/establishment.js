const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getEstablishments, showFormNew } = require('../controllers/establishment');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getEstablishments)
router.get('/new', showFormNew)

module.exports = router;
