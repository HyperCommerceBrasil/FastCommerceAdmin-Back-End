import Customer from '@modules/Customer/infra/typeorm/entities/Customer';

interface Product {
  productId: string;
  value: number;
  quantity: number;
}

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
