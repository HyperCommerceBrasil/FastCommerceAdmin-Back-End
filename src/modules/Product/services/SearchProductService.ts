import { inject, injectable } from 'tsyringe';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { validate } from 'uuid';

interface IRequest {
  collection: string | undefined;
  productName: string | undefined;
}

@injectable()
class SearchProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({
    collection,
    productName,
  }: IRequest): Promise<Product[]> {
    let productsOfCollection: Product[];
    let products: Product[] = [];
    if (collection) {
      if (!validate(collection)) {
        throw new AppError('Por favor informe um UUID válido de coleção');
      }
    }
    productsOfCollection = await this.productsRepository.findByCollectionName(
      collection,
    );
    console.log(productsOfCollection);
    if (productsOfCollection.length > 0) {
      if (productName && productName !== '') {
        products = productsOfCollection.filter(prod =>
          prod.name.includes(productName),
        );
      }
    } else {
      products = await this.productsRepository.findByName(productName || '');
    }

    return products;
  }
}

export default SearchProductService;
