import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import IOrderRepository from '@modules/Order/repositories/IOrderRepositorie';
import { getRepository, Repository, Transaction } from 'typeorm';
import IOrderDTO from './../../../dto/OrderDTO';
import Order from './../entities/Order';
import OrderItems from './../entities/OrderItems';

class OrdersRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;
  private ormRepositoryItems: Repository<OrderItems>;

  constructor() {
    this.ormRepository = getRepository(Order);
    this.ormRepositoryItems = getRepository(OrderItems);
  }

  public async create(data: IOrderDTO): Promise<Order | undefined> {
    const order = this.ormRepository.create(data);
    await this.ormRepository.save(order);

    let itemCreated;
    data.products.map(async item => {
      await this.ormRepositoryItems.save(
        this.ormRepositoryItems.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          value: item.value,
        }),
      );
    });

    const orderToReturn = this.ormRepository.findOne({
      where: {
        id: order.id,
      },
    });

    return orderToReturn;
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
