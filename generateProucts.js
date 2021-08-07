var createConnection = require('typeorm').createConnection;
var Collection = require('./src/modules/Collection/infra/typeorm/entities/Collection');
// createConnection method will automatically read connection options
// from your ormconfig file or environment variables
console.log('Worked');
// createConnection({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5436,
//   username: 'postgres',
//   password: 'docker',
//   database: 'fastcommerce',
// }).then((connection: any) => {
//   const repository = connection.getRepository(Collection);
//   for (let i = 0; i < 10; i++) {
//     console.log('teste-' + i);
//     repository.create({
//       name: 'teste-' + i,
//     });
//   }
// });
