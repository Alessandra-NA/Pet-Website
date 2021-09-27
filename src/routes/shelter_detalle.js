const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getUserShelter } = require('../controllers/shelter_detalle');
const router = Router();

router.get('/:id', getUserShelter)
module.exports = router;