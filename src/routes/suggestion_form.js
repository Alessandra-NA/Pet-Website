const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getEstablishment } = require('../controllers/suggestion_form');
const router = Router();


router.get('/', getEstablishment)
module.exports = router;