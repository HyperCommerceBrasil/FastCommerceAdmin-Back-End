import { container } from 'tsyringe';


import CollectionRepository from '@modules/Collection/infra/typeorm/repositories/CollectionRepository';
import ICollectionRepository from '@modules/Collection/repositories/ICollectionRepository';

import ProductRepository from '@modules/Product/infra/typeorm/repositories/ProductRepository';
import IProductRepository from '@modules/Product/repositories/IProductRepository';


import UsersRepository from '@modules/User/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/User/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICollectionRepository>(
  'CollectionsRepository',
  CollectionRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductRepository,
);
