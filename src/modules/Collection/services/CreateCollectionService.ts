import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Collection from '../infra/typeorm/entities/Collection';
import ICollectionRepository from '../repositories/ICollectionRepository';

@injectable()
export default class CreateCollectionService {
  constructor(
    @inject('CollectionsRepository')
    private collectionsRepository: ICollectionRepository,
  ) {}

  public async execute(name: string): Promise<Collection> {
    const existentSameName = await this.collectionsRepository.findByName(name);

    if (existentSameName) {
      throw new AppError('Ja existe uma coleção com este nome :(');
    }

    const collection = await this.collectionsRepository.create(name);

    return collection;
  }
}
