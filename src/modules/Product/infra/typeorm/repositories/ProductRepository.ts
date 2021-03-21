import IProductRepository from '@modules/Product/repositories/IProductRepository';
import { getRepository, Like, Repository } from 'typeorm';
import IProductDTO from '../../../dtos/IProductDTO';
import Product from '../entities/Product';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(data: IProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);
    await this.ormRepository.save(product);

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = this.ormRepository.find();

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne(id);

    return product;
  }

  public async search(search: string): Promise<Product[]> {
    const products = this.ormRepository.find({
      where: {
        name: Like(`%${search}%`),
      },
    });

    return products;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async update(data: Product): Promise<Product> {
    await this.ormRepository.save(data);
    return data;
  }

  public async findTrendingItems(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: {
        trending: "true"
      },
      
    }, );
    return products;
  }
}

export default ProductRepository;
