import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import IOrderRepository from '@modules/Order/repositories/IOrderRepositorie';
import { getRepository, Repository, Transaction } from 'typeorm';
import IOrderDTO from './../../../dto/OrderDTO';
import Order from './../entities/Order';
import OrderItems from './../entities/OrderItems';

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
    const order = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['items'],
    });

    return order;
  }

  public async findItemsWithSupplier(id: string): Promise<OrderItem[]> {
    const orderItems = await this.ormRepositoryItems
      .query(`select oi.*, s.id as supplierId, s.name as supplierName, "typeStorage" from "ordersItems" oi 
    join products p on p.id = oi."productId"
    join suppliers s on s.id  = p."supplierId"
    where oi."orderId" = '${id}'`);

    return orderItems;
  }

  public async findAllPaginate(page: number): Promise<Order[]> {
    const skipIndex = (page - 1) * 8;

    const orders = await this.ormRepository.find({
      skip: skipIndex < 0 ? 0 : skipIndex,
      take: 8,
    });

    return orders;
  }

  // public async findItems(id: string): Promise<Order | undefined> {
  //   const order = await this.ormRepository.find({})

  //   return order;
  // }
}

export default OrdersRepository;
