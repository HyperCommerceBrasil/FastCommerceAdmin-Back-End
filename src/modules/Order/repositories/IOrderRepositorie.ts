import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import OrderItems from '@modules/Order/infra/typeorm/entities/OrderItems';
import Order from '../infra/typeorm/entities/Order';
import IOrderDTO from './../dto/OrderDTO';

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  value: number;
  quantity: number;
  supplierid: string;
  suppliername: string;
  typeStorage: string;
}

export default interface IOrdersRepository {
  create(data: IOrderDTO): Promise<Order | undefined>;
  findOne(id: string): Promise<Order | undefined>;
  findByCustomer(customer: Customer): Promise<Order[]>;
  findAllPaginate(page: number): Promise<Order[]>;
  findItemsWithSupplier(id: string): Promise<OrderItem[]>;
  findItems(orderId: string): Promise<OrderItems[]>;
  findOrderWithItems(orderId: string): Promise<Order | undefined>;
}
