import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '../repositories/IOrderRepositorie';
import ICustomersRepository from '@modules/Customer/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  orderId: string;
}

@injectable()
class ListAllOrdersPaginate {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(page: number) {
    const orders = await this.ordersRepository.findAllPaginate(page);
    console.log(orders);

    return orders;
  }
}

export default ListAllOrdersPaginate;
