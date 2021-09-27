const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getShelters } = require('../controllers/shelters');
const router = Router();

router.get('/', getShelters)
module.exports = router;