import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Collection from './src/modules/Collection/infra/typeorm/entities/Collection';

console.log('Hello World');

createConnection().then((connection: any) => {
  const repository = connection.getRepository(Collection);

  for (let i = 0; i < 10; i++) {
    console.log('teste-' + i);
    repository.create({
      name: 'teste-' + i,
      id: '',
    });
  }
});
