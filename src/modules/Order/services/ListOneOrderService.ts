import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '../repositories/IOrderRepositorie';
import ICustomersRepository from '@modules/Customer/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  orderId: string;
}

@injectable()
class ListObeOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ orderId }: IRequest) {
    let order = await this.ordersRepository.findOne(orderId);
    const items = await this.ordersRepository.findItems(orderId);

    let total = 0;

    items.map(it => {
      total += it.quantity * it.value;
    });

    if (order?.shipments.shipmentItems) {
      order?.shipments.shipmentItems.map(shipItem => {
        items?.map(it => {
          if (it.id === shipItem.productId) {
            shipItem = {
              ...shipItem,
            };
          }
        });
      });
    }

    console.log(order);

    const orderReturn = { ...order, total: total };

    return orderReturn;
  }
}

export default ListObeOrderService;
