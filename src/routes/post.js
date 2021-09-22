const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getPost } = require('../controllers/post');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/:postid', getPost)

module.exports = router;
