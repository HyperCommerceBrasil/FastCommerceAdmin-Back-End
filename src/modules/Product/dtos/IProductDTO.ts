import Collection from '@modules/Collection/infra/typeorm/entities/Collection';

export default interface IProductDTO {
  name: string;
  price: number;
  quantity: number;
  details: string;
  ean: string;
  price_promotional: string;
  description: string;
  collection: Collection;
}
