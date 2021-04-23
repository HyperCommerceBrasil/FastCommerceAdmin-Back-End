import Collection from '@modules/Collection/infra/typeorm/entities/Collection';

export default interface IProductDTO {
  name: string;
  price: number;
  quantity: number;
  details: string;
  ean: string;
  price_promotional: string;
  is_active: boolean;
  description: string;
  collection: Collection;
  trending: boolean;
}
