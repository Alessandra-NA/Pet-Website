// node
const md5 = require('md5');
const { sequelize, ActivityLevel, Gender, Location, Pet, Post, Size, Specie, User, UserAdmin, UserPerson, UserShelter } = require('./src/models');
const fs = require('fs');

const nivelesActividad = [
  { name: 'Desconocida' },
  { name: 'Baja' },
  { name: 'Media' },
  { name: 'Alta' }
];

const generos = [
  { name: 'Macho' },
  { name: 'Hembra' },
  { name: 'Masculino' },
  { name: 'Femenino' },
  { name: 'Sin especificar' }
];

const tamanhos = [
  { name: 'Miniatura' },
  { name: 'Pequeño' },
  { name: 'Mediano' },
  { name: 'Grande' }
];

const especies = [
  { name: 'Perro' },
  { name: 'Gato' }
];

let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia eu libero eu gravida. Morbi varius sapien sed luctus tempus. In et tellus ac ante gravida porttitor.";
const path = require('path')

const mascotas = [
  { name: 'Firulais', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: true, sano: true, esterilizado: true, microchip: true,
    activitylevel_id: 1, size_id: 1, specie_id: 1, gender_id: 1 },

  { name: 'Dharma', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: false, desparasitado: true, sano:true, esterilizado: false, microchip: false,
    activitylevel_id: 2, size_id: 2, specie_id: 2, gender_id: 2 },

  { name: 'Moly', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: true, sano: true, esterilizado: true, microchip: true,
    activitylevel_id: 3, size_id: 3, specie_id: 1, gender_id: 2 },

  { name: 'Grumpy', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: false, sano:true, esterilizado: true, microchip: true,
    activitylevel_id: 4, size_id: 1, specie_id: 1, gender_id: 1 },

  { name: 'Sami', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: true, sano: true, esterilizado: true, microchip: true,
    activitylevel_id: 1, size_id: 2, specie_id: 2, gender_id: 2 },
  
  { name: 'Oso', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: false, sano: false, esterilizado: true, microchip: true,
    activitylevel_id: 4, size_id: 4, specie_id: 1, gender_id: 1 },
    
  { name: 'Tony', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: true, sano: true, esterilizado: true, microchip: true,
    activitylevel_id: 3, size_id: 4, specie_id: 1, gender_id: 1 },
    
  { name: 'Lucas', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: false, sano: false, esterilizado: true, microchip: true,
    activitylevel_id: 2, size_id: 4, specie_id: 2, gender_id: 1 },
    
  { name: 'Leo', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: true, sano: true, esterilizado: true, microchip: true,
    activitylevel_id: 1, size_id: 4, specie_id: 1, gender_id: 1 },

  { name: 'Boby', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: false, desparasitado: true, sano:true, esterilizado: false, microchip: true,
    activitylevel_id: 2, size_id: 2, specie_id: 2, gender_id: 1 },

  { name: 'Tango', photo: null, birthdate: new Date(), weight: 7.5, story: text,
    vacunado: true, desparasitado: true, sano: true, esterilizado: true, microchip: false,
    activitylevel_id: 3, size_id: 2, specie_id: 1, gender_id: 1 }
];

const localizaciones = [
  { country: 'Perú', province: 'Lima', district: 'La Molina', address: 'Calle XXX 123' },
  { country: 'Perú', province: 'Lima', district: 'Jesús María', address: 'Calle YYY 123' },
  { country: 'Perú', province: 'Lima', district: 'Ate', address: 'Calle ZZZ 123' }
];

const usuarios = [
  { username: 'User1', password: md5('123'), type: 'person', status: 'actived'},
  { username: 'User2', password: md5('123'), type: 'person', status: 'actived'},
  { username: 'User3', password: md5('123'), type: 'shelter', status: 'actived'},
  { username: 'User4', password: md5('123'), type: 'admin', status: 'actived'}
];

const usuarios_personas = [
  { first_name: 'John', last_name: 'Perez', photo: null, phone_number: '954684126', document_number: '54862459', email: 'correo1@gmail.com', rating: 3, location_id: 1, user_id: 1, gender_id: 1},
  { first_name: 'Lia', last_name: 'Ber', photo: null, phone_number: '998745682', document_number: '75963669', email: 'correo2@gmail.com', rating: 4, location_id: 2, user_id: 2, gender_id: 1}
];

const usuarios_shelters = [
  { name:'NyoShelter', photo: null, phone_number: '956841264', ruc:'36544879', email: 'correo3@gmail.com', rating: 5, location_id: 3, user_id: 3}
]

const usuarios_admin = [
  { name: 'Nyo', user_id: 4}
]

const posts = [
  { user_id: 1, pet_id: 1 },
  { user_id: 1, pet_id: 2 },
  { user_id: 1, pet_id: 3 },
  { user_id: 2, pet_id: 4 },
  { user_id: 3, pet_id: 5 },
  { user_id: 3, pet_id: 6 },
  { user_id: 3, pet_id: 7 },
  { user_id: 2, pet_id: 8 },
  { user_id: 2, pet_id: 9 },
  { user_id: 2, pet_id: 10 },
  { user_id: 2, pet_id: 11 }
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
        const newPet = await Pet.create(mascota);
        var imagenTemp
        if(newPet.specie_id==1){
          imagenTemp = "'"+path.resolve('src/public/img','dog.jpg')+"'"
        }else{
          imagenTemp = "'"+path.resolve('src/public/img','cat.jpg')+"'"
        }
        sequelize.query('UPDATE "Pets" set photo=pg_read_binary_file('+imagenTemp+') where id='+newPet.id)
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
         const newUsuario = await UserPerson.create(usuario_persona);
         var imagenTemp = "'"+path.resolve('src/public/img','profile_user.png')+"'"
         sequelize.query('UPDATE "UserPeople" set photo=pg_read_binary_file('+imagenTemp+') WHERE id='+newUsuario.id)
      } catch (err) {
        console.log(err);
      }
    });
    usuarios_shelters.forEach(async usuario_shelter =>{
      try {
        const newUsuario = await UserShelter.create(usuario_shelter);
        var imagenTemp = "'"+path.resolve('src/public/img','profile_shelter.png')+"'"
         sequelize.query('UPDATE "UserShelters" set photo=pg_read_binary_file('+imagenTemp+') WHERE id='+newUsuario.id)
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

