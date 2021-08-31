const { Router } = require('express');
const {} = require("../middlewares/auth")
const { /* getPetPost */ } = require('../controllers/pet');
const router = Router();

/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/

module.exports = router;
