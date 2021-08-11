import ICollectionRepository from '@modules/Collection/repositories/ICollectionRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';
import ProductImage from '../infra/typeorm/entities/ProductImage';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

interface IRequest {
  image: string;
  product: string;
  key: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({
    product,
    image,
    key,
  }: IRequest): Promise<ProductImage> {
    const productImage = this.productsRepository.setImageProduct(
      image,
      product,
      key,
    );

    return productImage;
  }
}

export default CreateProductService;
