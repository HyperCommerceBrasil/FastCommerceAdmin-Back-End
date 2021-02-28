import { inject, injectable } from 'tsyringe';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute(idProduct: string): Promise<void> {
    await this.productsRepository.deleteById(idProduct);
  }
}

export default DeleteProductService;
