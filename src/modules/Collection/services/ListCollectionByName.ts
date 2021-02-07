import { injectable, inject } from 'tsyringe';
import Collection from '../infra/typeorm/entities/Collection';
import ICollectionRepository from '../repositories/ICollectionRepository';

@injectable()
export default class ListCollectionsService {
  constructor(
    @inject('CollectionsRepository')
    private collectionsRepository: ICollectionRepository,
  ) {}

  public async execute(name: string): Promise<Collection[]> {
    const collections = await this.collectionsRepository.search(name);

    return collections;
  }
}
