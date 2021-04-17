import IProductDTO from '../dtos/IProductDTO';
import Product from '../infra/typeorm/entities/Product';
import ProductImage from '../infra/typeorm/entities/ProductImage';

export default interface IProductRepository {
  findAll(): Promise<Product[]>;
  create(data: IProductDTO): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  search(search: string): Promise<Product[]>;
  deleteById(id: string): Promise<void>;
  update(data: Product): Promise<Product>;
  findTrendingItems(): Promise<Product[]>;
  setImageProduct(image: string, product: string): Promise<ProductImage>;
}
