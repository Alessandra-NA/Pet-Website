const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getEstablishments } = require('../controllers/establishment');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getEstablishments)

module.exports = router;
