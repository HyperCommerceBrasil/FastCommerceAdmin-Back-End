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
    const order = await this.ordersRepository.findOne(orderId);

    return order;
  }
}

export default ListObeOrderService;
