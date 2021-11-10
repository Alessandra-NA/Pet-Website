const { Router } = require('express');
const {authUser} = require("../middlewares/auth")
const { getEstablishment } = require('../controllers/suggestion_form');
const router = Router();



router.get('/',authUser, getEstablishment)
module.exports = router;