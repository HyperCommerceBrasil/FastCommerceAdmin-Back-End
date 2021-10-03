import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import IOrderRepository from '@modules/Order/repositories/IOrderRepositorie';
import {
  getRepository,
  Repository,
  Transaction,
  TransactionManager,
} from 'typeorm';
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
    const order = this.ormRepository.create({
      cep: data.cep,
      city: data.city,
      statusCode: data.statusCode,
      district: data.district,
      uf: data.uf,
      numberHouse: data.numberHouse,
      customer: data.customer,
      street: data.street,
    });

    await this.ormRepository.save(order);

    await Promise.all(
      data.products.map(async item => {
        const orderItem = this.ormRepositoryItems.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          value: item.value,
        });
        await this.ormRepositoryItems.save(orderItem);
      }),
    );

    const orderToReturn = await this.ormRepository.findOne({
      where: {
        id: order.id,
      },
    });

    console.log('cria oirdem');
    console.log(orderToReturn);

    return orderToReturn;
  }

  public async findByCustomer(customer: Customer): Promise<Order[]> {
    const orders = await this.ormRepository.find({
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

  public async findItems(orderId: string): Promise<OrderItems[]> {
    const items = await this.ormRepositoryItems.find({
      where: {
        orderId: orderId,
      },
    });

    console.log(orderId);
    console.log('Do repositorio');
    console.log(items.length);

    return items;
  }

  public async findOrderWithItems(orderId: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ['items'],
    });

    return order;
  }
}

export default OrdersRepository;
