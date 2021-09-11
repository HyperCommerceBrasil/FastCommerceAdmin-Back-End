import ICollectionRepository from '@modules/Collection/repositories/ICollectionRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  name: string;
  quantity: number;
  price: number;
  collectionId: string;
  details: string;
  description: string;
  trending: boolean;
  price_promotional: string;
  ean: string;
  is_active: boolean;
  isFreeShipping: boolean;
  supplierId: string;
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
    name,
    price,
    quantity,
    collectionId,
    ean,
    details,
    description,
    price_promotional,
    trending,
    is_active,
    isFreeShipping,
    supplierId,
  }: IRequest): Promise<Product> {
    const collection = await this.collectionsRepository.findById(collectionId);

    if (!collection) {
      throw new AppError(
        'A Coleção informada, não existe. Por favor verifique',
      );
    }

    const productSameName = await this.productsRepository.search(name);

    if (productSameName.length > 0) {
      throw new AppError('Ja existe um produto com este nome');
    }

    if (!price || price < 0) {
      throw new AppError(
        'Por favor, informe o preço do produto, este preço precisa ser maior que 0',
      );
    }

    const productCreated = await this.productsRepository.create({
      collection,
      name,
      price,
      quantity,
      description,
      details,
      trending,
      ean,
      is_active,
      price_promotional,
      isFreeShipping,
      supplierId,
    });

    return productCreated;
  }
}

export default CreateProductService;
