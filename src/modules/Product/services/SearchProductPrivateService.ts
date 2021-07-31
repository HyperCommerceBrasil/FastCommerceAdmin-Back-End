import { inject, injectable } from 'tsyringe';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { validate } from 'uuid';

interface IRequest {
  search: string | undefined;
}

@injectable()
class SearchProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({ search }: IRequest): Promise<Product[]> {
    const products = await this.productsRepository.search(search || '');

    return products;
  }
}

export default SearchProductService;
