const db = require('../db');
require('../models');

const main = () => {
  db.sync({ force: true }).then(() => {
    console.log('Conexión establecida.');
    require('./usuario')()
      .then(() => {
        db.close().then(() => {
          process.exit();
        });
      });
  });
}

main();
