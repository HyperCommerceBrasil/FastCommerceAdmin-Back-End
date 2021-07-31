import IProductRepository from '@modules/Product/repositories/IProductRepository';
import { getRepository, Like, Repository } from 'typeorm';
import IProductDTO from '../../../dtos/IProductDTO';
import Product from '../entities/Product';
import ProductImage from '../entities/ProductImage';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;
  private ormRepositoryImage: Repository<ProductImage>;

  constructor() {
    this.ormRepository = getRepository(Product);
    this.ormRepositoryImage = getRepository(ProductImage);
  }

  public async create(data: IProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);
    await this.ormRepository.save(product);

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = this.ormRepository.find();

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne(id);

    return product;
  }

  public async search(search: string): Promise<Product[]> {
    const products = this.ormRepository.find({
      where: [{ name: Like(`%${search}%`) }, { ean: Like(`%${search}%`) }],
    });

    return products;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
    const images = await this.ormRepositoryImage.find({
      where: {
        productId: id,
      },
    });

    await this.ormRepositoryImage.remove(images);
  }

  public async update(data: Product): Promise<Product> {
    await this.ormRepository.save(data);
    return data;
  }

  public async findTrendingItems(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: {
        trending: 'true',
        is_active: true,
      },
    });
    return products;
  }

  public async findByCollectionName(collection: string): Promise<Product[]> {
    console.log('Coleção: ' + collection);
    const products = await this.ormRepository.find({
      where: { collection: collection },
    });

    console.log(products);

    return products;
  }

  public async findByName(name: string): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { name: name },
    });

    return products;
  }

  public async setImageProduct(
    image: string,
    product: string,
    key: string,
  ): Promise<ProductImage> {
    const imageProduct = await this.ormRepositoryImage.create({
      image,
      productId: product,
      key,
    });

    this.ormRepositoryImage.save(imageProduct);

    return imageProduct;
  }

  public async findActiveProducts(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: {
        is_active: true,
      },
    });

    return products;
  }

  public async findImagesProduct(productId: string): Promise<ProductImage[]> {
    const images = await this.ormRepositoryImage.find({
      where: {
        productId: productId,
      },
    });

    return images;
  }

  public async deleteImageProduct(images: ProductImage[]): Promise<void> {
    await this.ormRepositoryImage.remove(images);
  }
}

export default ProductRepository;
