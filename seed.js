// node 
const { sequelize, ActivityLevel, Gender, Location, Pet, Post, Size, Specie, User, UserType } = require('./src/models');
const fs = require('fs');

const nivelesActividad = [
  { name: 'Desconocida' },
  { name: 'Nula' },
  { name: 'Baja' },
  { name: 'Media' },
  { name: 'Alta' },
  { name: 'Muy alta' }
];

const generos = [
  { name: 'Macho' },
  { name: 'Hembra' },
  { name: 'Masculino' },
  { name: 'Femenino' },
  { name: 'Sin especificar' }
];

const tamanhos = [
  { name: 'Pequeño' },
  { name: 'Mediano' },
  { name: 'Grande' }
];

const especies = [
  { name: 'Perro' },
  { name: 'Gato' }
];

const tiposUsuarios = [
  { name: 'Administrador' },
  { name: 'Persona' },
  { name: 'Albergue' }
];

function urlToBlob(url) {
  try {
    fs.readFile(url, (err, data) => {
      if (err) throw err;
      img64 = data.toString('base64');
      buffer = Buffer.from(img64, 'base64');
      return buffer;
    })
  }
  catch { }
}

let file = "G:/cat.jpeg"

let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia eu libero eu gravida. Morbi varius sapien sed luctus tempus. In et tellus ac ante gravida porttitor. Proin ultrices, nulla et luctus facilisis, risus augue rutrum turpis, finibus";
/*
fs.readFile(file).then((error, data) => {
  if (!error) {
    img64 = data.toString('base64');
    buffer = Buffer.from(img64, 'base64');
    const mascotas = [
      { name: 'Firulais', photo: buffer, birthdate: new Date(), weight: 7.5, story: text, activitylevel_id: 1, size: 1, specie_id: 2, gender_id: 1 }
    ]
  }
})
*/

const mascotas = [
  { name: 'Firulais', photo: urlToBlob(file), birthdate: new Date(), weight: 7.5, story: text, activitylevel_id: 1, size: 1, specie_id: 2, gender_id: 1 },
  { name: 'Dharma', photo: urlToBlob(file), birthdate: new Date(), weight: 7.5, story: text, activitylevel_id: 2, size: 2, specie_id: 1, gender_id: 2 },
  { name: 'Moly', photo: urlToBlob(file), birthdate: new Date(), weight: 7.5, story: text, activitylevel_id: 3, size: 3, specie_id: 2, gender_id: 2 },
  { name: 'Grumpy', photo: urlToBlob(file), birthdate: new Date(), weight: 7.5, story: text, activitylevel_id: 4, size: 1, specie_id: 2, gender_id: 1 },
  { name: 'Sami', photo: urlToBlob(file), birthdate: new Date(), weight: 7.5, story: text, activitylevel_id: 5, size: 2, specie_id: 2, gender_id: 2 },
  { name: 'Boby', photo: urlToBlob(file), birthdate: new Date(), weight: 7.5, story: text, activitylevel_id: 6, size: 3, specie_id: 1, gender_id: 1 },
  { name: 'Tango', photo: urlToBlob(file), birthdate: new Date(), weight: 7.5, story: text, activitylevel_id: 1, size: 1, specie_id: 2, gender_id: 1 }

];

const localizaciones = [
  { country: 'Perú', province: 'Lima', district: 'La Molina', address: 'Calle XXX 123' },
];

const usuarios = [
  { username: 'User 1', password: 'Password', type_id: 2, location_id: 1 },
  { username: 'User 2', password: 'Password', type_id: 2, location_id: 1 },
  { username: 'User 3', password: 'Password', type_id: 2, location_id: 1 }
];

const posts = [
  { user_id: 1, pet_id: 1 },
  { user_id: 1, pet_id: 2 },
  { user_id: 1, pet_id: 3 },
  { user_id: 2, pet_id: 4 },
  { user_id: 3, pet_id: 5 },
  { user_id: 3, pet_id: 6 },
  { user_id: 3, pet_id: 7 },
];

const main = async () => {
  try {
    await sequelize.sync({ force: true });

    nivelesActividad.forEach(async nivel => {
      try {
        await ActivityLevel.create(nivel);
      } catch (err) {
        console.log(err);
      }
    });

    generos.forEach(async genero => {
      try {
        await Gender.create(genero);
      } catch (err) {
        console.log(err);
      }
    });

    tamanhos.forEach(async tamahno => {
      try {
        await Size.create(tamahno);
      } catch (err) {
        console.log(err);
      }
    });

    especies.forEach(async especie => {
      try {
        await Specie.create(especie);
      } catch (err) {
        console.log(err);
      }
    });

    tiposUsuarios.forEach(async tipo => {
      try {
        await UserType.create(tipo);
      } catch (err) {
        console.log(err);
      }
    });

    mascotas.forEach(async mascota => {
      try {
        await Pet.create(mascota);
      } catch (err) {
        console.log(err);
      }
    });

    localizaciones.forEach(async localizacion => {
      try {
        await Location.create(localizacion);
      } catch (err) {
        console.log(err);
      }
    });

    usuarios.forEach(async usuario => {
      try {
        await User.create(usuario);
      } catch (err) {
        console.log(err);
      }
    });

    posts.forEach(async post => {
      try {
        await Post.create(post);
      } catch (err) {
        console.log(err);
      }
    });

  } catch (err) {
    console.log(err);
  }
}
main();

