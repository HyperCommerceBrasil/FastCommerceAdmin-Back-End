import CollectionRepository from '@modules/Collection/infra/typeorm/repositories/CollectionRepository';
import ICollectionRepository from '@modules/Collection/repositories/ICollectionRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICollectionRepository>(
  'CollectionsRepository',
  CollectionRepository,
);
