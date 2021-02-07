import Collection from '../infra/typeorm/entities/Collection';

export default interface ICollectionRepository {
  create(name: string): Promise<Collection>;
  findAll(): Promise<Collection[]>;
  findById(id: string): Promise<Collection | undefined>;
  findByName(name: string): Promise<Collection | undefined>;
  search(name: string): Promise<Collection[]>;
  deleteById(id: string): Promise<void>;
}
