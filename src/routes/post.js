const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getPost, deletePost } = require('../controllers/post');
const router = Router();


/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/:postid', getPost)
router.get('/delete/:postid', deletePost)

module.exports = router;
