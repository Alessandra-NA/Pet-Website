// node 
/*
const { sequelize, Equipo, Partida, Ronda, Torneo, Usuario } = require('./src/models');

// USUARIOS
const usuarios = [
  // ADMIN id 1
  { nombre_completo: 'Pepe Gonzales', correo: 'ppelcrack@gmail.com', contraseña: 'ppelcrack', rol: 'admin' },
  // ORGANIZADOR (LO DEBERÍA PODER CREAR EL ADMIN) id 2
  { nombre_completo: 'Armando Barreras', correo: 'abarreras@gmail.com', contraseña: 'abarreras', rol: 'org' },
  // LIDER id 3
  { nombre_completo: 'Jose Cardenas', correo: 'jcardenas@gmail.com', contraseña: 'jcaradenas', rol: 'lider' },
  { nombre_completo: 'Jose Cardenas', correo: 'jcardenas@gmail.com', contraseña: 'jcaradenas', rol: 'lider' }

];
const main = async () => {
  try {
    await sequelize.sync({ force: true});

    usuarios.forEach(async usr => {
      try {
        await Usuario.create(usr);
      } catch(err) {
        console.log(err);
      }
    });
} catch(err) {
    console.log(err);
  }
}
main();
*/
