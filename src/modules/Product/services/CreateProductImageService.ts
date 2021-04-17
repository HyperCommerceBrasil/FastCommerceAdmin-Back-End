import ICollectionRepository from '@modules/Collection/repositories/ICollectionRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';
import ProductImage from '../infra/typeorm/entities/ProductImage';

interface IRequest {
    image: string;
    product: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,

  ) {}

  public async execute({
    product,
    image
  }: IRequest): Promise<ProductImage> {

    const productImage = this.productsRepository.setImageProduct(image, product);


    return productImage;

  }
}

export default CreateProductService;
