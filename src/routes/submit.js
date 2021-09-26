const { Router } = require('express');
const { } = require("../middlewares/auth")
const { saveData } = require('../controllers/submit');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.post('/', saveData)

module.exports = router;