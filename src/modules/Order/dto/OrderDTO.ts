import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import Product from '@modules/Product/infra/typeorm/entities/Product';

export default interface OrderDTO {
  customer: Customer;
  street: string;
  district: string;
  uf: string;
  numberHouse: string;
  cep: string;
  city: string;
  statusCode: string;
  customerId?: string;
  products: Product[];
}
