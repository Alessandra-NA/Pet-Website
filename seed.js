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

  } catch (err) {
    console.log(err);
  }
}
main();

