import ICollectionRepository from '@modules/Collection/repositories/ICollectionRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import fs from 'fs';
import IProductRepository from '../repositories/IProductRepository';
import ProductImage from '../infra/typeorm/entities/ProductImage';
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

interface IRequest {
  imageId: string;
  
}

@injectable()
class DeleteProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({
    imageId,
  }: IRequest): Promise<void> {
    const productImage = await this.productsRepository.findOneImagesProduct(imageId);


    
    if(process.env.STORAGE_TYPE !== 'local'){

       s3.deleteObject({
        Bucket: process.env.BUCKET_NAME || '',
        Key: productImage[0].key
      }, function(err, data) {
        if (err) {
          throw new AppError(
            'Não foi possivel remover a imagem do produto ! :(',
          );
        }
      })


    } else {
      const pathTemp = path.join(__dirname, '..', '..', '..', '..', 'tmp', productImage[0].key)
      console.log(pathTemp)
       fs.unlinkSync(pathTemp);
    }

    await this.productsRepository.deleteImageProduct(productImage);

    return;
  }
}

export default DeleteProductImageService;
