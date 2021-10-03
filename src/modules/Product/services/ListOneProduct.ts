import { inject, injectable } from 'tsyringe';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute(productId: string): Promise<Product | undefined> {
    const product = await this.productsRepository.findByIdPrivate(productId);

    return product;
  }
}

export default CreateProductService;
