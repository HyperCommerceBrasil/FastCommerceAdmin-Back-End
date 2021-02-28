import ICollectionRepository from '@modules/Collection/repositories/ICollectionRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  id: string;
  name: string;
  quantity: number;
  price: number;
  collectionId: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,

    @inject('CollectionsRepository')
    private collectionsRepository: ICollectionRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
    collectionId,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    const collection = await this.collectionsRepository.findById(collectionId);

    if (!product) {
      throw new AppError('Este produto não existe :(');
    }

    product.collection = collection || product.collection;
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.update(product);

    return product;
  }
}

export default CreateProductService;
