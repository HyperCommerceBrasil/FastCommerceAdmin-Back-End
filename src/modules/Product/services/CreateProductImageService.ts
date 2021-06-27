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
    const ImageExists = await this.productsRepository.findImagesProduct(
      product,
    );

    console.log(ImageExists);

    if (ImageExists.length > 0) {
      console.log('entrou aqui');
      s3.deleteObject(
        {
          Bucket: process.env.BUCKET_NAME || '',
          Key: ImageExists[0].key,
        },
        (err, data) => {
          if (err) {
            throw new AppError(
              'Não foi possivel remover a imagem do produto ! :(',
            );
          }
          this.productsRepository.deleteImageProduct(ImageExists);
        },
      );
    }
    const productImage = this.productsRepository.setImageProduct(
      image,
      product,
      key,
    );

    return productImage;
  }
}

export default CreateProductService;
