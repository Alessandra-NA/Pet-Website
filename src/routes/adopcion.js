const { Router } = require('express');
const {} = require("../middlewares/auth")
const { getInicioAdopcion, postAdopcion } = require('../controllers/adopcion');
const router = Router();
const multer = require('multer');
const {Pet, Post} = require('../models');

upload = multer();

/*
  EXAMPLE:
  router.get('/', nameAuth, getPetPost)
*/
router.get('/', getInicioAdopcion)
router.post('/postAdopcion', upload.single('image'), postAdopcion);
router.post('/postTest', upload.single('image'), async (req, res) => {
  try {
    console.log("Savin data...")
    if(req.file){
      console.log("req")
      const { name, birthdate, weight, story, activitylevel, size, specie, gender } = req.body;
      console.log("1")
      const { photo } = req.file.buffer
      console.log("2")
      const newPet = await Pet.create({
        name: name,
        photo: photo,
        birthdate: birthdate,
        weight: weight,
        story: story,
        activitylevel_id: activitylevel,
        size_id: size,
        specie_id: specie,
        gender_id: gender,
        vacunado: true,
        desparasitado: true,
        sano: true,
        esterilizado: true,
        microchip: true
      })
      console.log("3")
      const post = await Post.create({
        pet_id: newPet.id,
        user_id: 1, 
        flagReportado: false
      })
      res.redirect('/anuncios')
    }
  }catch {}
})

module.exports = router;
