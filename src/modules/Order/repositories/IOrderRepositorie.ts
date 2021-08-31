import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import Order from '../infra/typeorm/entities/Order';
import IOrderDTO from './../dto/OrderDTO';

export default interface IProductRepository {
  create(data: IOrderDTO): Promise<Order | undefined>;
  findOne(id: string): Promise<Order | undefined>;
  findByCustomer(customer: Customer): Promise<Order[]>;
}
