import { inject, injectable } from 'tsyringe';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findActiveProducts();

    return products;
  }
}

export default CreateProductService;
