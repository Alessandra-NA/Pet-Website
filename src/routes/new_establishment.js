const { Router } = require('express');
const {} = require("../middlewares/auth")
const { showForm } = require('../controllers/new_establishment');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', showForm)
module.exports = router;
