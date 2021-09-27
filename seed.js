// node 
const { sequelize, ActivityLevel, Gender, Location, Pet, Post, Size, Specie, User, UserAdmin, UserPerson, UserShelter } = require('./src/models');
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

let file = "G:/cat.jpeg"

let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia eu libero eu gravida. Morbi varius sapien sed luctus tempus. In et tellus ac ante gravida porttitor. Proin ultrices, nulla et luctus facilisis, risus augue rutrum turpis, finibus";

const mascotas = [
  { name: 'Firulais', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: true, sano:false, esterilizado: false, microchip: true,
    activitylevel_id: 1, size_id: 1, specie_id: 2, gender_id: 1 },

  { name: 'Dharma', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: false, desparasitado: true, sano:true, esterilizado: false, microchip: false,
    activitylevel_id: 2, size_id: 2, specie_id: 1, gender_id: 2 },

  { name: 'Moly', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: true, sano:false, esterilizado: false, microchip: true,
    activitylevel_id: 3, size_id: 3, specie_id: 2, gender_id: 2 },

  { name: 'Grumpy', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: false, sano:true, esterilizado: true, microchip: true,
    activitylevel_id: 4, size_id: 1, specie_id: 2, gender_id: 1 },

  { name: 'Sami', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: false, sano:false, esterilizado: true, microchip: true,
    activitylevel_id: 5, size_id: 2, specie_id: 2, gender_id: 2 },

  { name: 'Boby', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: false, desparasitado: true, sano:true, esterilizado: false, microchip: true,
    activitylevel_id: 6, size_id: 3, specie_id: 1, gender_id: 1 },

  { name: 'Tango', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: true, sano:false, esterilizado: true, microchip: false,
    activitylevel_id: 1, size_id: 1, specie_id: 2, gender_id: 1 }
];

const localizaciones = [
  { country: 'Perú', province: 'Lima', district: 'La Molina', address: 'Calle XXX 123' },
  { country: 'Perú', province: 'Lima', district: 'Jesús María', address: 'Calle YYY 123' },
  { country: 'Perú', province: 'Lima', district: 'Ate', address: 'Calle ZZZ 123' }
];

const usuarios = [
  { username: 'User 1', password: '123', type: 'person' },
  { username: 'User 2', password: '123', type: 'person' },
  { username: 'User 3', password: '123', type: 'shelter' },
  { username: 'User 4', password: '123', type: 'admin' }
];

const usuarios_personas = [
  { first_name: 'John', last_name: 'Perez', photo: null, phone_number: '123456789', document_number: '12345678', email: 'correo1@gmail.com', rating: 3, location_id: 1, user_id: 1, gender_id: 1},
  { first_name: 'Lia', last_name: 'Ber', photo: null, phone_number: '123456789', document_number: '12345678', email: 'correo2@gmail.com', rating: 4, location_id: 2, user_id: 2, gender_id: 1}
];

const usuarios_shelters = [
  { name:'NyoShelter', photo: null, phone_number: '123456789', ruc:'12345678', email: 'correo3@gmail.com', rating: 5, location_id: 3, user_id: 3}
]

const usuarios_admin = [
  { name: 'Nyo', user_id: 4}
]

const posts = [
  { user_id: 1, pet_id: 1, flagReportado: false },
  { user_id: 1, pet_id: 2, flagReportado: false },
  { user_id: 1, pet_id: 3, flagReportado: false },
  { user_id: 2, pet_id: 4, flagReportado: false },
  { user_id: 3, pet_id: 5, flagReportado: false },
  { user_id: 3, pet_id: 6, flagReportado: false },
  { user_id: 3, pet_id: 7, flagReportado: false },
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

    usuarios_personas.forEach(async usuario_persona =>{
      try {
        await UserPerson.create(usuario_persona);
      } catch (err) {
        console.log(err);
      }
    });
    usuarios_shelters.forEach(async usuario_shelter =>{
      try {
        await UserShelter.create(usuario_shelter);
      } catch (err) {
        console.log(err);
      }
    });
    usuarios_admin.forEach(async usuario_admin =>{
      try {
        await UserAdmin.create(usuario_admin);
      } catch (err) {
        console.log(err);
      }
    });

  } catch (err) {
    console.log(err);
  }
}
main();

