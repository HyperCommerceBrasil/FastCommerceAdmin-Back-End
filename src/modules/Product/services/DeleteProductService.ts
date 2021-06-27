import { inject, injectable } from 'tsyringe';
import IProductRepository from '../repositories/IProductRepository';
import fs from 'fs';
import aws from 'aws-sdk';
const s3 = new aws.S3();

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute(idProduct: string): Promise<void> {
    const images = await this.productsRepository.findImagesProduct(idProduct);

    if (images) {
      if (process.env.STORAGE_TYPE === 's3') {
        if (images.length >= 0) {
          s3.deleteObject(
            {
              Bucket: process.env.BUCKET_NAME || '',
              Key: images[0].key,
            },
            err => {
              console.log(err);
            },
          );

          await this.productsRepository.deleteImageProduct(images);
        }
      }
      await this.productsRepository.deleteById(idProduct);
    }
  }
}

export default DeleteProductService;
