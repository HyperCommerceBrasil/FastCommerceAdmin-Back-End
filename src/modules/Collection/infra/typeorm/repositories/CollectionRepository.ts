import { getRepository, Like, Repository } from 'typeorm';
import ICollectionRepository from '../../../repositories/ICollectionRepository';

import Collection from '../entities/Collection';

class CollectionRepository implements ICollectionRepository {
  private ormRepository: Repository<Collection>;

  constructor() {
    this.ormRepository = getRepository(Collection);
  }

  public async create(name: string): Promise<Collection> {
    const collection = this.ormRepository.create({
      name,
    });
    await this.ormRepository.save(collection);
    return collection;
  }

  public async findById(id: string): Promise<Collection | undefined> {
    const collection = await this.ormRepository.findOne(id);

    return collection;
  }

  public async findByName(name: string): Promise<Collection | undefined> {
    const collection = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return collection;
  }

  public async findAll(): Promise<Collection[]> {
    const collections = await this.ormRepository.find();

    return collections;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async search(name: string): Promise<Collection[]> {
    const result = await this.ormRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });

    return result;
  }
}

export default CollectionRepository;
