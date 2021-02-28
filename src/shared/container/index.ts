import CollectionRepository from '@modules/Collection/infra/typeorm/repositories/CollectionRepository';
import ICollectionRepository from '@modules/Collection/repositories/ICollectionRepository';

import ProductRepository from '@modules/Product/infra/typeorm/repositories/ProductRepository';
import IProductRepository from '@modules/Product/repositories/IProductRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICollectionRepository>(
  'CollectionsRepository',
  CollectionRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductRepository,
);
