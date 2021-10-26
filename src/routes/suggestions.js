const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getSuggestions } = require('../controllers/suggestions');
const router = Router();


router.get('/', getSuggestions)
module.exports = router;