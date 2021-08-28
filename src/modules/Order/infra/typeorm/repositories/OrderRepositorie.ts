import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import IOrderRepository from '@modules/Order/repositories/IOrderRepositorie';
import { getRepository, Repository } from 'typeorm';
import IOrderDTO from './../../../dto/OrderDTO';
import Order from './../entities/Order';
import OrderItems from './../entities/OrderItems';

class OrdersRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;
  private ormRepositoryItems: Repository<OrderItems>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(data: IOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(data);
    await this.ormRepository.save(order);
    const items = this.ormRepositoryItems.create(data.products);
    await this.ormRepositoryItems.save(items);

    return order;
  }

  public async findByCustomer(customer: Customer): Promise<Order[]> {
    const orders = this.ormRepository.find({
      where: {
        customer: customer,
      },
    });

    return orders;
  }

  public async findOne(id: string): Promise<Order | undefined> {
    // const order = await this.ormRepository.query(
    //   `select  o."numberOrder", st.description as status,  o.* from orders o left join status st ON st.code = o."statusCode" where o.id = '${id}'`,
    // );

    const order = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return order;
  }

  // public async findItems(id: string): Promise<Order | undefined> {
  //   const order = await this.ormRepository.find({})

  //   return order;
  // }
}

export default OrdersRepository;
