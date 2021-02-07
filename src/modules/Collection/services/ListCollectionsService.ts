import { injectable, inject } from 'tsyringe';
import Collection from '../infra/typeorm/entities/Collection';
import ICollectionRepository from '../repositories/ICollectionRepository';

@injectable()
export default class ListCollectionsService {
  constructor(
    @inject('CollectionsRepository')
    private collectionsRepository: ICollectionRepository,
  ) {}

  public async execute(): Promise<Collection[]> {
    const collections = await this.collectionsRepository.findAll();

    return collections;
  }
}
