// node 

const { sequelize, ActivityLevel, Gender, Location, Pet, Post, Size, Specie, User, UserType } = require('./src/models');

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

/*function createFile(url){
  let response = await fetch('http://127.0.0.1:8080/test.jpg');
  let data = await response.blob();
  let metadata = {
    type: 'image/*'
  };
  let file = new File([data], url, metadata);
  // ... do something with the file or return it
}*/

let text = "'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia eu libero eu gravida. Morbi varius sapien sed luctus tempus. In et tellus ac ante gravida porttitor. Proin ultrices, nulla et luctus facilisis, risus augue rutrum turpis, finibus";
const mascotas = [
  { name: 'Firulais',photo: null, birthdate: new Date(), weight: 7.5, story: text, activitylevel: 1, size: 1, specie: 2, gender: 1 },
  { name: 'Dharma', photo: null, birthdate: new Date(), weight: 7.5, story: text, activitylevel: '2', size: '2', specie: '1', gender: '2' },
  { name: 'Moly', photo: null, birthdate: new Date(), weight: 7.5, story: text, activitylevel: '3', size: '3', specie: '2', gender: '2' },
  { name: 'Grumpy', photo: null, birthdate: new Date(), weight: 7.5, story: text, activitylevel: '4', size: '1', specie: '2', gender: '1' },
  { name: 'Sami', photo: null, birthdate: new Date(), weight: 7.5, story: text, activitylevel: '5', size: '2', specie: '2', gender: '2' },
  { name: 'Boby', photo: null, birthdate: new Date(), weight: 7.5, story: text, activitylevel: '6', size: '3', specie: '1', gender: '1' },
  { name: 'Tango', photo: null, birthdate: new Date(), weight: 7.5, story: text, activitylevel: '1', size: '1', specie: '2', gender: '1' }
];

const localizaciones = [
  { country: 'Perú', province: 'Lima', district: 'La Molina', address: 'Calle XXX 123'},
];

const usuarios = [
  { username: 'User 1', password: 'Password', user_type: 2, location: 1},
  { username: 'User 2', password: 'Password', user_type: 2, location: 1},
  { username: 'User 3', password: 'Password', user_type: 2, location: 1}
];

const posts = [
  { user: '1', pet: '1'},
  { user: '1', pet: '2'},
  { user: '1', pet: '3'},
  { user: '2', pet: '4'},
  { user: '3', pet: '5'},
  { user: '3', pet: '6'},
  { user: '3', pet: '7'},
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

